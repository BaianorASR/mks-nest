# Sobre o Desenvolvimento

- ### Esse foi meu primeiro projeto feito em Nestjs, Já fiz vários outros cruds mas somente no Golang e Express.

- ### Durante o desenvolvimento tentei implementar os conceitos do **SOLID** que já utilizo frequentemente, mas como erá minha primeira vez no Nest, tive pequenos problemas para desacoplar a aplicação em funcionalidades. Então em beneficio do tempo optei por não implementar.

- ### Também pensando no curto tempo que tinha optei por escolher o Sqlite para banco de dados pensado também em um deploy mas fácil, mas o MySQL e Postgres.

- ### Foi criado 3 relacionamentos para tabela de `movies`. Com `categories`, `actors` e `director`. Todas as 3 tabelas ficaram com a mesma estrutura, apenas o id e nome. Somente a tabela de `movies` ficou com mais colunas.

- ### Sobre o ORM, também foi meu primeiro contato com TypeORM, anteriormente só utilizava Prisma e Sequelize. Tive dificuldades para estar criando as migrations e seeds e optei por não faze-l, pois já tinha gastado muito tempo estudando o Nest, mas talvez quando veja isso possa já está implementado, será a primeira coisa que farei para refatorar.

- ### Não gostei da forma que fiz algumas validações dentro do service, queria está movendo para pasta middlewares ou criando um pipe, mas um ponto que irei refatorar.

- ### Como não conseguir desacoplar a aplicação em funcionalidades. Achei então que a parte de service e controller não ficou legível, ficou um pouco poluído

#
