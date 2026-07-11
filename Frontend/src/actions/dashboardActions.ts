import { apiRequest } from "./apiClient";

export interface SellerDashboardData {
  stats: { activeListings: number; totalViews: number; pendingRequests: number; confirmedViewings: number };
  recentRequests: DashboardAppointment[];
  properties: DashboardProperty[];
}

export interface BuyerDashboardData {
  stats: { savedHomes: number; upcomingViewings: number; pendingRequests: number; pastViewings: number };
  appointments: DashboardAppointment[];
  favorites: Array<{ _id: string; propertyId: DashboardProperty }>;
}

export interface DashboardProperty {
  _id: string;
  title: string;
  listingType: "sale" | "rent";
  propertyType: string;
  price: number;
  address: { street: string; city: string; state?: string; zipCode?: string };
  views: number;
  status: string;
}

export interface DashboardPerson {
  firstName: string;
  lastName: string;
}

export interface DashboardAppointment {
  _id: string;
  propertyId: DashboardProperty;
  buyerId?: DashboardPerson;
  sellerId?: DashboardPerson;
  scheduledAt: string;
  status: string;
}

export const getSellerDashboardAction = () =>
  apiRequest<SellerDashboardData>("/dashboard/seller");
export const getBuyerDashboardAction = () =>
  apiRequest<BuyerDashboardData>("/dashboard/buyer");
