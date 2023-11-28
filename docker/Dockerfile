FROM node:16-alpine

WORKDIR /app

COPY package*.json .
COPY ./tsconfig.json .
COPY ./src ./src/
RUN yarn add typescript
RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]