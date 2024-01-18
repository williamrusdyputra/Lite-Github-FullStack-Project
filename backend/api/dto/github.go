package dto

type ProfileRequest struct {
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
}

type RepoRequest struct {
	Username    string `json:"username"`
	AccessToken string `json:"access_token"`
}
