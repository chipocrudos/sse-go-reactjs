package routers

import (
	"fmt"
	"net/http"

	"github.com/chipocrudos/sse-go/pkg/handlers"
	"github.com/chipocrudos/sse-go/pkg/middleware"
)

func InitRoutes(r *http.ServeMux) {

	handlerEvents := handlers.NewHandlerEvent()

	r.HandleFunc("/notify", middleware.EnableCors(handlerEvents.Handler))
	r.HandleFunc("/message", middleware.EnableCors(handlers.HandlerMessage(handlerEvents)))

	r.HandleFunc("/healtcheck", healtCheck)

}

func healtCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Server a life")
}
