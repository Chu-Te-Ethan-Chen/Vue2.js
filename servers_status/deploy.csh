#!/bin/csh

# build
npm run build

cd dist

git init
git add -A
git commit -m "deploy"
git push -f git@github.com:Jordon-Chen/Vue.js.git master:gh-pages

cd -
