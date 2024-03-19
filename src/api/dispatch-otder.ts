import { api } from "@/lib/axios"

export interface DispatchOrderParams{
    orderId: string 
}

export const dispatchOrder = async({ orderId }: DispatchOrderParams) =>{
     await api.patch(`/orders/${ orderId }/dispatch`)
}