# Use uma imagem base do Node.js
FROM node:16-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json (se houver)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código para o diretório de trabalho
COPY . .

# Construa o projeto para produção
RUN npm run build

# Instale um servidor web simples para servir a aplicação estática
RUN npm install -g serve

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["serve", "-s", "build"]
