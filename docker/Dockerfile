FROM node:16.14.2-alpine

COPY . /navig8
WORKDIR /navig8

RUN chmod 777 ./docker/.bin/prepare
RUN apk add --update --no-cache nginx gomplate bash &&\
    PNPM_HOME="$(npm bin -g)" npx pnpm i -g pnpm @vercel/ncc &&\
    ./docker/.bin/prepare

EXPOSE 80

CMD ["/bin/bash", "./docker/.bin/start"]
