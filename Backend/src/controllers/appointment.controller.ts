import type { Request, Response } from "express";
import {
    createAppointment,
    listBuyerAppointments,
    listSellerAppointments,
    updateAppointmentStatus,
    getAppointmentById,
    checkAvailability
} from "../services/appointment.service";
import AppError from "../utils/appError";

const routeId = (value: string | string[]) => Array.isArray(value) ? value[0] : value;

const failure = (res: Response, error: unknown) => {
    console.error('❌ Appointment Error:', error);
    return res.status(
        error instanceof AppError ? error.statusCode : 500
    ).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Unexpected server error" 
    });
};

export const requestAppointment = async (req: Request, res: Response) => {
    try {
        console.log('📝 Appointment Request Body:', req.body);
        console.log('👤 User ID:', req.user?._id);
        console.log('🔑 Property ID:', req.body.propertyId);
        
        const data = await createAppointment(req.user!._id.toString(), req.body);
        return res.status(201).json({ 
            success: true, 
            message: "Appointment requested successfully", 
            data 
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const buyerAppointments = async (req: Request, res: Response) => {
    try {
        const data = await listBuyerAppointments(req.user!._id.toString());
        return res.json({ 
            success: true, 
            message: "Buyer appointments retrieved", 
            data 
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const sellerAppointments = async (req: Request, res: Response) => {
    try {
        const data = await listSellerAppointments(req.user!._id.toString());
        return res.json({ 
            success: true, 
            message: "Seller appointments retrieved", 
            data 
        });
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
        return res.json({ 
            success: true, 
            message: "Appointment status updated", 
            data 
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const getAppointment = async (req: Request, res: Response) => {
    try {
        const data = await getAppointmentById(routeId(req.params.id));
        return res.json({ 
            success: true, 
            message: "Appointment retrieved", 
            data 
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const checkSlotAvailability = async (req: Request, res: Response) => {
    try {
        const { propertyId, date, time } = req.query;
        
        if (!propertyId || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Property ID, date, and time are required"
            });
        }

        const isAvailable = await checkAvailability(
            propertyId as string,
            new Date(date as string),
            time as string
        );
        
        return res.json({ 
            success: true, 
            data: { available: isAvailable } 
        });
    } catch (error) {
        return failure(res, error);
    }
};