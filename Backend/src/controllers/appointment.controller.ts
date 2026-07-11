import type { Request, Response } from "express";
import {
    createAppointment,
    listBuyerAppointments,
    listSellerAppointments,
    updateAppointmentStatus
} from "../services/appointment.service";
import AppError from "../utils/appError";

const routeId = (value: string | string[]) => Array.isArray(value) ? value[0] : value;
const failure = (res: Response, error: unknown) => res.status(
    error instanceof AppError ? error.statusCode : 500
).json({ success: false, message: error instanceof Error ? error.message : "Unexpected server error" });

export const requestAppointment = async (req: Request, res: Response) => {
    try {
        const data = await createAppointment(req.user!._id.toString(), req.body);
        return res.status(201).json({ success: true, message: "Appointment requested", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const buyerAppointments = async (req: Request, res: Response) => {
    try {
        const data = await listBuyerAppointments(req.user!._id.toString());
        return res.json({ success: true, message: "Buyer appointments retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const sellerAppointments = async (req: Request, res: Response) => {
    try {
        const data = await listSellerAppointments(req.user!._id.toString());
        return res.json({ success: true, message: "Seller appointments retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const changeAppointmentStatus = async (req: Request, res: Response) => {
    try {
        const role = req.user!.role === "buyer" ? "buyer" : "seller";
        const data = await updateAppointmentStatus(
            routeId(req.params.id),
            req.user!._id.toString(),
            role,
            req.body.status
        );
        return res.json({ success: true, message: "Appointment status updated", data });
    } catch (error) {
        return failure(res, error);
    }
};
