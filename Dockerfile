# Dockerfile
FROM node:latest

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Instalar Prisma CLI
RUN npm install prisma --save-dev
RUN npm install @prisma/client

# Generar Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]