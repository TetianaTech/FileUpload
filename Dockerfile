FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run generate
RUN npm run migrate
RUN npm run build

CMD ["npm", "run", "start:prod"]

