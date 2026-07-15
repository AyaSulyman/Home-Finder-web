import User, {
    UserRole,
    UserStatus
} from "../models/user.model";

import Property, {
    type PropertyStatus
} from "../models/property.model";

import AppError from "../utils/appError";

export interface AdminUserSearch {
    search?: string;
    role?: UserRole;
}

export interface AdminUserUpdateInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    role?: UserRole;
    status?: UserStatus;
}

export interface AdminPropertySearch {
    search?: string;
    status?: PropertyStatus;
}
const USER_SAFE_FIELDS =
    "firstName lastName email phone role status acceptedTerms createdAt updatedAt";

const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* -------------------------------------------------------------------------- */
/*                                  USERS                                     */
/* -------------------------------------------------------------------------- */
export const listAdminUsers = async (
    filters: AdminUserSearch
) => {
    const query: Record<string, unknown> = {};

    if (filters.search?.trim()) {
        const searchExpression = new RegExp(
            escapeRegex(filters.search.trim()),
            "i"
        );

        query.$or = [
            { firstName: searchExpression },
            { lastName: searchExpression },
            { email: searchExpression },
            { phone: searchExpression }
        ];
    }

    if (filters.role) {
        query.role = filters.role;
    }

    const users = await User.find(query)
        .select(USER_SAFE_FIELDS)
        .sort({ createdAt: -1 })
        .lean();

    const listingCounts = await Property.aggregate([
        {
            $group: {
                _id: "$sellerId",
                count: { $sum: 1 }
            }
        }
    ]);

    const countMap = new Map(
        listingCounts.map((item) => [
            item._id?.toString(),
            item.count
        ])
    );

    return users.map((user) => ({
        ...user,
        listingsCount: countMap.get(user._id.toString()) ?? 0
    }));
};


export const updateAdminUser = async (
    userId: string,
    loggedInAdminId: string,
    data: AdminUserUpdateInput
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (
        userId === loggedInAdminId &&
        data.role &&
        data.role !== UserRole.ADMIN
    ) {
        throw new AppError(
            "You cannot remove your own admin role.",
            400
        );
    }

    if (data.email) {
        const normalizedEmail = data.email
            .trim()
            .toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
            _id: { $ne: userId }
        });

        if (existingUser) {
            throw new AppError(
                "A user with this email already exists.",
                409
            );
        }

        data.email = normalizedEmail;
    }

    if (data.firstName !== undefined) {
        user.firstName = data.firstName.trim();
    }

    if (data.lastName !== undefined) {
        user.lastName = data.lastName.trim();
    }

    if (data.email !== undefined) {
        user.email = data.email;
    }

    if (data.phone !== undefined) {
        user.phone = data.phone.trim();
    }

    if (data.status !== undefined) {
        user.status = data.status;
    }

    await user.save();

    return User.findById(userId)
        .select(USER_SAFE_FIELDS)
        .lean();
};

export const deleteAdminUser = async (
    userId: string,
    loggedInAdminId: string
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (userId === loggedInAdminId) {
        throw new AppError(
            "You cannot delete your own account.",
            400
        );
    }

    await user.deleteOne();

    return null;
};

/* -------------------------------------------------------------------------- */
/*                               PROPERTIES                                   */
/* -------------------------------------------------------------------------- */

export const listAdminProperties = async (
    filters: AdminPropertySearch
) => {
    const query: Record<string, unknown> = {};

    if (filters.search?.trim()) {
        const searchExpression = new RegExp(
            escapeRegex(filters.search.trim()),
            "i"
        );

        query.$or = [
            { title: searchExpression },
            { description: searchExpression },
            { "address.street": searchExpression },
            { "address.city": searchExpression },
            { "address.state": searchExpression }
        ];
    }

    if (filters.status) {
        query.status = filters.status;
    }

    return Property.find(query)
        .populate(
            "sellerId",
            "firstName lastName email phone role"
        )
        .sort({ createdAt: -1 })
        .lean();
};

export const updateAdminPropertyStatus = async (
    propertyId: string,
    status: PropertyStatus
) => {
    const property = await Property.findById(propertyId);

    if (!property) {
        throw new AppError(
            "Property not found.",
            404
        );
    }

    property.status = status;

    await property.save();

    return Property.findById(propertyId)
        .populate(
            "sellerId",
            "firstName lastName email phone role"
        )
        .lean();
};

export const deleteAdminProperty = async (
    propertyId: string
) => {
    const property = await Property.findById(propertyId);

    if (!property) {
        throw new AppError(
            "Property not found.",
            404
        );
    }

    await property.deleteOne();

    return null;
};