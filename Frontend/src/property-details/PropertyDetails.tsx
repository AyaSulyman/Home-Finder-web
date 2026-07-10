import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PropertyDetails.module.scss";

import Header from "./Header/Header";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import PropertyInfo from "./PropertyInfo/PropertyInfo";
import AboutProperty from "./AboutProperty/AboutProperty";
import Amenities from "./Amenities/Amenities";
import LocationMap from "./LocationMap/LocationMap";
import ListedBy from "./ListedBy/ListedBy";
import BookingCard from "./BookingCard/BookingCard";
import MortgageEstimate from "./MortgageEstimate/MortgageEstimate";
import SimilarListings from "./SimilarListings/SimilarListings";

import type { PropertyStat, SimilarListing } from "./shared/types";

const STATS: PropertyStat[] = [
  { label: "Bedrooms", value: "4" },
  { label: "Bathrooms", value: "3" },
  { label: "Sqft", value: "2,150" },
  { label: "Year built", value: "2018" },
  { label: "Garage", value: "2" },
];

const AMENITIES: string[] = [
  "Central air conditioning",
  "Attached 2-car garage",
  "Fireplace",
  "Hardwood flooring",
  "Walk-in closets",
  "Solar panels",
  "Private garden",
  "Smart thermostat",
  "Security system",
];

const SIMILAR_LISTINGS: SimilarListing[] = [
  {
    id: "cedar-ridge",
    title: "Cedar Ridge Home",
    location: "Lakeview",
    price: "$598,000",
    status: "FOR SALE",
  },
  {
    id: "birchwood-manor",
    title: "Birchwood Manor",
    location: "Lakeview",
    price: "$710,000",
    status: "FOR SALE",
  },
  {
    id: "elm-street-loft",
    title: "Elm Street Loft",
    location: "Northgate",
    price: "$2,650/mo",
    status: "FOR RENT",
  },
];

const PropertyDetails: React.FC = () => {
  const { id } = useParams();

  console.log("Property ID:", id);

  return (
    <div className={styles.page}>
      <Header active="browse" />

      <div className={styles.container}>
        <Breadcrumb
          trail={["Home", "Browse Properties"]}
          current="Archer House"
        />

        <div className={styles.gallerySpacing}>
          <Gallery extraPhotosCount={12} />
        </div>

        <div className={styles.mainGrid}>
          {/* Left column */}
          <div>
            <PropertyInfo
              status="FOR SALE"
              title="Archer House"
              price="$675,000"
              priceSub="$314 / sqft"
              address="1120 Maple Ave, Lakeview, IL 60045"
              stats={STATS}
            />

            <hr className={styles.divider} />
            <AboutProperty
              description="A sun-filled four-bedroom home set on a quiet, tree-lined street in Lakeview. The open-plan kitchen and living area lead directly onto a private deck and landscaped garden — ideal for entertaining or quiet mornings with coffee. Recently renovated with new flooring, updated bathrooms, and energy-efficient windows throughout."
            />

            <hr className={styles.divider} />

            <Amenities items={AMENITIES} />

            <hr className={styles.divider} />

            <LocationMap />

            <hr className={styles.divider} />

            <ListedBy
              initials="DM"
              name="Dana Marlowe"
              role="Licensed Agent · Lakeview Realty Group"
            />
          </div>

          {/* Right column */}
          <aside>
            <BookingCard agentName="Dana Marlowe" />
            <MortgageEstimate
              apr="6.4% APR"
              monthlyPayment="$3,420"
              note="Based on 20% down, 30-year fixed"
            />
          </aside>
        </div>
      </div>

      <SimilarListings listings={SIMILAR_LISTINGS} />
    </div>
  );
};

export default PropertyDetails;
