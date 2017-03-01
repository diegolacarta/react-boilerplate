FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g yarn
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app

EXPOSE 8080