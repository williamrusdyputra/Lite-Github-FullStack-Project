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
	router.GET("/repos", integrator.GetRepos)
}

func (integrator *githubIntegrator) GetProfile(c echo.Context) error {
	username := c.QueryParam("username")
	accessToken := c.QueryParam("access_token")

	profile, err := integrator.svc.GetProfile(context.Background(), username, accessToken)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.Response{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.Response{
		Message: "success",
		Data:    profile,
	})
}

func (integrator *githubIntegrator) GetRepos(c echo.Context) error {
	username := c.QueryParam("username")
	accessToken := c.QueryParam("access_token")

	repos, err := integrator.svc.GetRepos(context.Background(), username, accessToken)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.Response{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.Response{
		Message: "success",
		Data:    repos,
	})
}
