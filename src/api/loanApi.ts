import { apiClient } from '../lib/apiClient';

export interface LoanEstimate {
    monthlyPayment: number;
    totalPaid: number;
    totalInterest: number;
}

export async function getLoanEstimate(
    principal: number,
    annualRatePercent: number,
    termMonths: number
): Promise<LoanEstimate> {
    const response = await apiClient.get('/loan/estimate', {
        params: {
            principal,
            annualRatePercent,
            termMonths,
        },
    });

    return response.data.data;
}
