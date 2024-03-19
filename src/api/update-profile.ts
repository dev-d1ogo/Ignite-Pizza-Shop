import { api } from "@/lib/axios";

interface UptadeProfileBody{
    name: string, 
    description: string | null
}

export const uptadeProfile = async({name, description}:UptadeProfileBody) =>{
    await api.put('/profile', {
        name,
        description
    })
}