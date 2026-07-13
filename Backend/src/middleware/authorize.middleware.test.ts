import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../models/user.model";
import authorize from "./authorize.middleware";

const createResponse = () => {
    const response = {
        status: vi.fn(),
        json: vi.fn()
    } as unknown as Response;

    vi.mocked(response.status).mockReturnValue(response);
    return response;
};

describe("authorize", () => {
    it("returns 401 when authentication did not attach a user", () => {
        const request = {} as Request;
        const response = createResponse();
        const next = vi.fn() as NextFunction;

        authorize(UserRole.SELLER)(request, response, next);

        expect(response.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it("returns 403 when the user role is not allowed", () => {
        const request = {
            user: { role: UserRole.BUYER }
        } as Request;
        const response = createResponse();
        const next = vi.fn() as NextFunction;

        authorize(UserRole.SELLER)(request, response, next);

        expect(response.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    it("continues when the user role is allowed", () => {
        const request = {
            user: { role: UserRole.SELLER }
        } as Request;
        const response = createResponse();
        const next = vi.fn() as NextFunction;

        authorize(UserRole.SELLER)(request, response, next);

        expect(next).toHaveBeenCalledOnce();
        expect(response.status).not.toHaveBeenCalled();
    });
});
