import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { Toaster } from 'sonner'
import { ThemeProvider } from "./components/theme/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
      {/* Passando o client para o QueryProvider para conseguirmos usar todas as funcionalidades do react querry em toda aplicacao  */}
      
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
      <Toaster richColors closeButton/>
    </ThemeProvider>
  )
}


