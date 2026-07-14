import { apiRequest } from "./apiClient";

export interface Appointment {
    _id: string;
    propertyId: {
        _id: string;
        title: string;
        address: string;
        price: number;
        images: string[];
        status: string;
    };
    buyerId: {
        _id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    sellerId: {
        _id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    scheduledAt: string;
    message?: string;
    status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
}

// Request a new appointment
export const requestAppointmentAction = async (data: {
    propertyId: string;
    date: string;
    time: string;
    message?: string;
}) => {
    console.log('📤 Sending appointment request:', data);
    try {
        const result = await apiRequest("/appointments", {
            method: "POST",
            body: JSON.stringify(data)
        });
        console.log('✅ Appointment created:', result);
        return result;
    } catch (error) {
        console.error('❌ Failed to create appointment:', error);
        throw error;
    }
};

// Update appointment status
export const updateAppointmentStatusAction = async (id: string, status: string) => {
    console.log(`📤 Updating appointment ${id} to ${status}`);
    try {
        const result = await apiRequest(`/appointments/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status })
        });
        console.log('✅ Appointment updated:', result);
        return result;
    } catch (error) {
        console.error('❌ Failed to update appointment:', error);
        throw error;
    }
};

// Get buyer's appointments
export const getBuyerAppointments = async (): Promise<Appointment[]> => {
    try {
        const data = await apiRequest<Appointment[]>('/appointments/buyer', {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error('❌ Failed to get buyer appointments:', error);
        throw error;
    }
};

// Get seller's appointments
export const getSellerAppointments = async (): Promise<Appointment[]> => {
    try {
        const data = await apiRequest<Appointment[]>('/appointments/seller', {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error('❌ Failed to get seller appointments:', error);
        throw error;
    }
};

// Get single appointment
export const getAppointmentById = async (id: string): Promise<Appointment> => {
    try {
        const data = await apiRequest<Appointment>(`/appointments/${id}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error('❌ Failed to get appointment:', error);
        throw error;
    }
};

// Check availability
export const checkSlotAvailability = async (
    propertyId: string,
    date: string,
    time: string
): Promise<{ available: boolean }> => {
    try {
        const data = await apiRequest<{ available: boolean }>(
            `/appointments/check-availability?propertyId=${propertyId}&date=${date}&time=${time}`,
            { method: 'GET' }
        );
        return data;
    } catch (error) {
        console.error('❌ Failed to check availability:', error);
        throw error;
    }
};