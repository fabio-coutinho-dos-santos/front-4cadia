# Front end - v1.0
- Desenvolvido utilizando:
-  Angular v9.0.1
- Node v10.14.0
- npm v6.4.2
- URL: https://coutmastersolution.ml/
  ## Principais bibliotecas de desenvolvimento:
   - Bootstrapp v5.1.3
   - Angular Material v8.2.3
   ##Descrição
    - Single Page Application que contém:
		- Login
		- Register
		- Dashboard
 		### Login
		- Página inicial da aplicação que realiza o login no sistema de um usuário já cadastrado e caso não seja cadastrado, ele é redirecionado para a página de cadastro.
		- O login deve ser efetuado via email e senha, de forma que essas informações são enviadas para validação via POST HTTP para a url da API REST do backend.
		- A senha deve conter pelo menos uma letra maipuscula e um número
		- Caso as informações esteja incorretas um alert ocorre na tela para informa o usuário o motivo do erro.
		Caso o usuário não seja registrado, basta clicar no link "[Don't have an account, sign up!](https://coutmastersolution.ml/register "Don't have an account, sign up!")" para ser redirecionado para a página de registro
		- Caso o usuário efetue o login com as credênciais corretas ele é redirecionado para a dashboard
		- Ao efetuar o login são gravados o _id do usuário e o seu token jwt como variáveis de seção
		- A tela é completamente responsiva adequando a vializaçãodos componentes para dispositivos móveis
		
 		### Register
		- Pagina onde o usuário efetua seu registro no sistema, enviando Nome, Email, Senha, Confirmação e Confirmação da Senha para a API REST do backend.
		- Passando por todas as validações dos campos, o usuário é registrado com sucesso e seu login é efetuado automaticamente no sistema.
		- O usuário também pode retornar para a tela de login clicando no link "[Have an account, sign in!](https://coutmastersolution.ml/login "Have an account, sign in!")
		- Caso haja problemas com a senha, ou o email já esteja cadastrado o usuário é informado por meio de um alert
		- A tela é completamente responsiva adequando a vializaçãodos componentes para dispositivos móveis
		
		 ### Dashboard
		- Na página dashboard há um menu a esquerda, responsivo, que mostra o saldo atual do usúario e também seu nome
		- No canto superior direito, dentro da tollbar há um botão que permite que o usuário saia do sisitema
		- Na parte centra da tela é possível que o usuário visualize o extrato de transações, vendo as operações de crédito e débito agrupados por mês/ano. Além disso também é calculado o saldo mensal para o usuário.
		- Para trocar de mês ao visualizar o estrato, basta clicar nas tabs que localizadas no canto superior da tela, abaixo da toolbar
		- Para realização deste teste, o intervalo possível de ver o extrado é de janeiro de 2021 a dezembro de 2022.
		- Como estratégia de consumo dos dados da api, quando o usuário clica nas tabs para trocar de mês é realizado um requisição para a API REST para buscar as operações apenas daquele mês/ano selecionado pelo usuário.
		 Esta tela é totalmente responsiva e suprime o menu lateral para se adequar aos dispositvivos móveis.
		
## Deploy
 - O processo de deploy se inicia realizando o build de produção, por meio no comando "ng build --prod".
 - Este comando gera uma pasta dist contendo os aquivo minificados do projeto.
 - Em seguida, esta pasta é enviada para um droplet da digital ocean que que possuo e é cadastrada no domínio https://coutmastersolution.ml
 - Este droplet contém um ubuntu server v20.04 com um servido NGINX instalado contendo um certificado ssl válido.
 - Para agilizar a realização do teste foi escolhida esta forma de deploy pois este ambiente já existia e era mantido por min, assim, foi utilizado para disponibilizar a aplicação de forma segura economizando tempo.
 - Credenciais de usuário que podem ser utilizadas para realizar login
   - email: rc@gmail.com
   - password: Rcarlos20

## Importante
 - Toda a documentação do projeto da API REST que complementa o teste está no repósitório do projeto da API em https://github.com/fabio-coutinho-dos-santos/api-4cadia
 - Para executar localmente a aplicação:
  - Clonar o repositório
  - Executar npm install
  - Executar ng serve
  - Acessar localhost:4200

 
