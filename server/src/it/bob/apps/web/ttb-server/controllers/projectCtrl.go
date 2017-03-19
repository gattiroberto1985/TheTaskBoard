package controllers

import (
    // System standard library
    "encoding/json"
    //"fmt"
    "net/http"

    // External additional libraries
    "github.com/julienschmidt/httprouter"
    //"github.com/romana/rlog"

    // Application packages
    "it/bob/apps/web/ttb-server/models"
)

type ProjectController struct { }

// NewProjectController is a go function which returns a pointer to ProjectController
func NewProjectController() *ProjectController {
    return &ProjectController{}
}


// GetUser is a method of the ProjectController type. This function makes the
// ProjectController an interface.
func (pc ProjectController) GetProject(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    // Connection to mongodb
    // Check if single project or all Get of projects
    // Returning array to client
    p := models.Project{}
    json.NewDecoder(request.Body).Decode(&p)
    /*uj, _ := json.Marshal(p)
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(201)
    fmt.Fprintf(response, "%s", uj)*/
}

// CreateUser creates a new user resource
func (pc ProjectController) UpdateProject(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
    /*// Stub an user to be populated from the body
    u := models.User{}

    // Populate the user data
    json.NewDecoder(r.Body).Decode(&u)

    // Add an Id
    u.Id = "foo"

    // Marshal provided interface into JSON strpcture
    uj, _ := json.Marshal(u)

    // Write content-type, statuscode, payload
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(201)
    fmt.Fprintf(w, "%s", uj)*/
}
