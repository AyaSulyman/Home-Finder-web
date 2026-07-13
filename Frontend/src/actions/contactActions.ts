import axios from "axios";

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const API_URL = "http://localhost:5001/api/contacts";

export const submitContactMessage = async (
  contactData: ContactRequest
) => {
  const response = await axios.post(API_URL, contactData);

  return response.data;
};