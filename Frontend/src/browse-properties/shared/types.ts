export type ListingStatus = "FOR SALE" | "FOR RENT" | "PENDING";

export interface PropertyListing {
  id: string;
  status: ListingStatus;
  price: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  favorited?: boolean;
}

export interface PropertyTypeOption {
  value: string;
  label: string;
}
