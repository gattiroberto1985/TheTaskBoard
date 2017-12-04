/*
 * File       : userCtrl.go
 * Description:
 *       User controller for the db layer
 *
 * Changelog:
 *
 *  2017.12.04 -- roberto -- todo inserted for a user validation before
 *                           update/insert
 *  2017.12.03 -- roberto -- Fix for user writing on db
 */

package controllers

import (
    // System standard library
    "encoding/json"
    "fmt"
    "net/http"

    // External additional libraries
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/web/ttb-server/models"
)

type UserController struct {
    session *mgo.Session
}

// NewUserController is a go function which returns a pointer to UserController
func NewUserController(s *mgo.Session) *UserController {
    return &UserController{s}
}

// GetUser is a method of the UserController type. This function makes the
// UserController an interface.
func (uc UserController) GetUser(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    // Stub an user to be populated from the body
    u := models.User{}
    //Trace.Println("Entering post . . .")
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
func (uc UserController) UpdateUser(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

    var prefix = " [ POST /rest/users ] "
    rlog.Info( prefix + "Request for add/update a new user . . . ")


    // Stub an user to be populated from the body
    u := models.User{}
    // Check the param
    id := params.ByName("uId")
    if id == "" {
        u.Id = string ( bson.NewObjectId() )
    } else {
        // TODO: Maybe an error does not mean there is not an id ... ?
        u.Id = id
    }

    // TODO: call to u.validate, to proceed?

    // Populate the user data
    json.NewDecoder(request.Body).Decode(&u)
    // Marshal provided interface into JSON structure
    uj, _ := json.Marshal(u)

    rlog.Info(prefix + "About to insert user . . .")
    err := uc.session.DB("thegotaskboard").C("users").Insert(u)
    if ( err != nil ) {
      rlog.Error("  |-------> ERROR: problem inserting the user!")
      responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem inserting the user!"), Body: err })
      response.Header().Set("Content-Type", "application/json")
      response.WriteHeader(200)
      fmt.Fprintf(response, "%s",responseMessage)
      return
    }

    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    responseMessage, _ := json.Marshal( models.ResponseMessage{ HttpCode: 200, Message: ("Ok, user with id '" + u.Id + "' inserted!"), Body: uj})
    fmt.Fprintf(response, "%s", responseMessage)
}
