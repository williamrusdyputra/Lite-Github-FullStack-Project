package transport

import (
	"backend/internal/pkg/config"
	"context"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

type server struct {
	router       *echo.Echo
	address      string
	readTimeout  time.Duration
	writeTimeout time.Duration
}

func NewHTTPServer() *server {
	router := echo.New()
	router.Use(
		middleware.Logger(),
		middleware.Recover(),
	)
	router.Logger.SetLevel(log.DEBUG)

	serverConfig := config.Server()
	return &server{
		router:       router,
		address:      serverConfig.GetBaseURL() + ":" + serverConfig.GetPort(),
		readTimeout:  time.Duration(serverConfig.GetReadTimeout()) * time.Millisecond,
		writeTimeout: time.Duration(serverConfig.GetWriteTimeout()) * time.Millisecond,
	}
}

func (srv *server) Engine() *echo.Echo {
	return srv.router
}

func (srv *server) Start() {
	echoServer := &http.Server{
		Addr:         srv.address,
		ReadTimeout:  srv.readTimeout,
		WriteTimeout: srv.writeTimeout,
	}

	if err := srv.router.StartServer(echoServer); err != nil {
		srv.router.Logger.Info("shutting down the server")
		srv.router.Logger.Error(err.Error())
		os.Exit(1)
	}
}

func (srv *server) Stop(duration time.Duration) {
	ctx, cancel := context.WithTimeout(context.Background(), duration)
	defer cancel()

	if err := srv.router.Shutdown(ctx); err != nil {
		srv.router.Logger.Error(err.Error())
	}
}
