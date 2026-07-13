import mongoose, { Document, Schema, Types } from "mongoose";

export type ListingType = "sale" | "rent";

export type PropertyType =
    | "house"
    | "apartment"
    | "villa"
    | "land"
    | "townhouse";

export type PropertyStatus =
    | "draft"
    | "active"
    | "sold"
    | "rented"
    | "archived";

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

export interface AgentInfo {
    name: string;
    role: string;
    company: string;
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

    yearBuilt: number;

    garage: number;

    amenities: string[];

    image: string;

    images: PropertyImage[];

    availability: AvailabilitySlot[];

    agent: AgentInfo;

    isFeatured: boolean;

    isFeaturedProperty: boolean;

    status: PropertyStatus;

    views: number;

    createdAt: Date;

    updatedAt: Date;
}

const addressSchema = new Schema<PropertyAddress>(
    {
        street: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        zipCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const imageSchema = new Schema<PropertyImage>(
    {
        url: {
            type: String,
            required: true,
            trim: true
        },

        order: {
            type: Number,
            default: 0
        },

        isCover: {
            type: Boolean,
            default: false
        }
    },
    {
        _id: false
    }
);

const availabilitySchema = new Schema<AvailabilitySlot>(
    {
        date: {
            type: Date,
            required: true
        },

        times: [
            {
                type: String
            }
        ]
    },
    {
        _id: false
    }
);

const propertySchema = new Schema<IProperty>(
    {
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        description: {
            type: String,
            default: "",
            maxlength: 5000
        },

        listingType: {
            type: String,
            enum: ["sale", "rent"],
            required: true
        },

        propertyType: {
            type: String,
            enum: [
                "house",
                "apartment",
                "villa",
                "land",
                "townhouse"
            ],
            required: true,
            index: true
        },

        price: {
            type: Number,
            required: true,
            min: 0,
            index: true
        },

        address: {
            type: addressSchema,
            required: true
        },

        bedrooms: {
            type: Number,
            default: 0
        },

        bathrooms: {
            type: Number,
            default: 0
        },

        area: {
            type: Number,
            default: 0
        },

        yearBuilt: {
            type: Number,
            default: 0
        },

        garage: {
            type: Number,
            default: 0
        },

        amenities: {
            type: [String],
            default: []
        },

        image: {
            type: String,
            default: ""
        },

        images: {
            type: [imageSchema],
            default: []
        },

        availability: {
            type: [availabilitySchema],
            default: []
        },

        agent: {
            name: {
                type: String,
                default: "HomeFinder Agent"
            },

            role: {
                type: String,
                default: "Licensed Agent"
            },

            company: {
                type: String,
                default: "HomeFinder"
            }
        },

        isFeatured: {
            type: Boolean,
            default: false,
            index: true
        },

        isFeaturedProperty: {
            type: Boolean,
            default: false,
            index: true
        },

        status: {
            type: String,
            enum: [
                "draft",
                "active",
                "sold",
                "rented",
                "archived"
            ],
            default: "draft",
            index: true
        },

        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

propertySchema.index({
    title: "text",
    description: "text",
    "address.city": "text"
});

const Property = mongoose.model<IProperty>(
    "Property",
    propertySchema
);

export default Property;