import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  markContactAsReplied,
} from "./contact.controller.ts";
import { validateContactInput } from "./contact.validator.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/", validateContactInput, createContact);
router.get("/", authMiddleware, getAllContacts);
router.get("/:id", authMiddleware, getContactById);
router.patch("/:id/reply", authMiddleware, markContactAsReplied);
router.delete("/:id", authMiddleware, deleteContact);

export default router;
