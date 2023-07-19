package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/chipocrudos/sse-go/pkg/response"
)

func HandlerMessage(notifier *HandlerEvent) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var data = map[string]any{}
		json.NewDecoder(r.Body).Decode(&data)

		ch := r.URL.Query().Get("channel")

		log.Println(data)

		if ch == "" {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		ms := EventMessage{
			Channel: ch,
			Id:      notifier.idMessage,
			Data:    data,
			Time:    time.Now(),
		}
		notifier.Broadcast(ms)

		response.JSON(w, r, http.StatusOK, ms)
	}
}
