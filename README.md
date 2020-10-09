## Projeto feito para o desafio Accenture

Foi utilizado MongoDB através do Atlas para deploy em produção e em dev.

## Inicialização

Para iniciar o projeto é necessario copiar o example.env e renomear para .env, preencher os dados corretamente para acesso ao banco. 

Após o .env configurado, baixe os pacotes com o comando: 

        npm i

Para iniciar o projeto utilize o comando:

        npm start

### Rotas

* POST - '/signup'
    
    Efetua o cadastro - recebe os dados atráves do corpo da requisição e persiste os dados no mongo. Gera um token com validade de 30 minutos.
    
         {
            "nome": "guilherme",
            "email": "guilherme@email7.com",
            "senha": "12345",
            "telefones": [
                {
                    "numero": "1234567890",
                    "ddd": "11"
                }
        ]
    }

* POST - '/signin'

    Efetua login, gera um novo token com validade de 30 minutos.

        {
            "email": "guilherme@email5.com",
            "senha": "12345"
        }

* GET - '/getUser/:id'

    Busca o usuario, retorna erro caso o token for diferente do registrado para o id informado.
    
    Caso o token e o id coincidam, retorna os dados do usuario.


## Observações

A aplicação foi hospedada no Heroku, podendo ser acesado através da Url:

    https://desafioaccenture.herokuapp.com/