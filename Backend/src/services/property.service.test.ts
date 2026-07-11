import { beforeEach, describe, expect, it, vi } from "vitest";

const propertyModel = vi.hoisted(() => ({
    create: vi.fn(),
    find: vi.fn(),
    findById: vi.fn(),
    countDocuments: vi.fn()
}));

vi.mock("../models/property.model", () => ({
    default: propertyModel
}));

import {
    createProperty,
    listPublicProperties,
    updateProperty
} from "./property.service";

describe("property service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("derives the property owner from the authenticated seller", async () => {
        propertyModel.create.mockResolvedValue({ _id: "property-1" });

        await createProperty("seller-1", {
            title: "Archer House",
            description: "A bright four-bedroom home in Lakeview.",
            listingType: "sale",
            propertyType: "house",
            price: 675000,
            address: {
                street: "1120 Maple Ave",
                city: "Lakeview",
                state: "IL",
                zipCode: "60045"
            },
            bedrooms: 4,
            bathrooms: 3,
            area: 2150,
            status: "active"
        });

        expect(propertyModel.create).toHaveBeenCalledWith(
            expect.objectContaining({ sellerId: "seller-1" })
        );
    });

    it("always restricts public listing queries to active properties", async () => {
        const lean = vi.fn().mockResolvedValue([]);
        const select = vi.fn().mockReturnValue({ lean });
        const populate = vi.fn().mockReturnValue({ select });
        const skip = vi.fn().mockReturnValue({ populate });
        const limit = vi.fn().mockReturnValue({ skip });
        const sort = vi.fn().mockReturnValue({ limit });
        propertyModel.find.mockReturnValue({ sort });
        propertyModel.countDocuments.mockResolvedValue(0);

        await listPublicProperties({ page: 1, limit: 12, status: "draft" });

        expect(propertyModel.find).toHaveBeenCalledWith(
            expect.objectContaining({ status: "active" })
        );
    });

    it("rejects updates from a seller who does not own the property", async () => {
        propertyModel.findById.mockResolvedValue({
            sellerId: { toString: () => "seller-2" }
        });

        await expect(
            updateProperty("property-1", "seller-1", { title: "Changed" })
        ).rejects.toMatchObject({ statusCode: 403 });
    });
});
