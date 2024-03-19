import {getDaysOrdersAmount } from "@/api/get-day-orders-amount"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Utensils } from "lucide-react"
import { CardSkeleton } from "./metric-card-skeleton"

export const DaysOrderAmountCard = () => {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDaysOrdersAmount,
  });
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-base font-semibold">
            Pedidos (dia)
          </CardTitle>
          <Utensils className="w-4 h-4 text-muted-foreground" />
        </CardHeader>

        <CardContent className="space-y-1">
          {dayOrdersAmount ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {dayOrdersAmount.amount.toLocaleString("pt-BR")}
              </span>
              <p className="text-xs text-muted-foreground">
                {dayOrdersAmount.diffFromYesterday >= 0 ? (
                  <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>
                  {' '} em relação a ontem
                </>
                ) : (
                  <>
                    <span className="text-red-500 dark:text-red-400">
                      {dayOrdersAmount.diffFromYesterday}%
                    </span>{" "}
                    {' '} em relação a ontem
                  </>
                )}
              </p>
            </>
          ):  (
            <CardSkeleton />
          )}
        </CardContent>
      </Card>
    );
}
