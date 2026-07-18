import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
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

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProperty = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/properties/${id}`
                );

                const data = await response.json();

                if (data.success) {
                    console.log('📦 Property loaded:', data.data);
                    console.log('🔑 Property ID:', data.data._id);
                    console.log('📊 Property Status:', data.data.status);
                    setProperty(data.data);
                }
            } catch (error) {
                console.log("Property details error:", error);
                message.error("Failed to load property details");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.page}>
                <Header active="browse" />
                <div className={styles.container}>
                    <div className={styles.loadingContainer}>
                        <Spin size="large" />
                        <p>Loading property details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className={styles.page}>
                <Header active="browse" />
                <div className={styles.container}>
                    <div className={styles.errorContainer}>
                        <h2>Property not found</h2>
                        <p>The property you're looking for doesn't exist or has been removed.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Get the property ID - THIS IS THE IMPORTANT PART
    const propertyId = property._id || property.id || '';
    console.log('🔑 Passing property ID to BookingCard:', propertyId);

    // Get agent name and ID
    const agentName = property.agent?.name || "HomeFinder Agent";
    const agentId = property.agent?._id || property.sellerId || '';

    // Get property status (default to 'active' if not set)
    const propertyStatus = property.status || 'active';
    console.log('📊 Property Status being passed:', propertyStatus);

    // Get availability slots if they exist
    const availability = property.availability || [];

    // Get the first available date or default to tomorrow
    const getDefaultDate = () => {
        if (availability.length > 0) {
            const firstSlot = availability[0];
            if (firstSlot.date) {
                return new Date(firstSlot.date).toISOString().split('T')[0];
            }
        }
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Get the first available time or default
    const getDefaultTime = () => {
        if (availability.length > 0) {
            const firstSlot = availability[0];
            if (firstSlot.times && firstSlot.times.length > 0) {
                return firstSlot.times[0];
            }
        }
        return "11:30";
    };

    // Format address properly
    const formatAddress = () => {
        if (!property.address) return 'Address not available';
        if (typeof property.address === 'object') {
            const parts = [];
            if (property.address.street) parts.push(property.address.street);
            if (property.address.city) parts.push(property.address.city);
            if (property.address.state) parts.push(property.address.state);
            return parts.join(', ') || 'Address not available';
        }
        if (typeof property.address === 'string') {
            if (property.city) {
                return `${property.address}, ${property.city}`;
            }
            return property.address;
        }
        return 'Address not available';
    };

    return (
        <div className={styles.page}>
            <Header active="browse" />

            <div className={styles.container}>
                <Breadcrumb
                    trail={["Home", "Browse Properties"]}
                    current={property.title}
                />

                <Gallery
                    images={
                        property.images?.length > 0
                            ? property.images
                            : [property.image]
                    }
                />

                <div className={styles.mainGrid}>
                    <div>
                        <PropertyInfo
                            status={
                                property.listingType === "sale"
                                    ? "FOR SALE"
                                    : "FOR RENT"
                            }
                            title={property.title}
                            price={`$${property.price.toLocaleString()}`}
                            priceSub={`$${Math.round(
                                property.price / property.area
                            )} / sqft`}
                            address={formatAddress()}
                            stats={[
                                {
                                    label: "Bedrooms",
                                    value: property.bedrooms
                                },
                                {
                                    label: "Bathrooms",
                                    value: property.bathrooms
                                },
                                {
                                    label: "Sqft",
                                    value: property.area
                                },
                                {
                                    label: "Year built",
                                    value: property.yearBuilt || "N/A"
                                },
                                {
                                    label: "Garage",
                                    value: property.garage || "N/A"
                                }
                            ]}
                        />

                        <hr className={styles.divider} />

                        <AboutProperty description={property.description} />

                        <hr className={styles.divider} />

                        <Amenities items={property.amenities || []} />

                        <hr className={styles.divider} />

                        <LocationMap />

                        <hr className={styles.divider} />

                        <ListedBy
                            initials={property.agent?.initials || "AG"}
                            name={property.agent?.name || "HomeFinder Agent"}
                            role={property.agent?.role || "Licensed Agent"}
                        />
                    </div>

                    <aside>
                        {/* BookingCard with all required props including availability */}
                        <BookingCard
                            propertyId={propertyId}
                            agentName={agentName}
                            agentId={agentId}
                            propertyStatus={propertyStatus}
                            defaultDate={getDefaultDate()}
                            defaultTime={getDefaultTime()}
                            availability={availability}
                            onSuccess={() => {
                                message.success("Appointment requested successfully!");
                            }}
                        />

                        <MortgageEstimate
                            apr="6.4% APR"
                            monthlyPayment="$3,420"
                            note="Based on 20% down, 30-year fixed"
                        />
                    </aside>
                </div>
            </div>

            <SimilarListings listings={[]} />
        </div>
    );
};

export default PropertyDetails;
