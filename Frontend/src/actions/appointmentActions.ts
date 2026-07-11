import { apiRequest } from "./apiClient";

export const requestAppointmentAction = (data: {
  propertyId: string;
  date: string;
  time: string;
  message?: string;
}) => apiRequest("/appointments", { method: "POST", body: JSON.stringify(data) });

export const updateAppointmentStatusAction = (id: string, status: string) =>
  apiRequest(`/appointments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
