package main

import (
    "fmt"
    "net/http"
)

/*func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}*/

func main() {
    //http.HandleFunc("/", handler)
    fs := http.FileServer(http.Dir("client"))
    http.Handle("/", fs)
    fmt.Printf ( "Listening on port 8080 . . ");
    http.ListenAndServe(":8080", nil)

}
