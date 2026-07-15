import type { Request, Response } from "express";

export const uploadPropertyImages = (request: Request, response: Response) => {
    const files = (request.files as Express.Multer.File[] | undefined) ?? [];

    if (files.length === 0) {
        return response.status(400).json({
            success: false,
            message: "Select at least one image"
        });
    }

    const images = files.map((file, order) => ({
        url: `${request.protocol}://${request.get("host")}/uploads/properties/${file.filename}`,
        order,
        isCover: order === 0
    }));

    return response.status(201).json({
        success: true,
        message: "Images uploaded",
        data: { images }
    });
};
