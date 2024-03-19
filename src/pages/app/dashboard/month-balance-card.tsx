import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priceFormatter } from "@/utils/formater";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { CardSkeleton } from "./metric-card-skeleton";

export const MonthBallanceCard = () => {
  const { data: monthRevenue } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Receita total (mês){" "}
        </CardTitle>
        <Utensils className="w-4 h-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {priceFormatter.format(monthRevenue.receipt / 100)}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-red-500 dark:text-red-400">
                    {monthRevenue.diffFromLastMonth}%
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
};
