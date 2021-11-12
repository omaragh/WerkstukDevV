FROM node:latest

WORKDIR /usr/api

COPY package*json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3000

CMD [ "npm", "start" ]

