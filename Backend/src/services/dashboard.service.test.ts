import { beforeEach, describe, expect, it, vi } from "vitest";

const propertyModel = vi.hoisted(() => ({ countDocuments: vi.fn(), aggregate: vi.fn(), find: vi.fn() }));
const appointmentModel = vi.hoisted(() => ({ countDocuments: vi.fn(), find: vi.fn() }));
const favoriteModel = vi.hoisted(() => ({ countDocuments: vi.fn(), find: vi.fn() }));

vi.mock("../models/property.model", () => ({ default: propertyModel }));
vi.mock("../models/appointment.model", () => ({ default: appointmentModel }));
vi.mock("../models/favorite.model", () => ({ default: favoriteModel }));

import { getBuyerDashboard, getSellerDashboard } from "./dashboard.service";

const query = (result: unknown[] = []) => {
    const chain: Record<string, any> = {};
    chain.lean = vi.fn().mockResolvedValue(result);
    chain.populate = vi.fn().mockReturnValue(chain);
    chain.limit = vi.fn().mockReturnValue(chain);
    chain.sort = vi.fn().mockReturnValue(chain);
    return chain;
};

describe("dashboard service", () => {
    beforeEach(() => vi.resetAllMocks());

    it("calculates seller statistics from properties and appointments", async () => {
        propertyModel.countDocuments.mockResolvedValue(9);
        propertyModel.aggregate.mockResolvedValue([{ total: 4820 }]);
        appointmentModel.countDocuments
            .mockResolvedValueOnce(4)
            .mockResolvedValueOnce(17);
        appointmentModel.find.mockReturnValue(query());
        propertyModel.find.mockReturnValue(query());

        const dashboard = await getSellerDashboard("64b000000000000000000001");

        expect(dashboard.stats).toEqual({
            activeListings: 9,
            totalViews: 4820,
            pendingRequests: 4,
            confirmedViewings: 17
        });
    });

    it("calculates buyer statistics from favorites and appointments", async () => {
        favoriteModel.countDocuments.mockResolvedValue(12);
        appointmentModel.countDocuments
            .mockResolvedValueOnce(2)
            .mockResolvedValueOnce(1)
            .mockResolvedValueOnce(6);
        appointmentModel.find.mockReturnValue(query());
        favoriteModel.find.mockReturnValue(query());

        const dashboard = await getBuyerDashboard("64b000000000000000000002");

        expect(dashboard.stats).toEqual({
            savedHomes: 12,
            upcomingViewings: 2,
            pendingRequests: 1,
            pastViewings: 6
        });
    });
});
