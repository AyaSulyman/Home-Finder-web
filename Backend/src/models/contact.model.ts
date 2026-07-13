import mongoose, { Document, Schema } from "mongoose";

export enum ContactStatus {
  NEW = "new",
  IN_PROGRESS = "in-progress",
  RESOLVED = "resolved",
}

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 25,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: [
        ContactStatus.NEW,
        ContactStatus.IN_PROGRESS,
        ContactStatus.RESOLVED,
      ],
      default: ContactStatus.NEW,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model<IContact>(
  "Contact",
  contactSchema,
);

export default Contact;