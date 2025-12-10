FROM node:alpine3.10 

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node","dist/apps/roles/main" ]