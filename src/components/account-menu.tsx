import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton"

import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ProfileModal } from "./store-profile-modal";
import { signOut } from "@/api/sing-out";
import { useNavigate } from "react-router-dom";


export const AccountMenu = () => {
  const navigate = useNavigate()

  // Resgatando os dados da loja

  const { data : profile, isLoading:isLoadingProfile} = useQuery({
    /*
      A queryKey serve para marcar uma requisicao.
        - caso uma outra requisicao seja solicitada com a mesma key 
        - ele nao sera feita e sim o valor de cache de uma outra ja efetuada será retornada
    */ 
    queryKey: ['profile'],
    queryFn: getProfile,
    // Infinity impede com que as informacoes recarreguem
    staleTime: Infinity
  })

  const { data : managedProfile, isLoading: isLoadingManagedRestaurant} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    // staleTime indica em quanto tempo o react query irá atualizar as informacoes ja carregadas afim que elas n sejam obsoletas
    staleTime: Infinity
  })
  
  const {mutateAsync: signOutFn, isPending: isSignOut} = useMutation({
    mutationFn: signOut,
    onSuccess: () =>{
      // Replace : true => faz com que crie uma nova rota fazendo com que o usuario nao posso clicar em voltar para a rota antiga
      navigate('/signIn', {replace: true})
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center gap-2 select-none w-40"
        >
          {isLoadingManagedRestaurant ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            managedProfile?.name
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <Dialog>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col ">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-[3px]" />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="w-4 h-4 mr-2" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem asChild className="text-red-500 dark:text-red-400" disabled = {isSignOut}>
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>

        <DialogContent className="top-1/4">
          <ProfileModal/>
        </DialogContent>

      </Dialog>
    </DropdownMenu>
  );
};
