import type { Request, Response } from "express";
import {
    createProperty,
    deleteProperty,
    getProperty,
    listPublicProperties,
    listSellerProperties,
    updateProperty,
    updatePropertyStatus
} from "../services/property.service";
import AppError from "../utils/appError";

const failure = (res: Response, error: unknown) => {
    const status = error instanceof AppError ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return res.status(status).json({ success: false, message });
};

const routeId = (value: string | string[]) => Array.isArray(value) ? value[0] : value;

export const searchProperties = async (req: Request, res: Response) => {
    try {
        const data = await listPublicProperties(req.query);
        return res.json({ success: true, message: "Properties retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const createListing = async (req: Request, res: Response) => {
    try {
        const data = await createProperty(req.user!._id.toString(), req.body);
        return res.status(201).json({ success: true, message: "Property created", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const sellerListings = async (req: Request, res: Response) => {
    try {
        const data = await listSellerProperties(req.user!._id.toString());
        return res.json({ success: true, message: "Seller properties retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const propertyDetails = async (req: Request, res: Response) => {
    try {
        const data = await getProperty(routeId(req.params.id), req.user?._id.toString());
        return res.json({ success: true, message: "Property retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const editListing = async (req: Request, res: Response) => {
    try {
        const data = await updateProperty(
            routeId(req.params.id),
            req.user!._id.toString(),
            req.body
        );
        return res.json({ success: true, message: "Property updated", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const changeListingStatus = async (req: Request, res: Response) => {
    try {
        const data = await updatePropertyStatus(
            routeId(req.params.id),
            req.user!._id.toString(),
            req.body.status
        );
        return res.json({ success: true, message: "Property status updated", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const removeListing = async (req: Request, res: Response) => {
    try {
        await deleteProperty(routeId(req.params.id), req.user!._id.toString());
        return res.json({ success: true, message: "Property deleted", data: null });
    } catch (error) {
        return failure(res, error);
    }
};
