#!/bin/bash -e

export NODE_ENV="${NODE_ENV:-production}"

function build-package() {
  PACKAGE="${1:?}"

  yarn babel --extensions ".ts,.tsx" --copy-files "$PACKAGE/src" --out-dir "$PACKAGE/lib"
  yarn tsc --build "$PACKAGE/tsconfig.json"
}

function build-packages() {
  for PACKAGE in ./packages/*; do
    build-package "$PACKAGE"
  done
}

if [[ -z "$1" ]]; then
  build-packages
else
  build-package "./packages/$1"
fi
