FROM node:20-alpine

WORKDIR /src/app 

COPY package*.json .
COPY . .

RUN npm ci

EXPOSE 8081

CMD ["npm", "run", "dev"]