import { BallanceChart } from "./ballance-chart"
import { DaysOrderAmountCard } from "./day-orders-amount-card"
import { MonthBallanceCard } from "./month-balance-card"
import { MonthCanceledAmountCard } from "./month-cancelled-orders-amount"
import { OrdersAmountCard } from "./month-orders-amount"
import { PopularProductsChart } from "./popular-products-chart"


export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">DashBoard</h1>
      </div>

      <div className="card-div grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MonthBallanceCard/>
        <OrdersAmountCard/>
        <DaysOrderAmountCard/>
        <MonthCanceledAmountCard/>
      </div>

      <div className="grid grid-cols-9 gap-4">
        <BallanceChart/>
        <PopularProductsChart/>
      </div>
    </>
  )
}
