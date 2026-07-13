import type { Request, Response } from "express";
import {
    createProperty,
    deleteProperty,
    getProperty,
    getPropertyById,
    getAllProperties,
    getFeaturedProperties,
    getRecommendedProperties,
    getPropertyStatistics,
    listPublicProperties,
    listSellerProperties,
    updateProperty,
    updatePropertyStatus
} from "../services/property.service";

import AppError from "../utils/appError";

const failure = (res: Response, error: unknown) => {
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

const routeId = (value: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

/* -------------------------------------------------------------------------- */
/*                               PUBLIC APIS                                  */
/* -------------------------------------------------------------------------- */

export const searchProperties = async (
    req: Request,
    res: Response
) => {

    const result =
        await listPublicProperties(req.query);


    res.json({

        success:true,

        properties: result.items,

        pagination: {

            currentPage: result.page,

            totalPages: result.totalPages,

            totalProperties: result.total,

            limit: result.limit

        }

    });

};
export const getProperties = async (
    req: Request,
    res: Response
) => {
    try {
        const result = await getAllProperties(req.query);

        return res.json({
            success: true,
            ...result
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const featuredProperties = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await getFeaturedProperties();

        return res.json({
            success: true,
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const recommendedProperties = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await getRecommendedProperties();

        return res.json({
            success: true,
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const propertyStatistics = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await getPropertyStatistics();

        return res.json({
            success: true,
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const propertyDetails = async (
    req: Request,
    res: Response
) => {
    try {
        const id = routeId(req.params.id);

        const property = req.user
            ? await getProperty(id, req.user._id.toString())
            : await getPropertyById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        return res.json({
            success: true,
            message: "Property retrieved",
            data: property
        });
    } catch (error) {
        return failure(res, error);
    }
};

/* -------------------------------------------------------------------------- */
/*                              SELLER DASHBOARD                              */
/* -------------------------------------------------------------------------- */

export const createListing = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await createProperty(
            req.user!._id.toString(),
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Property created",
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const addProperty = createListing;

export const sellerListings = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await listSellerProperties(
            req.user!._id.toString()
        );

        return res.json({
            success: true,
            message: "Seller properties retrieved",
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const editListing = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await updateProperty(
            routeId(req.params.id),
            req.user!._id.toString(),
            req.body
        );

        return res.json({
            success: true,
            message: "Property updated",
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const changeListingStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const data = await updatePropertyStatus(
            routeId(req.params.id),
            req.user!._id.toString(),
            req.body.status
        );

        return res.json({
            success: true,
            message: "Property status updated",
            data
        });
    } catch (error) {
        return failure(res, error);
    }
};

export const removeListing = async (
    req: Request,
    res: Response
) => {
    try {
        await deleteProperty(
            routeId(req.params.id),
            req.user!._id.toString()
        );

        return res.json({
            success: true,
            message: "Property deleted",
            data: null
        });
    } catch (error) {
        return failure(res, error);
    }
};