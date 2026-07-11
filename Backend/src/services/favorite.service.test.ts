import { beforeEach, describe, expect, it, vi } from "vitest";

const favoriteModel = vi.hoisted(() => ({
    findOneAndUpdate: vi.fn(),
    deleteOne: vi.fn(),
    find: vi.fn()
}));
const propertyModel = vi.hoisted(() => ({ findOne: vi.fn() }));

vi.mock("../models/favorite.model", () => ({ default: favoriteModel }));
vi.mock("../models/property.model", () => ({ default: propertyModel }));

import { addFavorite, removeFavorite } from "./favorite.service";

describe("favorite service", () => {
    beforeEach(() => vi.clearAllMocks());

    it("rejects favorites for inactive or missing properties", async () => {
        propertyModel.findOne.mockResolvedValue(null);

        await expect(addFavorite("buyer-1", "property-1"))
            .rejects.toMatchObject({ statusCode: 404 });
    });

    it("adds a favorite idempotently", async () => {
        propertyModel.findOne.mockResolvedValue({ _id: "property-1" });
        favoriteModel.findOneAndUpdate.mockResolvedValue({ _id: "favorite-1" });

        await addFavorite("buyer-1", "property-1");

        expect(favoriteModel.findOneAndUpdate).toHaveBeenCalledWith(
            { buyerId: "buyer-1", propertyId: "property-1" },
            { $setOnInsert: { buyerId: "buyer-1", propertyId: "property-1" } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    });

    it("removes a missing favorite without failing", async () => {
        favoriteModel.deleteOne.mockResolvedValue({ deletedCount: 0 });
        await expect(removeFavorite("buyer-1", "property-1")).resolves.toBeUndefined();
    });
});
