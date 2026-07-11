import { beforeEach, describe, expect, it, vi } from "vitest";

const appointmentModel = vi.hoisted(() => ({
    findOne: vi.fn(),
    create: vi.fn(),
    findById: vi.fn()
}));
const propertyModel = vi.hoisted(() => ({ findById: vi.fn() }));

vi.mock("../models/appointment.model", () => ({ default: appointmentModel }));
vi.mock("../models/property.model", () => ({ default: propertyModel }));

import { createAppointment, updateAppointmentStatus } from "./appointment.service";

describe("appointment service", () => {
    beforeEach(() => vi.clearAllMocks());

    it("rejects a time that the seller did not offer", async () => {
        propertyModel.findById.mockResolvedValue({
            sellerId: { toString: () => "seller-1" },
            status: "active",
            availability: [{ date: new Date("2026-08-01T00:00:00.000Z"), times: ["10:00"] }]
        });

        await expect(createAppointment("buyer-1", {
            propertyId: "property-1",
            date: "2026-08-01",
            time: "11:30"
        })).rejects.toMatchObject({ statusCode: 400 });
    });

    it("rejects a slot that already has an active appointment", async () => {
        propertyModel.findById.mockResolvedValue({
            sellerId: { toString: () => "seller-1" },
            status: "active",
            availability: [{ date: new Date("2026-08-01T00:00:00.000Z"), times: ["10:00"] }]
        });
        appointmentModel.findOne.mockResolvedValue({ _id: "appointment-1" });

        await expect(createAppointment("buyer-1", {
            propertyId: "property-1",
            date: "2026-08-01",
            time: "10:00"
        })).rejects.toMatchObject({ statusCode: 409 });
    });

    it("allows the property seller to accept a pending request", async () => {
        const save = vi.fn().mockResolvedValue({ status: "accepted" });
        appointmentModel.findById.mockResolvedValue({
            sellerId: { toString: () => "seller-1" },
            buyerId: { toString: () => "buyer-1" },
            status: "pending",
            save
        });

        await updateAppointmentStatus("appointment-1", "seller-1", "seller", "accepted");

        expect(save).toHaveBeenCalledOnce();
    });
});
