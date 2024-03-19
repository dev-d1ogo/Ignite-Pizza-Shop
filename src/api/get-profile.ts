import { api } from "@/lib/axios"

interface userProps{
    name: string;
    id: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
}
// Pegando o usuario do perfil
    // Podemos tipar o retorno de varias formas

    //primeira tipando o parametro da funcao que será uma Promise que irá retornar um usuario do tipo userProps
export const getProfile = async ():Promise<userProps> =>{
    // Segunda tipando o retorno da api
    const response = await api.get<userProps>('/me')

    // tipando o retorno dizendo que ele é do tipo userProps
    return response.data as userProps
}