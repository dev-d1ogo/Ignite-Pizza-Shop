import { PizzaIcon } from "lucide-react"
import { Link } from "react-router-dom"

export const PageNotFound = () =>{
    return(
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 tracking-tight flex-wrap justify-center">
                <h1 className="text-4xl font-bold text-center">Página não encontrada</h1>
                <PizzaIcon className="h-8 w-8"/>

            </div>
            <p className="text-accent-foreground">Voltar para o <Link to={'/'} className="text-sky-600 dark:text-sky-400">Dashboard</Link></p>
        </div>
    )
}