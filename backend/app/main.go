package main

import (
	"backend/api"
	"backend/internal/pkg/config"
	"backend/internal/pkg/transport"
	"os"
	"os/signal"
	"time"
)

const (
	CONFIG_PATH = "./config.yaml"
)

func main() {
	if err := config.Init(CONFIG_PATH); err != nil {
		panic(err.Error())
	}

	// transports will initialize all servers (http, grpc, etc)
	transports := []transport.Transport{}
	httpServer := transport.NewHTTPServer()
	engine := httpServer.Engine()
	router := engine.Group("pixel8labs/api/v1/github")

	api.Healthcheck(router)

	transports = append(transports, httpServer)

	// graceful shutdown to finish all processed requests before exitting
	stopFn := transport.TransportController(transports)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	sig := <-quit
	httpServer.Engine().Logger.Info("exit signal: ", sig.String())
	stopFn(time.Duration(10) * time.Second)
}
