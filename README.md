## 🚀 Instrucciones para levantar el entorno

### 1. Crear archivo .env en la raiz

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

### 2. Instalar las dependencias

npm install

# o 

yarn install

### 3. Levantar los servicios de base de datos, zookeeper y kafka

docker-compose up -d

### 4. Correr la aplicacion 

npm run local

# o

yarn local

### 5. Probar los servicios usando los siguientes curl

curl --location 'localhost:3000/transaction' \
--header 'Content-Type: application/json' \
--data '{
  "accountExternalIdDebit": "5429d629-c239-45fa-8235-1a386258c536",
  "accountExternalIdCredit": "d6cd54da-8ce3-4f79-abda-bd5be9b19e68",
  "tranferTypeId": 1,
  "value": 120
}'

curl --location 'localhost:3000/transaction/5429d629-c239-45fa-8235-1a386258c536'