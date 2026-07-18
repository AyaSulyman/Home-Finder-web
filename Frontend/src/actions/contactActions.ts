import axios from "axios";

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/contacts`;

export const submitContactMessage = async (
  contactData: ContactRequest
) => {
  const response = await axios.post(API_URL, contactData);

  return response.data;
};