import { apiRequest } from "./apiClient";

export interface FavoriteRecord {
  _id: string;
  propertyId: {
    _id: string;
    title: string;
    listingType: "sale" | "rent";
    price: number;
    address: { city: string };
  };
}

export const getFavoritesAction = () => apiRequest<FavoriteRecord[]>("/favorites");
export const addFavoriteAction = (propertyId: string) =>
  apiRequest(`/favorites/${propertyId}`, { method: "POST" });
export const removeFavoriteAction = (propertyId: string) =>
  apiRequest<null>(`/favorites/${propertyId}`, { method: "DELETE" });
