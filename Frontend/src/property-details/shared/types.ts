export interface SimilarListing {
  id: string;
  title: string;
  location: string;
  price: string;
  status: "FOR SALE" | "FOR RENT";
}

export interface TimeSlot {
  label: string;
  value: string;
}

export interface PropertyStat {
  label: string;
  value: string;
}
