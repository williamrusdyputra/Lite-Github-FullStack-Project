package utils

import (
	"fmt"
	"time"
)

func GetStatus(timestamp string) string {
	parsedTime, err := time.Parse(time.RFC3339, timestamp)
	if err != nil {
		fmt.Println("Error parsing the date string:", err)
		return ""
	}

	currentTime := time.Now()

	// Calculate the time difference
	difference := currentTime.Sub(parsedTime)

	// Check conditions and return the corresponding status
	if difference < 10*time.Minute {
		return "just now"
	} else if difference < 24*time.Hour {
		hours := int(difference.Hours())
		return fmt.Sprintf("%d hours ago", hours)
	} else {
		return fmt.Sprintf("on %s", parsedTime.Format("Jan 2, 2006"))
	}
}
