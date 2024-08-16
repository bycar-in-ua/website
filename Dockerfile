ARG NODE_VERSION=20

FROM node:${NODE_VERSION}

ARG PORT=4000

WORKDIR /app

COPY --link . .
RUN npm install

RUN npm run build

ENV NODE_ENV=production

ENV PORT=$PORT

EXPOSE $PORT

CMD [ "node", ".output/server/index.mjs" ]
