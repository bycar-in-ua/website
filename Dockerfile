ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

ARG PORT=4000
ARG NODE_ENV="staging"

WORKDIR /app

COPY ./package* .
COPY ./.npmrc .

RUN npm install

COPY --link . .

RUN npm run build

ENV NODE_ENV=NODE_ENV

ENV PORT=$PORT

EXPOSE $PORT

CMD [ "node", ".output/server/index.mjs" ]
