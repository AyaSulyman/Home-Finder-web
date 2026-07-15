import type { Request, Response } from "express";
import {
    listAdminAppointments,
    updateAdminAppointmentStatus
} from "../services/appointment.service";


import {
    deleteAdminProperty,
    deleteAdminUser,
    listAdminProperties,
    listAdminUsers,
    updateAdminPropertyStatus,
    updateAdminUser
} from "../services/admin.service";

import { UserRole } from "../models/user.model";
import type { PropertyStatus } from "../models/property.model";

import AppError from "../utils/appError";

const failure = (
    res: Response,
    error: unknown
) => {
    const status =
        error instanceof AppError
            ? error.statusCode
            : 500;

    const message =
        error instanceof Error
            ? error.message
            : "Unexpected server error";

    return res.status(status).json({
        success: false,
        message
    });
};

const routeId = (
    value: string | string[]
) =>
    Array.isArray(value)
        ? value[0]
        : value;

/* -------------------------------------------------------------------------- */
/*                                   USERS                                    */
/* -------------------------------------------------------------------------- */

export const getAdminUsers = async (
    req: Request,
    res: Response
) => {
    try {
        const search =
            typeof req.query.search === "string"
                ? req.query.search
                : undefined;

        const role =
            typeof req.query.role === "string"
                ? (req.query.role as UserRole)
                : undefined;

        const users = await listAdminUsers({
            search,
            role
        });

        return res.json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const editAdminUser = async (
    req: Request,
    res: Response
) => {
    try {
        const user = await updateAdminUser(
            routeId(req.params.id),
            req.user!._id.toString(),
            req.body
        );

        return res.json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const removeAdminUser = async (
    req: Request,
    res: Response
) => {
    try {
        await deleteAdminUser(
            routeId(req.params.id),
            req.user!._id.toString()
        );

        return res.json({
            success: true,
            message: "User deleted successfully",
            data: null
        });
    } catch (error) {
        return failure(res, error);
    }
};

/* -------------------------------------------------------------------------- */
/*                                PROPERTIES                                  */
/* -------------------------------------------------------------------------- */

export const getAdminProperties = async (
    req: Request,
    res: Response
) => {
    try {
        const search =
            typeof req.query.search === "string"
                ? req.query.search
                : undefined;

        const status =
            typeof req.query.status === "string"
                ? (req.query.status as PropertyStatus)
                : undefined;

        const properties = await listAdminProperties({
            search,
            status
        });

        return res.json({
            success: true,
            message: "Properties retrieved successfully",
            data: properties
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const editAdminPropertyStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const property = await updateAdminPropertyStatus(
            routeId(req.params.id),
            req.body.status
        );

        return res.json({
            success: true,
            message: "Property status updated successfully",
            data: property
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const removeAdminProperty = async (
    req: Request,
    res: Response
) => {
    try {
        await deleteAdminProperty(
            routeId(req.params.id)
        );

        return res.json({
            success: true,
            message: "Property deleted successfully",
            data: null
        });
    } catch (error) {
        return failure(res, error);
    }
};
export const getAdminAppointments = async (
    req: Request,
    res: Response
) => {
    try {
        const appointments = await listAdminAppointments();

        return res.json({
            success: true,
            message: "Appointments retrieved successfully",
            data: appointments
        });
    } catch (error) {
        return failure(res, error);
    }
};
export const editAdminAppointmentStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const appointment = await updateAdminAppointmentStatus(
            routeId(req.params.id),
            req.body.status
        );

        return res.json({
            success: true,
            message: "Appointment status updated successfully",
            data: appointment
        });
    } catch (error) {
        return failure(res, error);
    }
};