package domain

type Profile struct {
	AvatarURL string `json:"avatar_url"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Following int64  `json:"following"`
	Followers int64  `json:"followers"`
}

type Repo struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Visibility  string `json:"visibility"`
	Language    string `json:"language"`
	UpdatedAt   string `json:"updated_at"`
}
