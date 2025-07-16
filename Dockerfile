FROM golang:1.22-alpine

WORKDIR /app

COPY ./frontend/build ./frontend/build
COPY ./cmd/serve-frontend ./cmd/serve-frontend

RUN go build -o serve-frontend ./cmd/serve-frontend

CMD ["./serve-frontend"]