# Backend

Simple Golang backend to retrieve user information from Github

# Pre-requisites
- Go 1.21

## API List

Name            | Method| Path |
---             | ---   | --- | 
Get Profile     | GET   | `/api/v1/github/profile` |
Get Repositories| GET   | `/api/v1/github/repos` |

## How to run

1. Clone the repository
2. run `go mod tidy`
3. run `go run app/main.go`