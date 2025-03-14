# Shiba-Shop

O Shiba Shop é uma loja virtual (e-commerce) focada em produtos para cães, inspirada especialmente na raça Shiba Inu. O projeto abrange as seguintes funcionalidades:
  * Gestão de Usuários: cadastro, atualização e remoção de informações de clientes do Shiba Shop.
  * Gestão de Produtos: cadastro, atualização e remoção de produtos disponíveis na loja (como ração, brinquedos, acessórios etc.).
  * Realização de Pedidos: fluxo de compra, em que cada pedido é associado ao cliente que o realizou. 

Para concretizar o conceito de Polyglot Persistence, escolhemos três bancos de dados distintos, cada um com um propósito bem definido: 

**PostgreSQL (RDB / Relacional)**

* **O que será armazenado?**
As informações dos usuários (clientes) serão armazenadas no banco relacional.

* **Por que PostgreSQL?**
Forte aderência a esquemas e consistência de dados, ideal para dados estruturados (p. ex., tabela users com colunas como nome, e-mail, endereço etc.).
Recursos avançados e ampla adoção na comunidade, além de alta confiabilidade.


**MongoDB (NoSQL - Document Storage) - DB1**

* **O que será armazenado?**
O histórico de ordens (pedidos) dos usuários.

* **Por que MongoDB?**
Armazenamento em formato de documentos (JSON/BSON), permitindo agilidade na evolução do esquema dos pedidos (campos que podem variar de acordo com promoções ou customizações futuras).
Escalabilidade horizontal facilitada e leitura rápida de documentos agregados.

**MongoDB (NoSQL - Document Storage) - DB2**

* **O que será armazenado?**
Todos os produtos disponíveis para compra no Shiba Shop.
* **Por que reutilizar MongoDB neste ponto?**
Embora fosse possível escolher outro NoSQL (p. ex. Cassandra, ou um Wide-Column Store) para diversificar ainda mais, a escolha de MongoDB para produtos também faz sentido caso a aplicação já tenha uma estrutura de documentos de produtos que pode variar (descrições, especificações técnicas, atributos adicionais).
Facilita manter num repositório NoSQL todos os dados que podem sofrer alterações de schema de maneira mais dinâmica, como variações de produtos, coleções sazonais etc.

### Arquitetura Geral
A arquitetura proposta segue o modelo:

![image](https://github.com/user-attachments/assets/b6e10013-7814-4f7e-9e65-59b810bf615d)

                
**S1: Serviço que gera mensagens. Esse serviço envia:**

Mensagens de CRUD de clientes (que serão tratadas pelo PostgreSQL).
Mensagens de CRUD de produtos (armazenadas/consultadas em MongoDB - DB2).
Mensagens de pedidos de compra (armazenadas/consultadas em MongoDB - DB1).

**Mensageria: Será utilizada a AWS SQS como sistema de mensageria (padrão pub-sub).**

Producer (S1) envia as mensagens para as filas apropriadas.
Consumer (S2) consome as mensagens e dispara a lógica correspondente para cada tipo de mensagem.

**S2: Serviço (ou conjunto de serviços) responsável por:**

Ler as mensagens das filas do SQS.
Interpretar o tipo de mensagem (por exemplo, via um strategy ou um command bus no NestJS).
Direcionar para o handler responsável pelo contexto de dados (usuários, produtos ou pedidos).
Executar operações de escrita/leitura nos bancos apropriados (PostgreSQL, MongoDB - DB1 e MongoDB - DB2).
Retornar respostas ou eventos de confirmação para a fila de mensageria (SQS), de forma que o S1 possa ser notificado sobre o resultado.

**S3: Serviço que deve:**

Armazenar todas as mensagens enviadas por S1 e retornadas de S2 (via SQS).
Fornecer meios de validação de que cada mensagem enviada obteve uma resposta apropriada.
