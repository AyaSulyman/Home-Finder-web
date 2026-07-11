import mongoose, { Document, Schema, Types } from "mongoose";

export type ListingType = "sale" | "rent";
export type PropertyType = "house" | "apartment" | "villa" | "land" | "townhouse";
export type PropertyStatus = "draft" | "active" | "sold" | "rented" | "archived";

export interface PropertyAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface PropertyImage {
    url: string;
    order: number;
    isCover: boolean;
}

export interface AvailabilitySlot {
    date: Date;
    times: string[];
}

export interface IProperty extends Document {
    sellerId: Types.ObjectId;
    title: string;
    description: string;
    listingType: ListingType;
    propertyType: PropertyType;
    price: number;
    address: PropertyAddress;
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities: string[];
    images: PropertyImage[];
    availability: AvailabilitySlot[];
    status: PropertyStatus;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const addressSchema = new Schema<PropertyAddress>({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
}, { _id: false });

const imageSchema = new Schema<PropertyImage>({
    url: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0 },
    isCover: { type: Boolean, default: false }
}, { _id: false });

const availabilitySchema = new Schema<AvailabilitySlot>({
    date: { type: Date, required: true },
    times: [{ type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ }]
}, { _id: false });

const propertySchema = new Schema<IProperty>({
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    listingType: { type: String, enum: ["sale", "rent"], required: true },
    propertyType: {
        type: String,
        enum: ["house", "apartment", "villa", "land", "townhouse"],
        required: true,
        index: true
    },
    price: { type: Number, required: true, min: 0, index: true },
    address: { type: addressSchema, required: true },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, min: 0 },
    amenities: { type: [String], default: [] },
    images: { type: [imageSchema], default: [] },
    availability: { type: [availabilitySchema], default: [] },
    status: {
        type: String,
        enum: ["draft", "active", "sold", "rented", "archived"],
        default: "draft",
        index: true
    },
    views: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

propertySchema.index({ title: "text", description: "text", "address.city": "text" });

const Property = mongoose.model<IProperty>("Property", propertySchema);

export default Property;
