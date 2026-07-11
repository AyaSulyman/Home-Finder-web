import mongoose, { Document, Schema, Types } from "mongoose";

export type AppointmentStatus = "pending" | "accepted" | "rejected" | "cancelled" | "completed";

export interface IAppointment extends Document {
    propertyId: Types.ObjectId;
    buyerId: Types.ObjectId;
    sellerId: Types.ObjectId;
    scheduledAt: Date;
    message?: string;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>({
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true, index: true },
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    scheduledAt: { type: Date, required: true, index: true },
    message: { type: String, trim: true, maxlength: 1000 },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
        default: "pending",
        index: true
    }
}, { timestamps: true });

appointmentSchema.index(
    { propertyId: 1, scheduledAt: 1 },
    {
        unique: true,
        partialFilterExpression: { status: { $in: ["pending", "accepted"] } }
    }
);

const Appointment = mongoose.model<IAppointment>("Appointment", appointmentSchema);
export default Appointment;
