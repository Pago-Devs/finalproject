FROM node
WORKDIR /app/pagodevs-antifraud
COPY package*.json ./
EXPOSE 3000
RUN npm install
COPY . .
ENTRYPOINT npm run dev