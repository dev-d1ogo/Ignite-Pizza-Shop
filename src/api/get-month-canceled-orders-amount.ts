import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse{
    amount: number,
    diffFromLastMonth: number
}

// outra maneira de tipar => nao tao interessante

export async function getMonthCanceledOrdersAmount(){
    const response = await api.get<GetMonthCanceledOrdersAmountResponse>('/metrics/month-canceled-orders-amount')

    // Outra maneira de tipar o dado

    return response.data 
}