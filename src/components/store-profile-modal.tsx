import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogClose, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uptadeProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;



export const ProfileModal = () => {
  const queryClient = useQueryClient();
  // Como ja fizemos essa requisicao antes ela não será feita novamente e sim o dado em cache será aproveitado
  // Um dos beneficios do React querry

  const { data: managedProfile } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,

    // staleTime infinty faz com que essa informaçao nunca seja recarregada, visto que não é comum o nome do restaurante mudar
    staleTime: Infinity,
  });

  // Usando o useform

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: managedProfile?.name,
      description: managedProfile?.description ?? "",
    },
  });

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);
    console.log(cached);

    if (cached) {
      // Atulizando os dados com o setQueryData que recebe um chave e um novo dado
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        }
      );
    }
    // Retornando o cached para o contexto
    return { cached };
  };
  // Usando o useMutation
  const { mutateAsync: uptadeProfileFn } = useMutation({
    mutationFn: uptadeProfile,
    /*
      onSucess ou onQualquerCoisa retorna 3 parametos

      data: os dados retornados na nossa requisicao.
      variables: os dados enviados na nossa requisicao post, put ou delete -> neste caso o nome e a descricao
      context: é o retorno de cada mutação seja ele onSucess, onMutate e etc...
      
    */

    // Diferente do onSucess o onMutate no momento que a requisicao e feita o estado em cache é alterado
    onMutate(variables) {
      const { description, name } = variables;

      // Resgatando as informacoes
      const { cached } = updateManagedRestaurantCache({ name, description });

      return { previousNameInCaseError: cached };
    },

    onError(_error, _varibles, context) {
      // Caso de erro iremos atualizar o nome da loja para o nome antes da mudança solicitada
      if(context?.previousNameInCaseError){
        updateManagedRestaurantCache(context.previousNameInCaseError)
      }
    },
  });

  const handleUpdateProfile = async (data: StoreProfileSchema) => {
    try {
      await uptadeProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Dados alterados com sucesso", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Falha ao atualizar os dados, tente novamente mais tarde");
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-bold">Perfil da loja</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Digite o novo nome"
              className="col-span-3"
              {...register("name")}
            ></Input>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              placeholder="Digite a nova descrição do seu estabelecimento"
              className="col-span-3"
              {...register("description")}
            ></Textarea>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              disabled={isSubmitting}
              className="w-20 hover:bg-rose-500"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"sucess"}
            disabled={isSubmitting}
            className="w-20"
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};
