import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { useForm } from 'react-hook-form'

import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurant"

const signUpSchema = zod.object({
    restaurantName: zod.string(),
    managerName: zod.string(),
    phone: zod.string(),
    email: zod.string().email()
})


export const SignUp = () => {
    const navigate = useNavigate()
    const { 
    register,
    handleSubmit,
    formState: { isSubmitting},
    reset
    } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
    });

    const { mutateAsync: resgisterRestaurantFn } = useMutation({
        mutationFn: registerRestaurant,
    });

    type SignUpForm = zod.infer<typeof signUpSchema>

    const handleSignUp = async(data:SignUpForm) => {
        try {
            await resgisterRestaurantFn({
               restaurantName: data.restaurantName,
               managerName: data.managerName,
               email: data.email,
               phone: data.phone,
            })
            reset()
            toast.success("Restaurante cadastrado", {
            action: {
                label: "Login",
                onClick: () => {
                // Passando o email registrado na url da pagina de login para ele ser usado para entrar
                navigate(`/signIn?email=${data.email}`);
                },
            },
            duration: 3000,
            });

        } catch (error:any) {
            toast.error("Erro ao cadastrar restaurante");
            console.log(error.response.data);
        }
    }
    return (
        <>
            <div className="p-8">
                <Button asChild variant={"outline"} className="absolute right-8 top-8 hover:bg-red-700 hover:text-white">
                    <Link to={'/signIn'}>
                        Login
                    </Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">

                    <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Criar conta grátis
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Seja um parceiro e comece suas vendas
                    </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input  id="restaurantName" type="text" {...register("restaurantName")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="menagerName">Seu nome completo</Label>
                            <Input  id="menagerName" type="text" {...register("managerName")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input  id="email" type="email" {...register("email")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu telefone</Label>
                            <Input  id="phone" type="text" {...register("phone")} />
                        </div>

                        <Button disabled={isSubmitting} className=" w-full" type="submit">
                            Finalizar Cadastro
                        </Button>
                        
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos <a  className="underline underline-offset-2" href="">Termos de serviço</a> e {''} <a className="underline underline-offset-2"  href="">política de privacidade</a> .
                        </p>
                    </form>
                </div> 
            </div>
        </>
    );
}
