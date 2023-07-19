# SSE Realtime chat Golang + ReactJs


### Config

```copy env.example .env```

Change your values

```
#Api config
CORS=http://localhost:8000,http://localhost:5173,http://localhost:8080
APPIDS=SUPERSECRET
```

Change VITE variables to match values in a previous file

```
version: '3.9'

services:
  server:
    build:
      dockerfile: docker/sseapi/Dockerfile
      context: .
      target: final
    ports:
      - 8000:8000
    env_file:
      - .env

  uix:
    build: 
      dockerfile: docker/sseui/Dockerfile
      context: .
      target: final
      args:
        - VITE_SERVERAPI=http://localhost:8000
        - VITE_APPID=SUPERSECRET
    ports:
      - 8080:80
```

### Run
```
docker compose up
```

### Visit
Enter to url [http://localhost:8080](http://localhost:8080)


#### Grateful
* [Kevin Saucedo](https://www.youtube.com/@kevinsaucedo9134) 
    * [Video youtube ](https://www.youtube.com/watch?v=wHzh5-N2jJQ)

* Codemyhobby
    * [Video youtube ](https://www.youtube.com/watch?v=rDJtEcccQ-s)
