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
    fmt.Printf ( "Serving files in './client' on port 1314 . . ");
    http.ListenAndServe(":1314", nil)

}
