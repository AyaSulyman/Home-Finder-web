import { describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("../services/property.service", () => ({
    listPublicProperties: vi.fn().mockResolvedValue({
        items: [], page: 1, limit: 12, total: 0, totalPages: 0
    })
}));

import app from "../app";

describe("property routes", () => {
    it("exposes public property search", async () => {
        const response = await request(app).get("/api/properties");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.items).toEqual([]);
    });

    it("requires authentication when creating a property", async () => {
        const response = await request(app).post("/api/properties").send({});

        expect(response.status).toBe(401);
    });

    it("requires authentication when uploading property images", async () => {
        const response = await request(app).post("/api/properties/images");

        expect(response.status).toBe(401);
    });
});
