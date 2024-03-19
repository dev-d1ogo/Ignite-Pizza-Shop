import { Home, Pizza, UtensilsCrossed } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { NavLink } from "./nav-link"
import { ToggleTheme } from "./theme/theme-toggle"
import { AccountMenu } from "./account-menu"


export const Header = () => {
    return (
      <div className="border-b">
        <header className="flex h-16 gap-6 items-center px-6">
            <div>
            <Pizza className="h-5 w-5"/>

            </div>
            <Separator className = 'h-8'orientation="vertical"/>

            <nav className="flex items-center space-x-4 lg:space-x-6">
                <NavLink to={'/'}>
                    <Home className="h-4 w-4"/>
                    DashBoard
                </NavLink>
                <NavLink to={'/orders'}>
                    <UtensilsCrossed className="h-4 w-4"/>
                    Pedidos
                </NavLink>
            </nav>

            <div className="ml-auto flex items-center gap-2 ">
                <ToggleTheme/>
                <AccountMenu/>
            </div>
        </header>
      </div>
    )
}
