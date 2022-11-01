FROM node:16-slim

COPY . /navig8
WORKDIR /navig8

RUN apt-get update && apt-get install -y make nginx && npm i -g pnpm && \
    PNPM_HOME="$(npm bin -g)" pnpm i -g forever && \
    make install && make build && \
    pnpm i -s html-prettify ejs ramda.pipe && \
    rm -rf frontend/node_modules && \
    apt-get remove -y make

EXPOSE 9000
EXPOSE 80

ENTRYPOINT ["/bin/bash", "./docker/.bin/start"]
