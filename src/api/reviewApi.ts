import { apiClient } from '../lib/apiClient';

export interface Review {
    id: string;
    vehicleId: string;
    userId: string;
    rating: number;
    title: string | null;
    body: string | null;
    status: string;
    createdAt: string;
}

interface VehicleReviewsResponse {
    success: boolean;
    data: Review[];
    total: number;
    averageRating: number;
}

export async function getVehicleReviews(
    vehicleId: string
): Promise<VehicleReviewsResponse> {
    const response = await apiClient.get<VehicleReviewsResponse>(
        `/reviews/vehicle/${vehicleId}`
    );

    return response.data;
}

export async function createReview(
    vehicleId: string,
    rating: number,
    title: string,
    body: string
): Promise<Review> {
    const response = await apiClient.post('/reviews', {
        vehicleId,
        rating,
        title,
        body,
    });

    return response.data.data;
}