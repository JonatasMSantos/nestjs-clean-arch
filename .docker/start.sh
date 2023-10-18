#!/bin/bash

# don't forget to run  chmod +x .docker/start.sh 

npm install

#rodar outros comandos, por exemplo (criar um novo .env):
if [ ! -f ".env" ]; then
  cp .env.example .env
fi

tail -f /dev/null