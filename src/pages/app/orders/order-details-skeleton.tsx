import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const OrderDetailsSkeleton = () =>{
    return(
        <div className="space-y-6">
            {/* Tabela para os detalhes do cliente e pedido */}
            <Table>
              <TableBody className="text-start">
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Status
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Skeleton className="h-5 w-20"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Cliente
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-[164px] ml-auto"/>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Telefone
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-[140px] ml-auto"/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">Email</TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-[200px] ml-auto"/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground ml-auto">
                    Realizado
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    <Skeleton className="h-5 w-[148px] ml-auto"/>
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
                {Array.from({length : 2}).map((_, itemIndex) => {
                    return (
                      <TableRow key={itemIndex}>
                        <TableCell>
                            <Skeleton className="h-5 w-[140px] "/>
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-6 ml-auto"/>
                        </TableCell>

                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-[48px] ml-auto"/>
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="h-5 w-[48px] ml-auto"/>
                        </TableCell>
                      </TableRow>
                    );
                })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right font-medium">
                    <Skeleton className="h-5 w-20"/>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
    )
}