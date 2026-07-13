import Appointment, { type AppointmentStatus } from "../models/appointment.model";
import Property from "../models/property.model";
import AppError from "../utils/appError";

export interface AppointmentInput {
    propertyId: string;
    date: string;
    time: string;
    message?: string;
}

const toScheduledAt = (date: string, time: string) => {
    const value = new Date(`${date}T${time}:00.000Z`);
    if (Number.isNaN(value.getTime())) throw new AppError("Invalid appointment date or time", 400);
    return value;
};

export const createAppointment = async (buyerId: string, data: AppointmentInput) => {
    const property = await Property.findById(data.propertyId);
    if (!property || property.status !== "active") throw new AppError("Property not found", 404);
    if (property.sellerId.toString() === buyerId) {
        throw new AppError("You cannot book your own property", 400);
    }

    const scheduledAt = toScheduledAt(data.date, data.time);
    const offered = property.availability.some((slot) =>
        slot.date.toISOString().slice(0, 10) === data.date && slot.times.includes(data.time)
    );
    if (!offered) throw new AppError("The selected time is not available", 400);

    const existing = await Appointment.findOne({
        propertyId: data.propertyId,
        scheduledAt,
        status: { $in: ["pending", "accepted"] }
    });
    if (existing) throw new AppError("The selected time has already been booked", 409);

    try {
        return await Appointment.create({
            propertyId: data.propertyId,
            buyerId,
            sellerId: property.sellerId,
            scheduledAt,
            message: data.message,
            status: "pending"
        });
    } catch (error: any) {
        if (error?.code === 11000) throw new AppError("The selected time has already been booked", 409);
        throw error;
    }
};

export const listBuyerAppointments = (buyerId: string) =>
    Appointment.find({ buyerId })
        .sort({ scheduledAt: -1 })
        .populate("propertyId", "title address price images status")
        .populate("sellerId", "firstName lastName phone email")
        .lean();

export const listSellerAppointments = (sellerId: string) =>
    Appointment.find({ sellerId })
        .sort({ scheduledAt: -1 })
        .populate("propertyId", "title address price images status")
        .populate("buyerId", "firstName lastName phone email")
        .lean();

export const updateAppointmentStatus = async (
    appointmentId: string,
    userId: string,
    role: "buyer" | "seller",
    nextStatus: AppointmentStatus
) => {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new AppError("Appointment not found", 404);

    if (role === "buyer") {
        if (appointment.buyerId.toString() !== userId) throw new AppError("Forbidden", 403);
        if (nextStatus !== "cancelled" || !["pending", "accepted"].includes(appointment.status)) {
            throw new AppError("Buyer cannot perform this status transition", 400);
        }
    } else {
        if (appointment.sellerId.toString() !== userId) throw new AppError("Forbidden", 403);
        const allowed = appointment.status === "pending"
            ? ["accepted", "rejected"]
            : appointment.status === "accepted"
                ? ["completed"]
                : [];
        if (!allowed.includes(nextStatus)) {
            throw new AppError("Seller cannot perform this status transition", 400);
        }
    }

    appointment.status = nextStatus;
    return appointment.save();
};
