import Appointment, { type AppointmentStatus } from "../models/appointment.model";
import Property from "../models/property.model";
import User from "../models/user.model";
import AppError from "../utils/appError";

export interface AppointmentInput {
    propertyId: string;
    date: string;
    time: string;
    message?: string;
}

const toScheduledAt = (date: string, time: string) => {
    const value = new Date(`${date}T${time}:00.000Z`);
    if (Number.isNaN(value.getTime())) {
        throw new AppError("Invalid appointment date or time", 400);
    }
    return value;
};

export const createAppointment = async (buyerId: string, data: AppointmentInput) => {
    // Validate propertyId
    if (!data.propertyId) {
        throw new AppError("Property ID is required", 400);
    }

    // Check if property exists
    const property = await Property.findById(data.propertyId);
    if (!property) {
        throw new AppError("Property not found", 404);
    }

    // Check if property is active
    if (property.status !== "active") {
        throw new AppError("Property is not available for viewing", 400);
    }

    // Check if user is trying to book their own property
    if (property.sellerId.toString() === buyerId) {
        throw new AppError("You cannot book your own property", 400);
    }

    // Validate date and time
    if (!data.date || !data.time) {
        throw new AppError("Date and time are required", 400);
    }

    const scheduledAt = toScheduledAt(data.date, data.time);

    // Check if the time slot is available in the property's availability
    let isAvailable = false;
    if (property.availability && property.availability.length > 0) {
        isAvailable = property.availability.some((slot) =>
            slot.date.toISOString().slice(0, 10) === data.date && 
            slot.times.includes(data.time)
        );
    }

    if (!isAvailable) {
        throw new AppError("The selected time is not available for this property", 400);
    }

    // Check for conflicting appointments
    const existing = await Appointment.findOne({
        propertyId: data.propertyId,
        scheduledAt,
        status: { $in: ["pending", "accepted"] }
    });

    if (existing) {
        throw new AppError("The selected time has already been booked", 409);
    }

    // Ensure sellerId exists
    if (!property.sellerId) {
        throw new AppError("Property does not have an associated seller", 400);
    }

    try {
        const appointment = await Appointment.create({
            propertyId: data.propertyId,
            buyerId,
            sellerId: property.sellerId,
            scheduledAt,
            message: data.message || "",
            status: "pending"
        });

        // Populate the appointment before returning
        return await appointment.populate([
            { path: 'propertyId', select: 'title address price images status' },
            { path: 'buyerId', select: 'firstName lastName phone email' },
            { path: 'sellerId', select: 'firstName lastName phone email' }
        ]);
    } catch (error: any) {
        if (error?.code === 11000) {
            throw new AppError("The selected time has already been booked", 409);
        }
        throw error;
    }
};

export const listBuyerAppointments = async (buyerId: string) => {
    return Appointment.find({ buyerId })
        .sort({ scheduledAt: -1 })
        .populate("propertyId", "title address price images status")
        .populate("sellerId", "firstName lastName phone email")
        .lean();
};

export const listSellerAppointments = async (sellerId: string) => {
    return Appointment.find({ sellerId })
        .sort({ scheduledAt: -1 })
        .populate("propertyId", "title address price images status")
        .populate("buyerId", "firstName lastName phone email")
        .lean();
};

export const updateAppointmentStatus = async (
    appointmentId: string,
    userId: string,
    role: "buyer" | "seller",
    nextStatus: AppointmentStatus
) => {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    // Check permissions
    if (role === "buyer") {
        if (appointment.buyerId.toString() !== userId) {
            throw new AppError("Forbidden", 403);
        }
        if (nextStatus !== "cancelled" || !["pending", "accepted"].includes(appointment.status)) {
            throw new AppError("Buyer can only cancel pending or accepted appointments", 400);
        }
    } else if (role === "seller") {
        if (appointment.sellerId.toString() !== userId) {
            throw new AppError("Forbidden", 403);
        }
        const allowed = appointment.status === "pending"
            ? ["accepted", "rejected"]
            : appointment.status === "accepted"
                ? ["completed"]
                : [];
        if (!allowed.includes(nextStatus)) {
            throw new AppError(`Seller cannot transition from ${appointment.status} to ${nextStatus}`, 400);
        }
    } else {
        throw new AppError("Invalid role", 400);
    }

    appointment.status = nextStatus;
    await appointment.save();

    return appointment.populate([
        { path: 'propertyId', select: 'title address price images status' },
        { path: 'buyerId', select: 'firstName lastName phone email' },
        { path: 'sellerId', select: 'firstName lastName phone email' }
    ]);
};

export const getAppointmentById = async (appointmentId: string) => {
    const appointment = await Appointment.findById(appointmentId)
        .populate("propertyId", "title address price images status")
        .populate("buyerId", "firstName lastName phone email")
        .populate("sellerId", "firstName lastName phone email");
    
    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }
    return appointment;
};

export const checkAvailability = async (
    propertyId: string,
    date: Date,
    time: string
): Promise<boolean> => {
    const appointment = await Appointment.findOne({
        propertyId,
        scheduledAt: new Date(`${date.toISOString().split('T')[0]}T${time}:00.000Z`),
        status: { $in: ['pending', 'accepted'] }
    });
    return !appointment;
};