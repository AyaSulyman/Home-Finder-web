import { apiRequest } from "./apiClient";

export interface PropertyPayload {
  title: string;
  description: string;
  listingType: "sale" | "rent";
  propertyType: "house" | "apartment" | "villa" | "land" | "townhouse";
  price: number;
  address: { street: string; city: string; state: string; zipCode: string };
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  availability: Array<{ date: string; times: string[] }>;
  status: "draft" | "active";
}

export const createPropertyAction = (data: PropertyPayload) =>
  apiRequest<Record<string, unknown>>("/properties", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const deletePropertyAction = (id: string) =>
  apiRequest<null>(`/properties/${id}`, { method: "DELETE" });

export const updatePropertyStatusAction = (id: string, status: string) =>
  apiRequest(`/properties/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
