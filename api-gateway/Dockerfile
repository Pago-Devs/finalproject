FROM node
WORKDIR /app/pagodevs-api-gateway
COPY package*.json ./
EXPOSE 3000
RUN npm install
COPY . .
ENTRYPOINT npm start