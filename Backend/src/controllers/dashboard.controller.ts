import type { Request, Response } from "express";
import { getBuyerDashboard, getSellerDashboard } from "../services/dashboard.service";

const failure = (res: Response, error: unknown) => res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Unexpected server error"
});

export const sellerDashboard = async (req: Request, res: Response) => {
    try {
        const data = await getSellerDashboard(req.user!._id.toString());
        return res.json({ success: true, message: "Seller dashboard retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};

export const buyerDashboard = async (req: Request, res: Response) => {
    try {
        const data = await getBuyerDashboard(req.user!._id.toString());
        return res.json({ success: true, message: "Buyer dashboard retrieved", data });
    } catch (error) {
        return failure(res, error);
    }
};
