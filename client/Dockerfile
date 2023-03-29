FROM node
WORKDIR /app/pagodevs-clients
COPY package*.json ./
EXPOSE 3001
RUN npm install
COPY . .
ENTRYPOINT npm run dev