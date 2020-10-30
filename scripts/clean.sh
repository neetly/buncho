#!/bin/bash -e

export NODE_ENV="${NODE_ENV:-production}"

ROOT="./packages/${1:?}"

rm -rf "${ROOT:?}/lib"
yarn tsc --build --clean "$ROOT"
