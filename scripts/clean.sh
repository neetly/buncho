#!/bin/bash
set -eo pipefail

yarn run --top-level tsc --build --clean .

rm -rf ./lib
