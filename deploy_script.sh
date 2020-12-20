#!/bin/bash

git pull
cd ./app
yarn install && yarn build
cd ..
cd ./bot
yarn install
cd ~/
pm2 start ecosystem.config.js --env production