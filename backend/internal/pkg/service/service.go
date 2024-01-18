package service

import (
	"backend/internal/pkg/domain"
	"context"
	"database/sql"
)

type service struct{}

type ServiceParam struct {
	PostgresDB *sql.DB
}

type Service interface {
	GetProfile(ctx context.Context, username, accessToken string) (domain.Profile, error)
}

func NewGithubService(param ServiceParam) Service {
	return &service{}
}
