# 🧪 Ambiente de Teste Local

Este projeto utiliza Redis, LocalStack (SQS + DynamoDB), MongoDb e Postgres.

## ✅ Requisitos

1. Docker instalado
2. AWS CLI instalado (ou `awslocal` para facilitar o uso com LocalStack)

## 🚀 Como iniciar

```bash
docker-compose up --build
🧼 Como parar o ambiente
bash
Copiar
Editar
docker-compose down
```

## 📝 Criar tabela OrderTable manualmente no DynamoDB Local (LocalStack)

Caso a tabela OrderTable não seja criada automaticamente ao subir o ambiente, você pode criá-la manualmente com o seguinte comando:

```bash
awslocal dynamodb create-table \
  --table-name OrderTable \
  --attribute-definitions '[{"AttributeName":"id","AttributeType":"S"}]' \
  --key-schema '[{"AttributeName":"id","KeyType":"HASH"}]' \
  --billing-mode PAYPERREQUEST \
  --region us-east-1
```

##✅ Esse comando usa o modo PAYPERREQUEST, ideal para testes e ambientes locais, pois não exige configuração de throughput.

⚠️ Importante: só os atributos definidos no KeySchema (ex: id) devem ser incluídos em AttributeDefinitions na criação da tabela.
Atributos como taxId, total, createdAt etc. não precisam estar definidos nessa etapa, e podem ser utilizados livremente nos itens depois.

💡 Certifique-se de que o LocalStack esteja rodando (docker-compose up) antes de executar esse comando.
