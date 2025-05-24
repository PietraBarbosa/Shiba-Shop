echo "📦 Criando filas no LocalStack..."

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name sqs-ingestion-queue
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name sqs-monitor-queue

echo "✅ Filas criadas com sucesso."