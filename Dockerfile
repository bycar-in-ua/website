# For staging environment only

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

ARG PORT=4000
ARG NODE_ENV="staging"
ARG GITHUB_TOKEN

WORKDIR /app

ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY ./package* .
COPY ./.npmrc .

RUN npm install

# Note: .output directory will be mounted as a volume
# No need to copy source files since we're not building inside container

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

EXPOSE $PORT

CMD [ "node", ".output/server/index.mjs" ]
