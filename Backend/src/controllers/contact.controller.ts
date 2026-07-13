import { Request, Response, NextFunction } from "express";
import {
  createContact,
  CreateContactData,
} from "../services/contact.service";

export const createContactController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contactData: CreateContactData = req.body;

    const savedContact = await createContact(contactData);

    return res.status(201).json({
      success: true,
      message: "Contact message submitted successfully.",
      data: savedContact,
    });
  } catch (error) {
    next(error);
  }
};