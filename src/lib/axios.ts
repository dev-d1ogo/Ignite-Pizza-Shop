import { env } from '@/env';
import axios from 'axios'

// Importando a nossa variavel ambiente no axios
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  // Faz com que cookies sejam recebidos
  withCredentials: true,
});

// Setando um delay para as requisicoes do axios
if (env.VITE_ENABLE_API_DELAY){
  api.interceptors.request.use(async (config) =>{
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}