import Favorite from "../models/favorite.model";
import Property from "../models/property.model";
import AppError from "../utils/appError";

export const listFavorites = (buyerId: string) =>
    Favorite.find({ buyerId })
        .sort({ createdAt: -1 })
        .populate({
            path: "propertyId",
            match: { status: "active" },
            populate: { path: "sellerId", select: "firstName lastName" }
        })
        .lean();

export const addFavorite = async (buyerId: string, propertyId: string) => {
    const property = await Property.findOne({ _id: propertyId, status: "active" });
    if (!property) throw new AppError("Property not found", 404);

    return Favorite.findOneAndUpdate(
        { buyerId, propertyId },
        { $setOnInsert: { buyerId, propertyId } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );
};

export const removeFavorite = async (buyerId: string, propertyId: string) => {
    await Favorite.deleteOne({ buyerId, propertyId });
};
