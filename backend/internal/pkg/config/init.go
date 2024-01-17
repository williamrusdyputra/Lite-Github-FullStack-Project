package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v2"
)

type appConfig struct {
	Server serverConfig `yaml:"server"`
}

var config = new(appConfig)

func Init(path string) error {
	binary, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("error reading config file: %s", err.Error())
	}

	if err := yaml.Unmarshal(binary, config); err != nil {
		return fmt.Errorf("error decoding config file: %s", err.Error())
	}

	return nil
}
