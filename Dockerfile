FROM node:18-alpine

WORKDIR /usr/app

ARG SSH_PRIVATE_KEY

COPY package.json .
COPY .npmrc .

RUN apk add --no-cache --update alpine-sdk python3 py3-pip openssh

RUN mkdir /root/.ssh/
RUN echo $SSH_PRIVATE_KEY | base64 -d > /root/.ssh/id_ed25519
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN chmod 600 /root/.ssh/id_ed25519

RUN npm i -g @nestjs/cli && \
  npm i -g pnpm && \
  pnpm install && \
  pnpm rebuild

COPY . .

RUN pnpm build

EXPOSE 5002

CMD ["pnpm", "start:prod"]
