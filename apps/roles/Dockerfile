FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


CMD ["sh", "-c", "npm run typeorm:run-migrations && npm run start:dev roles"] 