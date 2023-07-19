package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

const format = "id:%d\nevent:%s\ndata:%s\n\n"

type client struct {
	ID          string
	sendMessage chan EventMessage
}

func newClient(id string) *client {

	return &client{
		ID:          id,
		sendMessage: make(chan EventMessage),
	}
}

func (c *client) Online(ctx context.Context, w io.Writer, flusher http.Flusher) {

	for {
		select {
		case m := <-c.sendMessage:
			data, err := json.Marshal(m)

			if err != nil {
				log.Println(err)
			}

			fmt.Fprintf(w, format, m.Id, m.Channel, string(data))
			flusher.Flush()

		case <-ctx.Done():
			return
		}
	}

}
