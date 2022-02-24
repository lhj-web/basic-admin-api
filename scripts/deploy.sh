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
git fetch --all && git reset --hard origin/main && git pull
git checkout main

echo "[deploy] stop service..."
pm2 stop edu-cms-api

echo "[deploy] pnpm install..."
pnpm install --frozen-lockfile --production

echo "[deploy] fetching release code..."
rm -rf dist
mkdir dist
cd dist
git clone -b release git@github.com:lhj-web/edu-cms-api.git .
rm -rf .git
cd ..

echo "[deploy] restarting..."
pm2 restart edu-cms-api

echo "[deploy] close proxy"
unproxy

echo "[deploy] finished."