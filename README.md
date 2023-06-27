# Desafio NodeJS - API de receitas 🍞🍒



<div style="text-align: center;">
<p> Atividade proposta na semana de desafio NodeJS </p>
    <img src="https://i.ibb.co/1Rhm8Db/2019-11-27-210127-burger-removebg-preview-1.png" alt="API de receitas da Julia e da Talita" width="200"/>
</div>

## Desenvolvedoras 👩

Julia Rodrigues Gubolin e
Talita de Almeida Ambrozio

## Descrição do sistema 🔧

O sistema tem como objetivo permitir que o usuário crie suas receitas e armazene receitas disponibilizadas pela API externa.

- Os tipos de usuários são: 
    - USER: não pode atualizar/deletar/pesquisar usuários
    - ADMIN: pode utilizar todas as funcionalidades
    - VIEWER: pode utilizar apenas os endpoints com GETS que não envolvam o banco de dados

### Variáveis de ambiente da API de usuários, autenticação e autorização (Segunda API)

No arquivo ``.env.example`` existem algumas variáveis que devem ser preenchidas.

- A porta ``PORT`` por padrão está como 3000, mas pode ser preenchida com outro valor;
- ``DATABASE_URI`` deve conter a URI da base de dados do mongoDB Atlas;
- ``ACCESS_TOKEN_SECRET`` e ``REFRESH_TOKEN_SECRET`` podem ser geradas digitando os seguintes comandos no terminal:
~~~
node
require('crypto').randomBytes(64).toString('hex')
~~~
Pegue esta string (sem as aspas) e coloque como valor da variável ``ACCESS_TOKEN_SECRET``. Digite novamente o comando: 
~~~
require('crypto').randomBytes(64).toString('hex')
~~~
Pegue esta string (sem as aspas) e coloque como valor da variável ``REFRESH_TOKEN_SECRET``.

### Variáveis de ambiente da API de receitas (Primeira API)

No arquivo ``.env.example`` existem algumas variáveis que devem ser preenchidas.

- A porta ``PORT`` por padrão está como 3001, mas pode ser preenchida com outro valor;
- ``DB_USER`` e ``DB_PASS`` devem conter, respectivamente, o usuário e a senha do banco de dados Atlas MongoDB
- ``API_KEY`` é a chave fornecida criando uma conta no site da [Spoonacular API](https://spoonacular.com/food-api/). Ela fica disponível no seu perfil em Profile > API key

## Tecnologias

- Mongoose versão 6.8.1
- Express versão 4.18.2
- JWT versão 9.0.0
- UUID versão 9.0.0
- Postman versão 10
## API externa

[Spoonacular](https://spoonacular.com/food-api)

A Spoonacular é uma API com muitas funcionalidades relacionadas à alimentação, permite realizar buscas por diversas receitas, ingredientes, produtos e itens. A partir dela é possível fazer análises de receitas, gestão de receitas, planejamento de refeições e receitas compráveis.

## Endpoints

- Autenticação:
~~~
POST - http://localhost:3001/auth/register - faz registro de novos usuários
POST - http://localhost:3001/auth/login - login
~~~

- Usuários:
~~~
DELETE - http://localhost:3001/users/:id - deleta um usuário cadastrado
GET ID - http://localhost:3001/users/:id - busca um usuário por ID
GET - http://localhost:3001/users - retorna a lista de usuários cadastrados
UPDATE - http://localhost:3001/users/update/:id - atualiza os dados do usuário
PATCH - http://localhost:3001/users/addFavoriteRecipe/:id - adiciona as receitas favoritas na lista de receitas do usuário
~~~

- Receitas da Spoonacular:
~~~
GET - http://localhost:3001/recipes - retorna a lista completa de receitas disponíveis na Spoonacular
GET - http://localhost:3001/recipes/:id/information - retorna informações detalhadas de uma receita, passando seu ID como parâmetro
GET - http://localhost:3001/ingredients/search/:name - busca ingredientes da Spoonacular por nome
GET - http://localhost:3001/recipes/findByIngredient/:ingredient - busca receitas da Spoonacular por ingrediente
GET - 
POST - http://localhost:3001/saveRecipe/:id - busca uma receita por ID e a salva no banco de dados
~~~

- Receitas Salvas no Banco de Dados:
~~~
GET - http://localhost:3001/DBrecipes - retorna a lista de receitas salvas no banco de dados
GET - http://localhost:3001/DBrecipes/:id - busca uma receita salva no banco de dados pelo seu ID
GET - http://localhost:3001/DBrecipes/findByIngredient/:ingredientName - busca uma receita salva no banco de dados por ingredientes
PUT - http://localhost:3001/DBrecipes/update/:id - atualiza os dados de uma receita salva no banco de dados
DELETE - http://localhost:3001//DBrecipes/delete/:id - exclui uma receita do banco de dados

~~~

- Receitas próprias
~~~
POST - http://localhost:3001/ownRecipe - salva receitas criadas pelo usuário no banco de dados
DELETE - http://localhost:3001/ownRecipe/:id - deleta uma receita criada pelo usuário do banco de dados
GET ID - http://localhost:3001/ownRecipe/:id - busca uma receita própria por ID
GET - http://localhost:3001/ownRecipe - retorna a lista de receitas próprias salvas no banco de dados
GET - http://localhost:3001/ownRecipe/:ingredientName - busca receitas próprias por ingrediente
PUT - http://localhost:3001/ownRecipe/:id/ingredients - adiciona ingredientes à uma receita própria
PUT - http://localhost:3001/ownRecipe/update/:id/ - atualiza os dados de uma receita própria
~~~
🟧 [**Postman com endpoints**](https://www.postman.com/ambroziotalita/workspace/desafio-nodejs/overview)

## Como executar 💻

- Faça o clone deste repositório: ``git clone git@git.gft.com:jaui/desafio-nodejs.git`` ou baixe o .zip do projeto
- Instale as bibliotecas necessárias com ``npm i`` nas duas APIS
- Execute com o comando: ``npm run dev`` nas duas APIS

## Verbos e status utilizados:

- Verbos: PUT, PATCH, HEAD, DELETE, GET, POST
- Status: 200, 201, 400, 401, 403, 404, 409 e 500

## Exceeds executados

- CRUD para unidade de medidas ✅
- Pesquisa de receitas por ingredientes ✅

## Materiais consultados 📚

[Segurança com Nodejs, Express, JWT, Javascript, Perfis de usuário e MongoDB](https://www.youtube.com/watch?v=f2EqECiTBL8)

[Fetch API em Javascript](https://www.freecodecamp.org/portuguese/news/tutorial-de-fetch-api-em-javascript-exemplos-de-post-e-cabecalho/)

[Fetch API](https://www.alura.com.br/artigos/revolucao-node-js-adeus-axios-fetch-api-versao-17-5-0)

[Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)

[Autenticação com NodeJS](https://www.youtube.com/watch?v=qEBoZ8lJR3k)

[Status HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)

[Documentação Mongoose](https://mongoosejs.com/docs/documents.html)

[Documentação Spoonacular API](https://spoonacular.com/food-api/docs)

[HEAD - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
