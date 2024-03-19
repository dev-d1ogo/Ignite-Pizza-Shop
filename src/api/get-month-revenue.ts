import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse{
    receipt: number,
    diffFromLastMonth: number
}

// outra maneira de tipar => nao tao interessante

export async function getMonthRevenue(){
    const response = await api.get<GetMonthRevenueResponse>('/metrics/month-receipt')

    // Outra maneira de tipar o dado

    return response.data 
}