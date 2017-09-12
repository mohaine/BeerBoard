package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"
)

var CFG_FILE = "cfg.json"

func sendError(w http.ResponseWriter, msg string, code int) {
	http.Error(w, msg, code)
}

func main() {
	port := flag.Uint("port", 80, "Web Server Port")
	flag.Parse()

	cfg, err := LoadCfg(CFG_FILE)
	if err != nil {
		log.Printf("Failed to load cfg File: %v\n", err)
		cfg, err = LoadCfg("cfg.json.dist")
		if err != nil {
			panic(err)
		}
	}

	http.HandleFunc("/cmd/cfg", func(w http.ResponseWriter, r *http.Request) {
		configurationParam := r.FormValue("configuration")
		if len(configurationParam) > 0 {
			var newCfg Configuration
			dec := json.NewDecoder(strings.NewReader(configurationParam))
			err := dec.Decode(&newCfg)
			if err != nil {
				sendError(w, "Failed to parse Configuration", http.StatusBadRequest)
				return
			} else {
				cfg.Beers = newCfg.Beers
				cfg.Taps = newCfg.Taps
			}
		}

		j, err := json.Marshal(cfg)
		if err != nil {
			log.Println("error:", err)
		}
		w.Header().Set("Content-Type", "application/json")
		var out bytes.Buffer
		json.Indent(&out, j, "", "  ")

		w.Write(out.Bytes())
	})

	http.HandleFunc("/ui/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/index.html")
	})
	http.Handle("/", http.FileServer(http.Dir("web/")))

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", *port), nil))

}
