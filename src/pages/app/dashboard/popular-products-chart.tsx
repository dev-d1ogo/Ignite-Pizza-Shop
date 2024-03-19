import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Loader2 } from "lucide-react";

import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

// Usando uma cor direta do tailwind

import colors from "tailwindcss/colors";

const COLORS_FOR_CELL = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export const PopularProductsChart = () => {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });
  return (
    <Card className="lg:col-span-3 md:col-span-4 col-span-9">
      <CardHeader className=" pb-8 ">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart />
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts ? (
          /* Utilizando a biblioteca recharts para criar o grafico */
          /* Responsive Container para fazer com que o grafico possa se redimensionar */
          <ResponsiveContainer width={"100%"} height={240}>
            <PieChart style={{ fontSize: 12 }}>
              {/* datakey = cada parte da pizza   */}
              <Pie
                data={popularProducts}
                type={"natural"}
                strokeWidth={8}
                dataKey={"amount"}
                nameKey={"product"}
                stroke="white"
                fill={colors.emerald[500]}
                outerRadius={86}
                innerRadius={56}
                labelLine={false}
                // essa propriedade label ja veio pronto ela faz uns calculos malucos para criar uma legenda para cada parte
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product.substring(0, 12).concat("...")
                        : popularProducts[index].product}{" "}
                      ({value})
                    </text>
                  );
                }}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_FOR_CELL[index]}
                    className="stroke-background hover:opacity-60 "
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ): (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin"/>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
