import Property, {
    type IProperty,
    type ListingType,
    type PropertyAddress,
    type PropertyImage,
    type PropertyStatus,
    type PropertyType,
    type AvailabilitySlot
} from "../models/property.model";
import AppError from "../utils/appError";

export interface PropertyInput {
    title: string;
    description: string;
    listingType: ListingType;
    propertyType: PropertyType;
    price: number;
    address: PropertyAddress;
    bedrooms: number;
    bathrooms: number;
    area: number;
    amenities?: string[];
    images?: PropertyImage[];
    availability?: AvailabilitySlot[];
    status?: PropertyStatus;
}

export interface PropertySearch {
    page?: number;
    limit?: number;
    keyword?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: PropertyType;
    bedrooms?: number;
    bathrooms?: number;
    sort?: "newest" | "priceAsc" | "priceDesc";
    status?: string;
}

export const createProperty = (sellerId: string, data: PropertyInput) =>
    Property.create({ ...data, sellerId });

export const listPublicProperties = async (search: PropertySearch) => {
    const page = Math.max(1, Number(search.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(search.limit) || 12));
    const filter: Record<string, any> = { status: "active" };

    if (search.keyword) filter.$text = { $search: search.keyword };
    if (search.location) filter["address.city"] = new RegExp(search.location, "i");
    if (search.propertyType) filter.propertyType = search.propertyType;
    if (search.bedrooms !== undefined) filter.bedrooms = { $gte: search.bedrooms };
    if (search.bathrooms !== undefined) filter.bathrooms = { $gte: search.bathrooms };
    if (search.minPrice !== undefined || search.maxPrice !== undefined) {
        filter.price = {};
        if (search.minPrice !== undefined) filter.price.$gte = search.minPrice;
        if (search.maxPrice !== undefined) filter.price.$lte = search.maxPrice;
    }

    const sort: Record<string, 1 | -1> = search.sort === "priceAsc"
        ? { price: 1 }
        : search.sort === "priceDesc"
            ? { price: -1 }
            : { createdAt: -1 };

    const [items, total] = await Promise.all([
        Property.find(filter)
            .sort(sort)
            .limit(limit)
            .skip((page - 1) * limit)
            .populate("sellerId", "firstName lastName phone email")
            .select("-availability")
            .lean(),
        Property.countDocuments(filter)
    ]);

    return { items, page, limit, total, totalPages: Math.ceil(total / limit) };
};

export const listSellerProperties = (sellerId: string) =>
    Property.find({ sellerId }).sort({ createdAt: -1 }).lean();

export const getProperty = async (propertyId: string, viewerId?: string) => {
    const property = await Property.findById(propertyId)
        .populate("sellerId", "firstName lastName phone email")
        .lean();

    if (!property) throw new AppError("Property not found", 404);
    const ownerId = (property.sellerId as unknown as { _id?: { toString(): string }; toString(): string });
    const sellerId = ownerId._id?.toString() ?? ownerId.toString();
    if (property.status !== "active" && sellerId !== viewerId) {
        throw new AppError("Property not found", 404);
    }
    return property;
};

const getOwnedProperty = async (propertyId: string, sellerId: string) => {
    const property = await Property.findById(propertyId);
    if (!property) throw new AppError("Property not found", 404);
    if (property.sellerId.toString() !== sellerId) {
        throw new AppError("You do not own this property", 403);
    }
    return property;
};

export const updateProperty = async (
    propertyId: string,
    sellerId: string,
    data: Partial<PropertyInput>
) => {
    const property = await getOwnedProperty(propertyId, sellerId);
    Object.assign(property, data, { sellerId: property.sellerId });
    return property.save();
};

export const updatePropertyStatus = async (
    propertyId: string,
    sellerId: string,
    status: PropertyStatus
) => updateProperty(propertyId, sellerId, { status });

export const deleteProperty = async (propertyId: string, sellerId: string) => {
    const property = await getOwnedProperty(propertyId, sellerId);
    await property.deleteOne();
};
