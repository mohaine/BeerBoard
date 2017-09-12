package main

import (
	"bytes"
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"os"

	"github.com/mohaine/id"
)

type Tap struct {
	Id        string `json:"id,omitempty"`
	Postition int32  `json:"position,omitempty"`
}

type Beer struct {
	Id     string `json:"id,omitempty"`
	Name   string `json:"name,omitempty"`
	IBU    string `json:"ibu,omitempty"`
	SRM    string `json:"srm,omitempty"`
	ABV    string `json:"abv,omitempty"`
	Brewer string `json:"brewer,omitempty"`
	Style  string `json:"style,omitempty"`
	Notes  string `json:"notes,omitempty"`
}

type Configuration struct {
	Taps  []Tap  `json:"taps,omitempty"`
	Beers []Beer `json:"beers,omitempty"`
}

func IdEverything(cfg *Configuration) {
	idMap := make(map[string]bool)

	beers := cfg.Beers
	for i := 0; i < len(beers); i++ {
		beer := &beers[i]
		if len(beer.Id) == 0 || idMap[beer.Id] {
			beer.Id = id.RandomId()
		}
		idMap[beer.Id] = true
	}
}

func WriteConfiguration(cfg *Configuration) {
	j, err := json.Marshal(cfg)
	if err != nil {
		log.Println("error:", err)
	}
	var out bytes.Buffer
	json.Indent(&out, j, "", "  ")
	err = ioutil.WriteFile(CFG_FILE, out.Bytes(), 0644)
	if err != nil {
		log.Println("Failed to write to ", CFG_FILE, " error ", err)
	}
}

func LoadCfg(path string) (Configuration, error) {
	var cfg Configuration
	var err error
	var f io.Reader
	log.Printf("Load Cfg File %v\n", path)
	f, err = os.Open(path)
	if err == nil {
		dec := json.NewDecoder(f)
		err = dec.Decode(&cfg)
	}
	if err == nil {
		IdEverything(&cfg)
	}
	return cfg, err
}
