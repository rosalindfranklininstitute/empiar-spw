#!/bin/bash
echo starting

echo installing extra modules
npm install -g typescript
npm install -g ts-node

echo installing app
npm install 

echo starting up website
npm start