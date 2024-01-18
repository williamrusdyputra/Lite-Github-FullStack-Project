package api

import (
	"backend/api/dto"
	"net/http"

	"github.com/labstack/echo/v4"
)

type hcIntegrator struct{}

func Healthcheck(router *echo.Group) {
	integrator := hcIntegrator{}

	router.GET("/healthcheck", integrator.healthcheck)
}

func (integrator *hcIntegrator) healthcheck(c echo.Context) error {
	return c.JSON(http.StatusOK, dto.Response{Message: "server is fine!"})
}
