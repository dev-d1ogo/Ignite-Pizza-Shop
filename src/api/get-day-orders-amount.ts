import { api } from "@/lib/axios";

export interface GetDaysOrdersAmountResponse{
    amount: number,
    diffFromYesterday: number
}

export async function getDaysOrdersAmount(){
    const response = await api.get('/metrics/day-orders-amount')

    // Outra maneira de tipar o dado

    return response.data as GetDaysOrdersAmountResponse
}