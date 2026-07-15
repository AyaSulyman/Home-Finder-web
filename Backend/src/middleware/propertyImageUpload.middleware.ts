import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { propertyUploadDirectory } from "../config/uploads";

fs.mkdirSync(propertyUploadDirectory, { recursive: true });

const extensions: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
};

const uploader = multer({
    storage: multer.diskStorage({
        destination: propertyUploadDirectory,
        filename: (_request, file, callback) => {
            callback(null, `${Date.now()}-${randomUUID()}${extensions[file.mimetype]}`);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 20
    },
    fileFilter: (_request, file, callback) => {
        if (!extensions[file.mimetype]) {
            callback(new Error("Only JPEG, PNG, and WebP images are allowed"));
            return;
        }

        callback(null, true);
    }
});

export const propertyImageUpload = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    uploader.array("images", 20)(request, response, (error) => {
        if (!error) {
            next();
            return;
        }

        const message = error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
            ? "Each image must be 5 MB or smaller"
            : error instanceof Error
                ? error.message
                : "Image upload failed";

        response.status(400).json({ success: false, message });
    });
};
