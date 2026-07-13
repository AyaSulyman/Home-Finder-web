import { Types } from "mongoose";
import Appointment from "../models/appointment.model";
import Favorite from "../models/favorite.model";
import Property from "../models/property.model";

export const getSellerDashboard = async (sellerId: string) => {
    const now = new Date();
    const [
        activeListings,
        viewsResult,
        pendingRequests,
        confirmedViewings,
        recentRequests,
        properties
    ] = await Promise.all([
        Property.countDocuments({ sellerId, status: "active" }),
        Property.aggregate([
            { $match: { sellerId: new Types.ObjectId(sellerId) } },
            { $group: { _id: null, total: { $sum: "$views" } } }
        ]),
        Appointment.countDocuments({ sellerId, status: "pending" }),
        Appointment.countDocuments({ sellerId, status: "accepted", scheduledAt: { $gte: now } }),
        Appointment.find({ sellerId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("propertyId", "title address images")
            .populate("buyerId", "firstName lastName phone email")
            .lean(),
        Property.find({ sellerId }).sort({ createdAt: -1 }).lean()
    ]);

    return {
        stats: {
            activeListings,
            totalViews: viewsResult[0]?.total ?? 0,
            pendingRequests,
            confirmedViewings
        },
        recentRequests,
        properties
    };
};

export const getBuyerDashboard = async (buyerId: string) => {
    const now = new Date();
    const [
        savedHomes,
        upcomingViewings,
        pendingRequests,
        pastViewings,
        appointments,
        favorites
    ] = await Promise.all([
        Favorite.countDocuments({ buyerId }),
        Appointment.countDocuments({
            buyerId,
            status: "accepted",
            scheduledAt: { $gte: now }
        }),
        Appointment.countDocuments({ buyerId, status: "pending" }),
        Appointment.countDocuments({
            buyerId,
            $or: [{ status: "completed" }, { scheduledAt: { $lt: now } }]
        }),
        Appointment.find({ buyerId })
            .sort({ scheduledAt: -1 })
            .limit(20)
            .populate("propertyId", "title address price images status")
            .populate("sellerId", "firstName lastName")
            .lean(),
        Favorite.find({ buyerId })
            .sort({ createdAt: -1 })
            .limit(6)
            .populate("propertyId")
            .lean()
    ]);

    return {
        stats: { savedHomes, upcomingViewings, pendingRequests, pastViewings },
        appointments,
        favorites: favorites.filter((favorite) => favorite.propertyId)
    };
};
