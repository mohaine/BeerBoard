
pwd = $(shell pwd)

local:
	go build beerboard.go
	yarn install
	yarn run build

rpi:
	env GOOS=linux GOARCH=arm GOARM=5 go build beerboard.go
	yarn install
	yarn run build-prod


clean:
	rm -rf build