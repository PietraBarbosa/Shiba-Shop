#!/bin/bash
set -e

echo "📦 Criando filas no LocalStack (via awslocal)..."

awslocal sqs create-queue --queue-name sqs-ingestion-queue
awslocal sqs create-queue --queue-name sqs-monitor-queue

echo "✅ Filas criadas com sucesso."


echo "🧹 Removendo tabela antiga (se existir)..."
awslocal dynamodb delete-table --table-name OrderTable 2>/dev/null || true

echo "⏳ Aguardando o DynamoDB ficar disponível..."
until awslocal dynamodb list-tables >/dev/null 2>&1; do
  echo "⏳ DynamoDB ainda iniciando..."
  sleep 2
done
