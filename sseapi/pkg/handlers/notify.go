package handlers

import (
	"log"
	"net/http"
	"sync"
	"time"
)

type EventMessage struct {
	Channel string    `json:"channel"`
	Id      int       `json:"id"`
	Data    any       `json:"data"`
	Time    time.Time `json:"time"`
}

type HandlerEvent struct {
	m         sync.Mutex
	idMessage int
	clients   map[string]*client
}

func NewHandlerEvent() *HandlerEvent {
	return &HandlerEvent{
		clients: make(map[string]*client),
	}
}

func (h *HandlerEvent) Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)

	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	id := r.URL.Query().Get("id")
	c := newClient(id)
	h.register(c)
	log.Println("Connected   : 🦝", id)
	c.Online(r.Context(), w, flusher)
	log.Println("Disconnected: 💀", id)
	h.removeClient(id)

}

func (h *HandlerEvent) register(c *client) {
	h.m.Lock()
	defer h.m.Unlock()
	h.clients[c.ID] = c

}

func (h *HandlerEvent) removeClient(id string) {
	h.m.Lock()
	delete(h.clients, id)
	h.m.Unlock()

}

func (h *HandlerEvent) Broadcast(m EventMessage) {
	h.idMessage += 1
	h.m.Lock()
	defer h.m.Unlock()

	for _, c := range h.clients {
		c.sendMessage <- m
	}
}
