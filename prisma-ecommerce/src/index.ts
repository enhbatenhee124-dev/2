import express, { type NextFunction, type Request, type Response } from "express";
import prisma from "./config/db.ts";
import contactRoutes from "./contact/contact.routes.ts";
import { ensureUploadDir, uploadDir } from "./middlewares/upload.middleware.ts";
import { materialRoutes } from "./routes/material.routes.ts";
import { programRoutes } from "./routes/program.routes.ts";
import { studentRoutes } from "./routes/student.routes.ts";
import { teacherRoutes } from "./routes/teacher.routes.ts";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(ensureUploadDir);
app.use("/uploads", express.static(uploadDir));

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

app.use("/api/contacts", contactRoutes);
app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);
app.use("/materials", materialRoutes);
app.use("/programs", programRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);

  const message = error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ message });
});

const server = app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down...`);

  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Prisma disconnected");
      process.exit(0);
    } catch (error) {
      console.error("Shutdown error:", error);
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
