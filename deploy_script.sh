#!/bin/bash
# Run docker
cd /app/
git pull && yarn install && yarn build
cd ..
cd /bot/
git pull && yarn install
cd ~/
pm2 start ecosystem.config.js --env production