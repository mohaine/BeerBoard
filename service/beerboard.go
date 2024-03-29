package service

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/mohaine/beerboard/id"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}


var CFG_FILE = "cfg.json"
var CFG_FILE_DIST = "cfg-dist.json"
var CFG_FILE_BAK = fmt.Sprintf("%v.bak", CFG_FILE)

func sendError(w http.ResponseWriter, msg string, code int) {
	http.Error(w, msg, code)
}

func updateCfg(cfg *Configuration, configurationParam string) (e error) {
	if len(configurationParam) > 0 {
		// fmt.Printf("Update Cfg\n")
		var newCfg Configuration
		dec := json.NewDecoder(strings.NewReader(configurationParam))
		e = dec.Decode(&newCfg)
		if e == nil {
			cfg.Beers = newCfg.Beers
			cfg.Taps = newCfg.Taps
			ChangedConfiguration(cfg)
		}

	}
	return
}

func updateCfgBeer(cfg *Configuration, beerParam string) (e error) {
	if len(beerParam) > 0 {
		// fmt.Printf("Update Beer\n")

		var newBeer Beer
		if len(newBeer.Id) == 0 {
			newBeer.Id = id.RandomId()
		}

		dec := json.NewDecoder(strings.NewReader(beerParam))
		e = dec.Decode(&newBeer)
		found := false
		if e == nil {
			beers := cfg.Beers
			for i := 0; i < len(beers); i++ {
				beer := beers[i]
				if beer.Id == newBeer.Id {
					beers[i] = newBeer
					found = true
				}
			}
			if !found {
				cfg.Beers = append(beers, newBeer)
			}
			ChangedConfiguration(cfg)
		}
	}
	return
}
func updateCfgTap(cfg *Configuration, tapParm string) (e error) {
	if len(tapParm) > 0 {
		// fmt.Printf("Update Tap\n")

		var newTap Tap
		dec := json.NewDecoder(strings.NewReader(tapParm))
		e = dec.Decode(&newTap)
		found := false
		if e == nil {
			taps := cfg.Taps
			for i := 0; i < len(taps); i++ {
				tap := taps[i]
				if tap.Postition == newTap.Postition {
					taps[i] = newTap
					found = true
				}
			}
			if !found {
				cfg.Taps = append(taps, newTap)
			}
			ChangedConfiguration(cfg)
		}
	}
	return
}

func StartServer(mock bool, port uint) {
	flag.Parse()

	cfg, err := LoadCfg(CFG_FILE)
	if err != nil {
		cfg, err = LoadCfg(CFG_FILE_BAK)
		if err != nil {
			cfg, err = LoadCfg(CFG_FILE_DIST)
			if err != nil {
				cfg = *new(Configuration)
				cfg.Beers = make([]Beer, 0)
				cfg.Taps = make([]Tap, 0)
			}
		}
	}

	http.HandleFunc("/cmd/cfg", func(w http.ResponseWriter, r *http.Request) {
		err := updateCfg(&cfg, r.FormValue("configuration"))
		if err != nil {
			sendError(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = updateCfgBeer(&cfg, r.FormValue("beer"))
		if err != nil {
			sendError(w, err.Error(), http.StatusBadRequest)
			return
		}
		err = updateCfgTap(&cfg, r.FormValue("tap"))
		if err != nil {
			sendError(w, err.Error(), http.StatusBadRequest)
			return
		}

		j, err := json.Marshal(cfg)
		if err != nil {
			sendError(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		if mock {
			enableCors(&w)
		}
		var out bytes.Buffer
		json.Indent(&out, j, "", "  ")

		w.Write(out.Bytes())
	})

	http.HandleFunc("/ui/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "web/ui/index.html")
	})
	http.Handle("/", http.FileServer(http.Dir("web/")))

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))

}
