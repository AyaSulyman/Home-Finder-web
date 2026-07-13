import Contact, {
  IContact,
} from "../models/contact.model";

export interface CreateContactData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const createContact = async (
  contactData: CreateContactData,
): Promise<IContact> => {
  const contact = await Contact.create(contactData);

  return contact;
};