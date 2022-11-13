# Desafio Back-end

Deve-se criar uma API de controle de estacionamento:
> * Deve registrar entrada, saída e pagamento por placa;
> * Não deve liberar saída sem pagamento;
> * Deve fornecer um histórico por placa.

### Comando a ser executado para subir a aplicação Docker
Logo apos efetuar o clone deste projeto execute os seguintes comandos, na sequencia:

Para instalar todas as dependencias:
```
npm i
```

Caso ocorra alguma falha na instalação das dependencias, seria interessante, você apagar a pasta node_modules, e instalar as dependencias manualmente, com os seguintes comandos:

```
npm i express mongoose dotenv env-cmd
npm i nodemon jest supertest -D
```

Para criar os containers necesarios para o desafio:
```
docker-compose up
```
_**Obs**: Ao executar este comando o **build** será feito em conjunto._

## Ações disponiveis na API

**1. Entrada**

> **POST** localhost:3000/parking/
>
> { "plate": "AAA-9999" }
>
> **Resposta:**
> {
>   "reservation": "637142",
>   "plate": "AAA-9999",
>   "entered_at": "2022-11-13T19:17:37.895Z"
> }

_**Obs**: Devia retornar um número de "reserva" e validar a máscara AAA-9999._

**2. Pagamento**

> **PUT** localhost:3000/parking/:plate/pay

**3. Saída**

> **PUT** localhost:3000/parking/:plate/out

**4. Histórico**

> **GET** localhost:3000/parking/:plate
>
> **Resposta:**
> {
>     "time": "0h 0m 4s",
>     "paid": false,
>     "left": false,
>     "reservation": "637142",
>     "plate": "AAA-9999"
> }

_**Obs**: As portas usada para executar este desafio estão presentes no arquivo **.env**._

### Executar testes
Caso queira executar o script de teste, basta executar o comando:

```
yarn test
```

_**Obs**: Os testes podem vir a dar timeout. Basta persistir._

## Cronograma de execução

| Data  | Atividade |
| ------------- |-------------|
| 11/11/2022 (anoite) | Leitura do desafio e configuração inicial do Docker. |
| 12/11/2022 (todo o dia) | Elaboração da API em NodeJS utilizando o mongoDB. |
| 13/11/2022 (pela manhã) | Ajustes na configuração do docker-compose e do Dockfile. |
| 13/11/2022 (a tarde) | Criação do testes automatizados. |
| 13/11/2022 (anoite) | Envio do teste para avaliação. |


Criado por **_Gustavo Felipe_**

