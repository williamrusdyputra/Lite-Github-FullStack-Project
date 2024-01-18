package service

import (
	"backend/internal/pkg/domain"
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
	req.Header.Add("Authorization", accessToken)

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
