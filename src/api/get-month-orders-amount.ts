import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse{
    amount: number,
    diffFromLastMonth: number
}

// outra maneira de tipar => nao tao interessante

export async function getMonthOrdersAmount():Promise<GetMonthOrdersAmountResponse>{
    const response = await api.get('/metrics/month-orders-amount')

    // Outra maneira de tipar o dado

    return response.data 
}