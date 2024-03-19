// Template de interface para cada requisicao 

import { api } from "@/lib/axios"

export interface SignInBody{
    email: string,
}

// Funcao de login
export const signIn = async({ email }:SignInBody) => {
    // Fazendo requisicao para o backend
    await api.post('/authenticate', { email })
}