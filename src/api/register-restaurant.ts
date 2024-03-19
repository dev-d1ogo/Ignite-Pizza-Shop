// Template de interface para cada requisicao 

import { api } from "@/lib/axios"

export interface RegisterRestaurantBody{
    restaurantName: string,
    managerName: string,
    phone: string,
    email: string
    
}

// Funcao de registro
export const registerRestaurant = async ({
  restaurantName,
  managerName,
  email,
  phone,
}: RegisterRestaurantBody) => {
  // Fazendo requisicao para o backend na /restaurants
  await api.post("/restaurants", {
    restaurantName,
    managerName,
    email,
    phone,
  })
}