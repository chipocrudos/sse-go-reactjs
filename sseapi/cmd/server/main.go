package main

import (
	"log"
	"net/http"

	"github.com/chipocrudos/sse-go/pkg/routers"
)

func main() {
	log.Println("Initializing SSE server ......")
	log.Println("0.0.0.0 8000 ......")

	r := http.NewServeMux()
	routers.InitRoutes(r)

	err := http.ListenAndServe("0.0.0.0:8000", r)

	if err != nil {
		log.Fatalln(err)
	}

}
