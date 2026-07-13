import type { Request, Response } from "express";
import { addFavorite, listFavorites, removeFavorite } from "../services/favorite.service";
import AppError from "../utils/appError";

const routeId = (value: string | string[]) => Array.isArray(value) ? value[0] : value;
const failure = (res: Response, error: unknown) => res.status(
    error instanceof AppError ? error.statusCode : 500
).json({
    success: false,
    message: error instanceof Error ? error.message : "Unexpected server error"
});

export const favorites = async (req: Request, res: Response) => {
    try {
        const data = await listFavorites(req.user!._id.toString());
        return res.json({ success: true, message: "Favorites retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const saveFavorite = async (req: Request, res: Response) => {
    try {
        const data = await addFavorite(
            req.user!._id.toString(),
            routeId(req.params.propertyId)
        );
        return res.status(201).json({ success: true, message: "Property saved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const unsaveFavorite = async (req: Request, res: Response) => {
    try {
        await removeFavorite(req.user!._id.toString(), routeId(req.params.propertyId));
        return res.json({ success: true, message: "Property removed from favorites", data: null });
    } catch (error) {
        return failure(res, error);
    }
};
