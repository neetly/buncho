#!/bin/bash
set -eo pipefail

yarn run --top-level tsc --build .
yarn run --top-level babel \
  --root-mode upward \
  --extensions .js,.mjs,.cjs,.ts,.tsx,.mts,.cts \
  --source-maps true \
  --copy-files \
  ./src --out-dir ./lib
