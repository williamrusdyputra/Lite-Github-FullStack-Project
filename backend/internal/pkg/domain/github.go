package domain

type Profile struct {
	AvatarURL *string `json:"avatar_url"`
	Email     *string `json:"email"`
	Name      *string `json:"name"`
	Following int64   `json:"following"`
	Followers int64   `json:"followers"`
}
