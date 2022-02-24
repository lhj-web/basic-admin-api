#!/bin/bash

WEB_PATH=$(dirname $0)
cd $WEB_PATH
cd ..

echo "[deploy] start proxy"
proxy
echo "[deploy] start deployment..."
echo "[deploy] fetching..."
echo "[deploy] path:" $(pwd)
echo "[deploy] pulling source code..."
git pull
git checkout main

echo "[deploy] stop service..."
pm2 stop edu-cms-api

echo "[deploy] pnpm install..."
pnpm i

echo "[deploy] build..."
pnpm prebuild

pnpm build

echo "[deploy] restarting..."
pm2 restart edu-cms-api

echo "[deploy] close proxy"
unproxy

echo "[deploy] finished."