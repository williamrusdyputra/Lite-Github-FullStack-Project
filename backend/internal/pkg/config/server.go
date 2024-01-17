package config

type serverConfig struct {
	BaseURL      string `yaml:"base_url"`
	Port         string `yaml:"port"`
	ReadTimeout  uint   `yaml:"read_timeout"`
	WriteTimeout uint   `yaml:"write_timeout"`
}

type ServerConfig interface {
	GetBaseURL() string
	GetPort() string
	GetReadTimeout() uint
	GetWriteTimeout() uint
}

func Server() ServerConfig {
	return &config.Server
}

func (server *serverConfig) GetBaseURL() string {
	return server.BaseURL
}

func (server *serverConfig) GetPort() string {
	return server.Port
}

func (server *serverConfig) GetReadTimeout() uint {
	return server.ReadTimeout
}

func (server *serverConfig) GetWriteTimeout() uint {
	return server.WriteTimeout
}
