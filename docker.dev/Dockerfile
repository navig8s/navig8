FROM node:16-slim

COPY . /navig8
WORKDIR /navig8

VOLUME [ "/navig8" ]

RUN apt-get update &&  \
    apt-get install -y make &&  \
    npm i -g pnpm

EXPOSE 9000
EXPOSE 5173

ENTRYPOINT ["make", "run_from_inside_docker"]
