package middleware

import (
	"log"
	"net/http"

	"github.com/chipocrudos/sse-go/pkg/config"
)

// const OPTIONS_METOD = fmt.Sprint(http.MethodGet, http.MethodPost, http.MethodOptions)

func EnableCors(f http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.Header.Get("Origin"), r.URL.Path, r.URL.Query(), r.Method)

		_, ok := config.Config.APPIDS[r.URL.Query().Get("appID")]
		if !ok {
			log.Print(" 🚫 Bad app id")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		_, ok = config.Config.CORS[r.Header.Get("Origin")]
		if ok {
			w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		} else {
			log.Print(" ⛔ Cors error from origin")
		}

		w.Header().Set("Cache-Control", "no-cache")
		// w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Origin,Content-Type,Authorization,X-Requested-With,Accept")

		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
			// w.Header().Set("Access-Control-Allow-Methods", http.MethodGet, http.MethodPost, http.MethodOptions)
			w.WriteHeader(http.StatusOK)
			return
		}

		f(w, r)
	}

}
