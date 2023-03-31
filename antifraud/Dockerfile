FROM node
WORKDIR /app/pagodevs-antifraud
COPY package*.json ./
EXPOSE 3003
RUN npm install
COPY . .
ENTRYPOINT npm start