FROM node:20-slim

RUN apt update -y && apt install -y procps

USER node

WORKDIR /home/node/app

# COPY --chown=node:node package*.json ./

# RUN npm install

CMD [ "/home/node/app/.docker/start.sh" ]