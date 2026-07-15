import { apiRequest } from "./apiClient";
import type { Appointment } from "./appointmentActions";


/* -------------------------------------------------------------------------- */
/*                                   USERS                                    */
/* -------------------------------------------------------------------------- */

export interface AdminUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "buyer" | "seller" | "admin";
    status: "active" | "suspended";
    listingsCount: number;
    acceptedTerms: boolean;
    createdAt: string;
    updatedAt: string;


}

export const getAdminUsersAction = (
    search?: string,
    role?: string
) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (role) params.append("role", role);

    return apiRequest<AdminUser[]>(
        `/admin/users${params.toString() ? `?${params}` : ""}`
    );
};

export const updateAdminUserAction = (
    id: string,
    data: Partial<AdminUser>
) =>
    apiRequest<AdminUser>(
        `/admin/users/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(data)
        }
    );

export const deleteAdminUserAction = (
    id: string
) =>
    apiRequest(
        `/admin/users/${id}`,
        {
            method: "DELETE"
        }
    );

/* -------------------------------------------------------------------------- */
/*                                 PROPERTIES                                 */
/* -------------------------------------------------------------------------- */

export interface AdminProperty {
    _id: string;
    title: string;
    price: number;
    status: string;
    sellerId: {
        firstName: string;
        lastName: string;
        email: string;
    };
}

export const getAdminPropertiesAction = (
    search?: string,
    status?: string
) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (status) params.append("status", status);

    return apiRequest<AdminProperty[]>(
        `/admin/properties${params.toString() ? `?${params}` : ""}`
    );
};

export const updateAdminPropertyStatusAction = (
    id: string,
    status: string
) =>
    apiRequest<AdminProperty>(
        `/admin/properties/${id}/status`,
        {
            method: "PATCH",
            body: JSON.stringify({ status })
        }
    );

export const deleteAdminPropertyAction = (
    id: string
) =>
    apiRequest(
        `/admin/properties/${id}`,
        {
            method: "DELETE"
        }
    );

export const getAdminAppointmentsAction = () =>
    apiRequest<Appointment[]>("/admin/appointments");

export const updateAdminAppointmentStatusAction = (
  id: string,
  status: Appointment["status"]
) =>
  apiRequest<Appointment>(
    `/admin/appointments/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status })
    }
  );

  