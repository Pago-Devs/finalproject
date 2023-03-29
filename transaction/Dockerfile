FROM node
WORKDIR /app/pagodevs-transaction
COPY package*.json ./
EXPOSE 3002
RUN npm install
COPY . .
ENTRYPOINT npm run dev
