import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { priceFormatter } from "@/utils/formater";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/delete-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { toast } from "sonner";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-otder";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const queryClient = useQueryClient();

  // Funcao responsavel por alterar em tela os dados:

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    // Pegando todos os dados da lista de pedidos
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    // Alterando o estado do pedido que o id é igual ao id passado na funcao de alterar o estado
    /*
      Em resumo essa funcao percorre todas as query com a key de orders 
    */
    ordersListCache.map(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  }
  // Criando todas as mutates

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: async (_variables, { orderId }, _context) => {
        updateOrderStatusOnCache(orderId, "canceled");
        toast.success('O pedido foi cancelado com sucesso!')
      },
      onError: () =>{
        toast.error('Algo deu errado, tente novamente')
      }
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: async (_variables, { orderId }, _context) => {
        updateOrderStatusOnCache(orderId, "processing");
        toast.success('O pedido foi aprovado!')
      },
      onError: () =>{
        toast.error('Algo deu errado, tente novamente')
      }
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: async (_variables, { orderId }, _context) => {
        updateOrderStatusOnCache(orderId, "delivering");
        toast.success('O pedido foi alterado para em rota de entrega!')
      },
      onError: () =>{
        toast.error('Algo deu errado, tente novamente')
      }
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: async (_variables, { orderId }, _context) => {
        updateOrderStatusOnCache(orderId, "delivered");
        toast.success('O pedido foi entregue!')
      },
      onError: () =>{
        toast.error('Algo deu errado, tente novamente')
      }
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              size={"xs"}
              className="focus-visible:ring-0"
            >
              <Search className="h-3 w-3" />
              {/* Passamos a classe sr-olnly para dizer que o span sera visivel somente para o leitor de tela ajudando na acessibilidade */}
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <OrderDetails orderId={order.orderId} />
          </DialogContent>
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      {/* Td do status do pedido */}
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {priceFormatter.format(order.total / 100)}
      </TableCell>

      <TableCell>
        {order.status === "processing" && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant={"outline"}
            size={"xs"}
            className="group"
          >
            <ArrowRight className="h-4 w-4 mr-2 group-hover:text-green-500" />
            <span>Em entrega</span>
          </Button>
        )}
       
        {order.status === "pending" && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant={"outline"}
            size={"xs"}
            className="group"
          >
            <ArrowRight className="h-4 w-4 mr-2 group-hover:text-green-500" />
            <span>Aprovar</span>
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant={"outline"}
            size={"xs"}
            className="group"
          >
            <ArrowRight className="h-4 w-4 mr-2 group-hover:text-green-500" />
            <span>Entregue</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant={"ghost"}
          size={"xs"}
          className=" hover:text-red-500 text-center"
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="h-4 w-4 " />
        </Button>
      </TableCell>
    </TableRow>
  );
};
