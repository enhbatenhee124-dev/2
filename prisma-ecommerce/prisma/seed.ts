import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // 1. Бүх Role-ыг үүсгэх
  const roles = Object.values(RoleName); // SUPER_ADMIN, OWNER, DIRECTOR, ...

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }
  console.log("✅ Roles created:", roles.join(", "));

  // 2. Super Admin role-ийн id-г авах
  const superAdminRole = await prisma.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });

  // 3. Super Admin user үүсгэх
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@indracyber.mn" },
    update: {},
    create: {
      email: "admin@indracyber.mn",
      password: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      roleId: superAdminRole.id,
    },
  });

  console.log("✅ Super Admin created:", superAdmin.email);

  // 4. Жишээ Program-ууд үүсгэх
  const programs = [
    { name: "Software Engineering", description: "Программ хангамжийн инженерчлэл" },
    { name: "Graphic Design", description: "График дизайн" },
    { name: "Digital Marketing", description: "Дижитал маркетинг" },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { name: program.name },
      update: {},
      create: program,
    });
  }
  console.log("✅ Programs created");

  console.log("🌱 Seeding finished!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
