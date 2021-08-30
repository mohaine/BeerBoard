package main

import (
	"flag"
	"github.com/mohaine/beerboard/service"
	"log"
)

func main() {
	port := flag.Uint("port", 80, "Web Server Port")
	flag.Parse()

	log.Printf("Listening on port: %v\n", *port)

	service.StartServer(*port)
}
