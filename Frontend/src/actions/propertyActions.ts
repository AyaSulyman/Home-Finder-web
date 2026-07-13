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

export interface PublicProperty {
  _id: string;
  title: string;
  listingType: "sale" | "rent";
  propertyType: PropertyPayload["propertyType"];
  price: number;
  address: PropertyPayload["address"];
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: "active";
}

export interface PublicPropertyPage {
  items: PublicProperty[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PublicPropertySearch {
  page?: number;
  limit?: number;
  sort?: "newest" | "priceAsc" | "priceDesc";
}

export const createPropertyAction = (data: PropertyPayload) =>
  apiRequest<PublicProperty>("/properties", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getPublicPropertiesAction = (search: PublicPropertySearch = {}) => {
  const query = new URLSearchParams();
  if (search.page) query.set("page", String(search.page));
  if (search.limit) query.set("limit", String(search.limit));
  if (search.sort) query.set("sort", search.sort);
  const suffix = query.size ? `?${query.toString()}` : "";
  return apiRequest<PublicPropertyPage>(`/properties${suffix}`);
};

export const deletePropertyAction = (id: string) =>
  apiRequest<null>(`/properties/${id}`, { method: "DELETE" });

export const updatePropertyStatusAction = (id: string, status: string) =>
  apiRequest(`/properties/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
