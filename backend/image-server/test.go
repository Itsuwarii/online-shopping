package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func main() {

	imageBase64 := "213232"
	imageHash := sha256.Sum256([]byte(imageBase64))
	imageName := hex.EncodeToString(imageHash[:])

	fmt.Print(imageName)
}
