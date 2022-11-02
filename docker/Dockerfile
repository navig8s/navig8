FROM node:16.14.2-slim

COPY . /navig8
WORKDIR /navig8

RUN chmod 777 ./docker/.bin/prepare
RUN apt-get update && apt-get install -y --no-install-recommends make nginx &&\
    PNPM_HOME="$(npm bin -g)" npx pnpm i -g pnpm @vercel/ncc &&\
    make install &&\
    ./docker/.bin/prepare &&\
    apt-get remove -y make &&\
    apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 9000
EXPOSE 80

CMD ["/bin/bash", "./docker/.bin/start"]
