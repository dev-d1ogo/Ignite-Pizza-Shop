import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { DateRangePicker } from "@/components/date-ranger-picker";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { priceFormatter } from "@/utils/formater";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Usando uma cor direta do tailwind

import colors from "tailwindcss/colors";

export const BallanceChart = () => {
  const { theme } = useTheme();

  
  // State para troca de data
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    // Funcao subDays remove uma quantidade de dias a partir de uma data => no caso 7 dias atras
    from: subDays(new Date(), 7),
    to: new Date()
  })
  
  // Funcao para o fetch
  const {data : dayliRevenue} = useQuery({
    queryKey: ['metrics', 'revenue-in-period', dateRange],
    queryFn: () => getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to
    })
  })

  // Convertendo de centavos para reais

  const charData = useMemo(() =>{
    return dayliRevenue?.map(chartItem => {
      return{
        date: chartItem.date,
        receipt: chartItem.receipt / 100
      }
    })
  },[dayliRevenue])

  return (
    <Card className="lg:col-span-6 md:col-span-5 col-span-9">
      <CardHeader className="flex-row items-center justify-between pb-8 ">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Receita diária no período
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange}/>
        </div>
      </CardHeader>

      <CardContent>
        {charData ? (
          /* Utilizando a biblioteca recharts para criar o grafico */
          /* Responsive Container para fazer com que o grafico possa se redimensionar */
          <ResponsiveContainer width={"100%"} height={240}>
            <LineChart data={charData} style={{ fontSize: 12 }}>
              {/* Usando o tikformater para formatar */}
              <YAxis
                stroke={
                  theme === "system" || theme === "dark"
                    ? colors.slate[200]
                    : colors.gray[700]
                }
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => priceFormatter.format(value)}
                width={90}
              />

              <XAxis
                stroke={
                  theme === "system" || theme === "dark"
                    ? colors.slate[200]
                    : colors.gray[700]
                }
                axisLine={false}
                tickLine={false}
                dataKey={"date"}
                padding={{ left: 30 }}
                dy={16}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              {/* a proprieda dataKey é o valor dentro do objeto que vai fazer a linha subir ou descer */}
              <Line
                type={"natural"}
                strokeWidth={2}
                dataKey={"receipt"}
                stroke="red"
              />
            </LineChart>
          </ResponsiveContainer>
        ): (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-16 w-16 text-primary animate-spin"/>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
