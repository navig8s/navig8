FROM node:16.14.2-alpine

COPY . /navig8
WORKDIR /navig8

RUN chmod 777 ./docker/.bin/prepare
RUN apk add --update --no-cache nginx gomplate bash &&\
    ./docker/.bin/prepare

EXPOSE 80

CMD ["/bin/bash", "./docker/.bin/start"]
