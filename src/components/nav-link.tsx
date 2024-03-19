import { Link, LinkProps, useLocation } from "react-router-dom"

export type NavLinkProps = LinkProps

export const NavLink = (props:NavLinkProps) => {
  // Verificando a rota ativa, para deixar o icone da rota ativa selecionado
  const { pathname } = useLocation()
  return (
    <Link 
    // Podemos estilizar um atributo com ailwind atraves de um data-attribute, primeiro precisamos cria-lo
    // Fazemos uma verificao se a url é igual ao to que é o caminho que esse link leva isso significa que estamos na rota daquele link

    data-current = {pathname === props.to}
    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    {...props}
    />
  )
}
