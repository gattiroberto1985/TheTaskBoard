package controllers

import (
    // System standard library
    "encoding/json"
    "fmt"
    "net/http"

    // External additional libraries
    "github.com/julienschmidt/httprouter"

    // Application packages
    "it/bob/apps/web/ttb-server/models"
)

type UserController struct { }

// NewUserController is a go function which returns a pointer to UserController
func NewUserController() *UserController {
    return &UserController{}
}

// GetUser is a method of the UserController type. This function makes the
// UserController an interface.
func (uc UserController) GetUser(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    // Stub an user to be populated from the body
    u := models.User{}
    Trace.Println("Entering post . . .")
    // Populate the user data
    json.NewDecoder(request.Body).Decode(&u)

    // Add an Id
    u.Id = "foo"

    // Marshal provided interface into JSON structure
    uj, _ := json.Marshal(u)

    // Write content-type, statuscode, payload
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(201)
    fmt.Fprintf(response, "%s", uj)
}

// CreateUser creates a new user resource
func (uc UserController) UpdateUser(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
    // Stub an user to be populated from the body
    u := models.User{}

    // Populate the user data
    json.NewDecoder(r.Body).Decode(&u)

    // Add an Id
    u.Id = "foo"

    // Marshal provided interface into JSON structure
    uj, _ := json.Marshal(u)

    // Write content-type, statuscode, payload
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(201)
    fmt.Fprintf(w, "%s", uj)
}
