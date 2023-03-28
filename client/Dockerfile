FROM node
WORKDIR /pagodevs-clients
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3001
ENTRYPOINT npm start
