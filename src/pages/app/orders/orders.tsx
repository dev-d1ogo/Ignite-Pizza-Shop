import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { OrderTableRow } from "./order-table-row"
import { OrderTableFilters } from "./order-table-filters"
import { Pagination } from "@/components/pagination"
import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/api/get-orders"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"
import { TableSkeleton } from "./order-table-skeleton"


export const Orders = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get('orderId');
    const customerName= searchParams.get('customerName');
    const status = searchParams.get('status');

    // O que ta acontecendo => o array começa em 0 porem paginacao em 1
        // Entao para o usuario a paginacao será 1 e para o sistema a paginacao será 0 seguindo a notacao do array
    const pageIndex = z.coerce
        .number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? '1')

    const { data: result } = useQuery({
        queryKey: ['orders', orderId, customerName, status, pageIndex],
        queryFn: () => getOrders({orderId, customerName, status: status === 'all' ? null : status, pageIndex})
    })
    // Funcao para trocar de pagina

    const handlePageChange = (page:number) => {
        setSearchParams(urlState => {
            urlState.set('page', (page + 1).toString())

            return urlState
        })
    }
    return (
      <>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

          <div className="space-y-4 mt-3">
            <OrderTableFilters />

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[64px]"></TableHead>
                    <TableHead className="w-[140px]">Identificador</TableHead>
                    <TableHead className="w-[180px]">Realizado</TableHead>
                    <TableHead className="w-[240px]">Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="w-[140px]">Total do pedido</TableHead>
                    <TableHead className="w-[164px]"></TableHead>
                    <TableHead className="w-[132px]"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {result ?
                    result.orders.map((order) => {
                      return (
                        <OrderTableRow key={order.orderId} order={order} />
                      );
                    }) : (<TableSkeleton/>)}
                </TableBody>
              </Table>
            </div>
            {result && (
              <Pagination
                pageIndex={result.meta.pageIndex}
                perPage={result.meta.perPage}
                totalCount={result.meta.totalCount}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}
