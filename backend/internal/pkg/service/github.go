package service

import (
	"backend/internal/pkg/domain"
	"backend/internal/pkg/utils"
	"context"
	"encoding/json"
	"net/http"
)

func (svc *service) GetProfile(ctx context.Context, username, accessToken string) (domain.Profile, error) {
	var profile domain.Profile

	req, err := http.NewRequest("GET", "https://api.github.com/users/"+username, nil)
	if err != nil {
		return profile, err
	}

	// add authorization header
	req.Header.Add("Authorization", "Bearer "+accessToken)
	req.Header.Set("User-Agent", "golang-backend")
	req.Header.Add("X-GitHub-Api-Version", "2022-11-28")

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return profile, err
	}

	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		return profile, err
	}

	return profile, nil
}

func (svc *service) GetRepos(ctx context.Context, username, accessToken string) ([]domain.Repo, error) {
	var repos []domain.Repo

	req, err := http.NewRequest("GET", "https://api.github.com/users/"+username+"/repos", nil)
	if err != nil {
		return repos, err
	}

	// add authorization header
	req.Header.Add("Authorization", "Bearer "+accessToken)
	req.Header.Set("User-Agent", "golang-backend")
	req.Header.Add("X-GitHub-Api-Version", "2022-11-28")

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		return repos, err
	}

	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(&repos); err != nil {
		return repos, err
	}

	// update last updated to human-readable format
	for index := range repos {
		repos[index].UpdatedAt = utils.GetStatus(repos[index].UpdatedAt)
	}

	// give only first 6 repos
	return repos[:6], nil
}
