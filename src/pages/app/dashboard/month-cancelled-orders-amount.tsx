import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Ban } from "lucide-react"
import { CardSkeleton } from "./metric-card-skeleton";

export const MonthCanceledAmountCard = () => {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });
  
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-base font-semibold">
            Cancelamentos (mês)
          </CardTitle>
          <Ban className="w-4 h-4 text-muted-foreground" />
        </CardHeader>

        <CardContent className="space-y-1">
          {monthCanceledOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthCanceledOrdersAmount.diffFromLastMonth <= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      {monthCanceledOrdersAmount.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-red-500 dark:text-red-400">
                      +{monthCanceledOrdersAmount.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                )}
              </p>
            </>
          ) : (
            <CardSkeleton />
          )}
        </CardContent>
      </Card>
    );
}
