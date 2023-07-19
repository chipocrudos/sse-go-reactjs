package config

import (
	"log"
	"strings"

	"github.com/kelseyhightower/envconfig"
)

var Config = new(Configuration)

type MapperEnviron map[string]string

func (me *MapperEnviron) Decode(value string) error {

	confMap := make(MapperEnviron)
	pairs := strings.Split(value, ",")

	for _, d := range pairs {
		confMap[d] = d
	}

	*me = MapperEnviron(confMap)
	return nil
}

type Configuration struct {
	APPIDS MapperEnviron `required:"true" envconfig:"APPIDS"`
	CORS   MapperEnviron `required:"true" envconfig:"CORS"`
}

func (c *Configuration) LoadConfig() {

	err := envconfig.Process("", c)

	if err != nil {
		log.Fatal(err.Error())
	}

}

func init() {
	Config.LoadConfig()
	log.Println("Apply app config")

}
