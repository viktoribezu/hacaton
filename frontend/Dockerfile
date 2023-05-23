FROM node:18

RUN mkdir /app
ADD . /app
WORKDIR /app/frontend

RUN npm install
RUN npm run build:prod

CMD [ "npm", "start" ]