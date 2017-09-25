
pwd = $(shell pwd)

rpi:
	env GOPATH=$(pwd)/go GOOS=linux GOARCH=arm GOARM=5 go build github.com/mohaine/beerboard
	npm install
	npm run build-prod
