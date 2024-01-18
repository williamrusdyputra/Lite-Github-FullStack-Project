package api

import (
	"backend/api/dto"
	"backend/internal/pkg/service"
	"context"
	"net/http"

	"github.com/labstack/echo/v4"
)

type githubIntegrator struct {
	svc service.Service
}

func Github(router *echo.Group) {
	githubService := service.NewGithubService(service.ServiceParam{})

	integrator := githubIntegrator{
		svc: githubService,
	}

	router.GET("/profile", integrator.GetProfile)
}

func (integrator *githubIntegrator) GetProfile(c echo.Context) error {
	var req dto.ProfileRequest

	err := c.Bind(&req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.Response{Message: err.Error()})
	}

	profile, err := integrator.svc.GetProfile(context.Background(), req.Username, req.AccessToken)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.Response{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.Response{
		Message: "success",
		Data:    profile,
	})
}
