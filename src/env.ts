import * as zod from 'zod'

// Fazendo uma validacao das variaveis ambientes com o zod

const envSchema = zod.object({
    VITE_API_URL: zod.string().url(),
    // Setando uma variavel de delay para o axios
    VITE_ENABLE_API_DELAY: zod.string().transform(value => value === 'true')
})

// Importando a variavel ambiente com o import.meta
// validando que a url tenha o mesmo schema que foi informado caso nao vai gerar um erro
export const env = envSchema.parse(import.meta.env)