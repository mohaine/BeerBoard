#!/bin/bash

BUILD_DIR=../pi-gen/stage2.0-headless/05-beerboard/files/
#BUILD_DIR=package


make clean rpi
rm -rf $BUILD_DIR
mkdir -p ${BUILD_DIR}
cp -r beerboard beerboard.service cfg.json.dist ${BUILD_DIR}/
cp -r build ${BUILD_DIR}/web



