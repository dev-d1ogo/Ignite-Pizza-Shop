import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import { Link, useSearchParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/sign-in"

const signInSchema = zod.object({
  email: zod.string().email()
})

export const SignIn = () => {
  // Resgatando o email da nossa url, caso o usuario tenha acabado de se registrar
  const [searchParams] = useSearchParams()
 console.log(searchParams)

  const { 
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<SignInForm>({
    defaultValues: {
       email: searchParams.get('email') ?? ''
    },
    resolver: zodResolver(signInSchema)
  });

 
  type SignInForm = zod.infer<typeof signInSchema>
  
  // Usamos o mutation sempre que formos fazer requisicoes de mutacao, ou seja, do tipo => Post, Put e Delete  e nao acoes de listagem como é o caso do get
    // resgatamos o mutateAsync que é a funcao que vai disparar nossa mutationFn no caso a funcao de signIn
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });
  
  const handleSignIn = async(data:SignInForm) => {
    console.log(data);
    try {
      await authenticate({ email:data.email } )
      toast.success('Enviamos um link de autenticação para seu email',{
        action:{
          label: 'Reenviar',
          onClick: () => handleSignIn(data)
        }
      })
      reset()

    } catch (error:any) {
      console.log(error.response.data);
      toast.error('Credenciais invalidas', {
        action:{
          label: 'Tentar novamente',
          onClick: () => handleSignIn(data)
        }
      })
    }
  }

  return (
    <>
      <div className="p-8">
        {/* o asChild faz com que todas as propriedades do botao sejam passadas para seu primeiro filho seja eles estilos ou metodos */}
        <Button asChild variant={"outline"} className="absolute right-8 top-8 hover:bg-red-700 hover:text-white">
          <Link to={'/signUp'}>
            Novo estabelecimento
          </Link>
        </Button>
        
        <div className="w-[350px] flex flex-col justify-center gap-6">

          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input  id="email" type="email" {...register("email")} />
            </div>

            <Button disabled={isSubmitting} className=" w-full" type="submit">
              Acessar painel
            </Button>
            
          </form>
        </div>
      </div>
    </>
  );
}
