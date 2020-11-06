#!/bin/bash -e

export NODE_ENV="${NODE_ENV:-production}"

ROOT="./packages/${1:?}"

yarn babel \
  --extensions .ts,.tsx \
  --copy-files \
  "$ROOT/src" --out-dir "$ROOT/lib"
yarn tsc --build "$ROOT"
