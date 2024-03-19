import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFilters = z.infer<typeof orderFiltersSchema>;

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId');
  const customerName= searchParams.get('customerName');
  const status = searchParams.get('status');

  const {register, handleSubmit, control, reset} = useForm<OrdersFilters>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues:{
      customerName: customerName ?? '',
      orderId: orderId ?? '',
      status: status ?? 'all'
    }
  })

  const handleFilter  = ({orderId, customerName, status}:OrdersFilters) =>{
    setSearchParams(state => {
      // Verifificando se na URL tem o id do pedido para ser filtrado
      if(orderId){
        state.set('orderId', orderId)
        // Apagando se para evitar enviar um parametro vazio para URL
      } else{
        state.delete('orderId')
      }

      if(customerName){
        state.set('customerName', customerName)
      } else{
        state.delete('customerName')
      }

      if(status){
        state.set('status', status)
      } else{
        state.delete('status')
      }

      // Voltando para a primeira pagina visto que é uma nova lista
      state.set('page', '1')

      return state
    })
    reset({
      customerName: '',
      orderId: '',
      status: 'all'
    })
  }
  
  const handleRemoveFilters = () =>{
    setSearchParams(state => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')

      state.set('page', '1')
      return state
    })
  }
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros: </span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />
      {/* Visto que o Select do shadcnUi nao é um campo de controle nativo do html temos que usar o Controler */}
      <Controller 
        control={control} 
        name="status" 
        // O render é uma funcao que irá retornar o campo que escolhe os dados no nosso caso o Select do shadCn
        render={({field: {onChange, name, value, disabled}}) => {
          return (
            <Select 
              defaultValue="all" 
              onValueChange={onChange} 
              name={name} 
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent align="start" sideOffset={15}>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      >
        
      </Controller>

      <Button
        type="submit"
        variant={"secondary"}
        size={"xs"}
        className="hover:bg-slate-400 hover:text-white flex items-center gap-1"
      >
        <Search size={14} />
        Filtrar resultado(s)
      </Button>
      <Button
        type="button"
        variant={"outline"}
        size={"xs"}
        className="hover:bg-primary hover:text-white flex items-center gap-1"
        onClick={handleRemoveFilters}
      >
        <X size={14} />
        Excluir filtro(s)
      </Button>
    </form>
  );
};
