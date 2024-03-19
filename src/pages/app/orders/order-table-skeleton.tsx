import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export const TableSkeleton = () =>{
    return Array.from({ length: 10 }).map((_order, orderIndex) => {
        return (
          <TableRow key={orderIndex} className="p-4">
            <TableCell>
              <Button disabled variant={"outline"} className="w-[32px] h-[30px] px-2">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[172px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[148px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[110px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[64px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-92px]" />
            </TableCell>
          </TableRow>
        );
    });
}