FROM node:16.14.2-alpine as prepare

RUN apk add --update --no-cache bash

COPY . /navig8/
WORKDIR /navig8

RUN ./docker/.bin/prepare

# -----------

FROM node:16.14.2-alpine

RUN apk add --update --no-cache \
      nginx \
      gomplate \
      bash

COPY --from=prepare /navig8-dist /navig8
WORKDIR /navig8

EXPOSE 80

CMD ["/bin/bash", "./docker/.bin/start"]
