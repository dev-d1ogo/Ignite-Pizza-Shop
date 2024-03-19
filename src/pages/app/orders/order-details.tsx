import { getOrderDetails } from "@/api/get-order-details"
import { OrderStatus } from "@/components/order-status"
import {
    DialogDescription,
    DialogHeader,
    DialogTitle
} 
from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { priceFormatter } from "@/utils/formater"
import { useQuery } from "@tanstack/react-query"

import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale'
import { OrderDetailsSkeleton } from "./order-details-skeleton"

export interface OrderDetailsProps{
    orderId: string 
}

export const OrderDetails = ({ orderId }:OrderDetailsProps) => {

    const {data : orderDetails} = useQuery({
        queryKey:['order', orderId],
        queryFn: () => getOrderDetails({orderId})
    })

    console.log(orderDetails);
    
    return (
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>

        {orderDetails ? (
          <div className="space-y-6">
            {/* Tabela para os detalhes do cliente e pedido */}
            <Table>
              <TableBody className="text-start">
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <OrderStatus status={orderDetails.status} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Cliente
                  </TableCell>
                  <TableCell className="text-right">
                    <span>{orderDetails.customer.name}</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone
                  </TableCell>
                  <TableCell className="text-right">
                    {orderDetails.customer.phone ?? 'Não informado'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Email</TableCell>
                  <TableCell className="text-right">
                    {orderDetails.customer.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Realizado
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    {formatDistanceToNow(orderDetails.createdAt, {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderDetails.orderItems.map(item => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>

                        <TableCell className="text-right">
                            {priceFormatter.format(item.priceInCents / 100)}
                        </TableCell>
                        <TableCell className="text-right">
                            {priceFormatter.format(item.priceInCents/ 100 * item.quantity)}
                        </TableCell>
                      </TableRow>
                    );
                })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right font-medium">
                    {priceFormatter.format(orderDetails.totalInCents / 100)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        ): <OrderDetailsSkeleton/>}
      </DialogHeader>
    );
}
