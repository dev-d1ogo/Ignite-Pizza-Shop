export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps{
    status: OrderStatus
}

// Criando um obejto com Utily Types
// Record cosntroi um objeto com chaves e em seguida o tipo de cada chave 
// Fazemos isso para que cada status retorne um texto diferente sem fazermos diversos ifs ou switch case
const orderStatusTextMap: Record<OrderStatus, string> = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    processing: 'Em processamento',
    delivered: 'Entregue',
    delivering: 'Em rota de entrega'
}

const orderStatusColorMap: Record<OrderStatus, string> = {
    pending: 'bg-slate-400',
    canceled: 'bg-red-500',
    processing: 'w-[8px] h-[8px] bg-amber-400 animate-pulse',
    delivered: 'bg-emerald-500',
    delivering: 'w-[8px] h-[8px] bg-lime-300 animate-pulse'
}


export const OrderStatus = ({status}: OrderStatusProps) =>{
    return(
        <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${orderStatusColorMap[status]}`}></span>
            <span className="font-medium text-muted-foreground ">{orderStatusTextMap[status]}</span>
        </div>
    )
}