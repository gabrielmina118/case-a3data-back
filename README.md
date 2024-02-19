
---

# backEnd- A3data

Este documento descreve a documentação do backend para a aplicação web de Pedido Cirúrgico. O backend é desenvolvido utilizando o framework NestJS e utiliza um banco de dados MySQL para armazenar os dados dos pedidos cirúrgicos. Além disso, são utilizados TypeORM como ORM para manipulação do banco de dados. O objetivo deste backend é fornecer serviços RESTful para gerenciar os pedidos cirúrgicos, incluindo operações de listar, cadastrar, editar, visualizar e excluir pedidos cirúrgicos.

## Instruções de Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/case-a3data-back
   ```
2. Rodar código:
    ```
   cd case-a3data-back
   npm install
   npm run dev
   ```
    
## Documentação do Postman rodando localmente :
https://documenter.getpostman.com/view/15065875/2sA2r824bW


## Estrutura de Diretórios :

O projeto está organizado da seguinte forma:

```
projeto/
|-- src/
|   |-- controllers/
|   |   |-- controller.spec.ts/
|   |-- interceptions/
|   |-- models/
|   |-- modules/
|   |-- schemas/
|-- app.module.ts
|-- main.ts
```

## Tecnologias Utilizadas :

- NestJS: Framework backend que utiliza TypeScript e fornece uma arquitetura modular e escalável.
- Banco de Dados: MySQL  para armazenar os dados dos pedidos cirúrgicos.
- TypeORM: ORM para manipular o banco de dados e realizar operações CRUD de forma simplificada.
- Testes Unitários e de Integração: Garantem a qualidade do código e o funcionamento correto das operações.
- Arquitetura Limpa: Foco na organização e separação de responsabilidades para garantir um código limpo e manutenível.
- Documentação do Código: Utilização de comentários e documentação adequada para facilitar a compreensão e manutenção do código.

## Testes :
Os testes devem ser executados utilizando o comando `npm run test`.

## Endpoints da API :
Os endpoints disponíveis são:
- GET: Retorna um recurso específico.
- GET All: Retorna todos os recursos.
- POST: Cria um novo recurso.
- PUT: Atualiza um recurso existente.
- DELETE: Remove um recurso existente.

## Observações :
Certifique-se de seguir as convenções de nomenclatura e organização de código do NestJS para manter o projeto limpo e fácil de manter. Utilize comentários adequados nos arquivos de código para documentar o funcionamento e a finalidade de cada componente.





---
