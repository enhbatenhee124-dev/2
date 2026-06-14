import type { NextFunction, Request, Response } from "express";

export const validateContactInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, subject, message } = req.body;
  const errors: string[] = [];

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Email format is invalid.");
  }

  if (subject !== undefined && subject !== null && typeof subject !== "string") {
    errors.push("Subject must be a string.");
  }

  if (typeof message !== "string" || message.trim().length < 5) {
    errors.push("Message must be at least 5 characters long.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};
