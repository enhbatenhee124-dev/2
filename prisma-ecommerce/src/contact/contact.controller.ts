import type { Request, Response } from "express";
import prisma from "../config/db.ts";

type AuthRequest = Request & {
  user?: {
    id: number;
  };
};

const parseId = (value: string | string[] | undefined) => {
  if (Array.isArray(value) || value === undefined) {
    return null;
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getAllContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        repliedBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid contact id." });
    }

    const contact = await prisma.contactMessage.findUnique({
      where: { id },
      include: {
        repliedBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const markContactAsReplied = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid contact id." });
    }

    const repliedById = req.user?.id;

    if (!repliedById) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const contact = await prisma.contactMessage.update({
      where: { id },
      data: {
        isReplied: true,
        repliedById,
      },
    });

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid contact id." });
    }

    await prisma.contactMessage.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Contact deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
