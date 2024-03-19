# Dashboard de Monitoramento de Dados de Pizzarias - Ignite Pizza Shop 🍕

Bem-vindo ao projeto Dashboard de Monitoramento de Dados de Pizzarias! Este é um projeto desenvolvido em colaboração com a Rocketseat para fornecer uma ferramenta de monitoramento eficaz para uma ou mais pizzarias.
## Link para review do Projeto:

(https://www.linkedin.com/feed/update/urn:li:activity:7171244582733602816/)

## Descrição

O objetivo deste projeto é criar uma dashboard que permita aos gestores e proprietários de pizzarias monitorar e analisar diversos dados operacionais e de desempenho em tempo real. A dashboard será uma interface intuitiva e interativa que fornecerá insights valiosos para auxiliar na tomada de decisões estratégicas.

## Funcionalidades Principais

- **Monitoramento de Vendas:** Acompanhe o volume de vendas diárias, semanais e mensais, incluindo o valor total das vendas e os produtos mais vendidos.
- **Gestão de Produtos:** Visualize todos os produtos e o status de cada produto em um tabela que filtra por ID, status, nome do cliente.
- **Análise de Desempenho:** Analise métricas-chave de desempenho, exibidas em formato de gráficos na pagina principal.

## Tecnologias Utilizadas

- **Frontend:** React.js, HTTPState, recharts.js, ShadcnUI, Tailwind, React-Hook-Form, React-Query (TanstackQuery)
- **Backend:** Bun, Elysia e Postgresql
- **Autenticação e Autorização:** JSON Web Tokens (JWT) e MagicLink,
- **Outras Ferramentas:** Axios, Zod

## Capturas de Tela

Aqui estão algumas capturas de tela das principais telas da aplicação:

### 1. Tela de Login

<img src="https://github.com/p4peldebala/ProsperPizza/assets/120611995/dce0cfe0-dde0-4a75-8f16-ac65f1ee99d8"/> 

Descrição: Esta tela permite que os donos da pizzaria façam login ou registrem uma nova pizzaria no app.

### 2. Página Inicial (Dashboard)

<img src="https://github.com/p4peldebala/ProsperPizza/assets/120611995/3dd2c040-8889-482b-8977-8ff57cdb8ce9"/> 

Descrição: A página inicial da Dashboard exibe um gráfico detalhado de quantidade de receitas em um dado intervalo, conta também com um gráfico em formato de pizza com os principais produtos vendidos, além do faturamento total no mês,
total de pedidos no mês, total de pedidos no dia e total de cancelamentos no mês.

### 3. Página de Pedidos

<img src="https://github.com/p4peldebala/ProsperPizza/assets/120611995/d64610e5-74bf-4efa-8200-50e6b40cc7e8"/> 

Descrição: A página de pedidos mostra uma tabela onde se pode filtrar por id do pedido, nome do cliente e status do pedido. Além de poder alterar o status de cada pedido individualmente.

### 4. Detalhes do Pedido

<img src="https://github.com/p4peldebala/ProsperPizza/assets/120611995/d793a05b-93d7-4365-9612-37627d1cb4fc"/> 

Descrição: Abre-se um modal com os detalhes de cada pedido como nome do cliente, telefone e email. E detalhes do pedido como quantidade, preço e valor total de cada item e subtotal.
