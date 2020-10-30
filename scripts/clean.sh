#!/bin/bash -e

export NODE_ENV="${NODE_ENV:-production}"

function clean-package() {
  PACKAGE="${1:?}"

  rm -rf "${PACKAGE:?}/lib"
  yarn tsc --build --clean "$PACKAGE/tsconfig.json"
}

function clean-packages() {
  for PACKAGE in ./packages/*; do
    clean-package "$PACKAGE"
  done
}

if [[ -z "$1" ]]; then
  clean-packages
else
  clean-package "./packages/$1"
fi
