package controllers

import (
    // System standard library
    "encoding/json"
    "fmt"
    "net/http"
    //"strings"

    // External additional libraries
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/web/ttb-server/models"
)

type ProjectController struct {
    session *mgo.Session
 }

// NewProjectController is a go function which returns a pointer to ProjectController
func NewProjectController(s *mgo.Session) *ProjectController {
    return &ProjectController{s}
}

func (pc ProjectController) GetProject(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

    project := models.Project{}
    id := params.ByName("pId")

    rlog.Info(" [ GET /rest/projects/:pId ] Request for specific project headers . . . ")
    err := pc.session.DB("thetaskboard").C("projects").Find( bson.M{ "_id": id } ).One(&project)
    if err != nil {
    		//if err.Error() == "not found" {
        rlog.Error("  |-------> ERROR: problem retreiving the project!")
        responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem on retreiving project with id '" + id + "'"), Body: err })
        response.Header().Set("Content-Type", "application/json")
        response.WriteHeader(200)
        fmt.Fprintf(response, "%s",responseMessage)
        return
    }

    //pj, _ := json.Marshal(project)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Project found!", Body: project })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s",responseMessage)
}

// GetProjects is a method of the ProjectController type. This function makes the
// ProjectController an interface.
func (pc ProjectController) GetProjects(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

    rlog.Info(" [ GET /rest/projects ] Request for all projects headers . . . ")
    var projects []models.Project
    err := pc.session.DB("thetaskboard").C("projects").Find( /*bson.M{ }*/ nil)/*.Select( bson.M{ "tasks": 0 } )*/.Sort("-DateLastUpdated").All(&projects)
    if err != nil {
        rlog.Error("  |-------> ERROR: problem retreiving the projects!")
        responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem on retreiving projects!"), Body: err })
        response.Header().Set("Content-Type", "application/json")
        response.WriteHeader(200)
        fmt.Fprintf(response, "%s",responseMessage)
        return
    }

//    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Projects retreived!", Body: projects })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}

// InsertProject creates a new project in the database
func (pc ProjectController) InsertProject(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    // Stub an user to be populated from the body
    rlog.Info(" [ POST /rest/projects ] Request for add a new project . . . ")

    p := models.Project{}
    json.NewDecoder(request.Body).Decode(&p)
    err := pc.session.DB("thetaskboard").C("projects").Insert(p)
    if ( err != nil ) {
      rlog.Error("  |-------> ERROR: problem inserting the project!")
      responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem inserting the project!"), Body: err })
      response.Header().Set("Content-Type", "application/json")
      response.WriteHeader(200)
      fmt.Fprintf(response, "%s",responseMessage)
      return
    }

    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    responseMessage, _ := json.Marshal( models.ResponseMessage{ HttpCode: 200, Message: ("Ok, project with id '" + p.Id + "' inserted!"), Body: nil})
    fmt.Fprintf(response, "%s", responseMessage)
}

// UpdateProject executes a full project update (task included!)
func (pc ProjectController) UpdateProject(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

    rlog.Info(" [ PUT /rest/projects/:pId ] Request for full project update . . . ")

    p := models.Project{}
    id := params.ByName("pId")

    json.NewDecoder(request.Body).Decode(&p)
    err := pc.session.DB("thetaskboard").C("projects").Update(bson.M{ "_id": id }, p)
    if ( err != nil ) {
        rlog.Error("  |-------> ERROR: problem updating the project!")
        responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem updating the project!"), Body: err })
        response.Header().Set("Content-Type", "application/json")
        response.WriteHeader(200)
        fmt.Fprintf(response, "%s",responseMessage)
        return
    }

    // Write content-type, statuscode, payload
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    responseMessage, _ := json.Marshal( models.ResponseMessage{ HttpCode: 200, Message: ("Ok, project with id '" + id + "' updated!"), Body: nil})
    fmt.Fprintf(response, "%s", responseMessage)
}


func (pc ProjectController) DeleteProject(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
  rlog.Info(" [ DELETE /rest/projects/:pId ] Request for deleting a project . . . ")
  id := params.ByName("pId")
  err := pc.session.DB("thetaskboard").C("projects").Remove( bson.M{ "_id": id })
  if err != nil {
      rlog.Error("  |-------> ERROR: problem deleting the project with id '" + id + "")
      responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem deleting the project with id '" + id + "'!"), Body: err })
      response.Header().Set("Content-Type", "application/json")
      response.WriteHeader(200)
      fmt.Fprintf(response, "%s",responseMessage)
      return
  }
  response.Header().Set("Content-Type", "application/json")
  response.WriteHeader(200)
  responseMessage, _ := json.Marshal( models.ResponseMessage{ HttpCode: 200, Message: ("Ok, project with id '" + id + "' deleted!"), Body: nil})
  fmt.Fprintf(response, "%s", responseMessage)
}

/* ***************** TASK LEVEL FUNCTIONS ***************** */

func (pc ProjectController) GetProjectTasks(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

  rlog.Info(" [ GET /rest/projects/:pId/tasks ] Request for project tasks . . . ")

  var project models.Project
  id := params.ByName("pId")
  rlog.Info(" [ GET /rest/projects/:pId/tasks ] Request for task of project with id '",id,"' . . . ")
  err := pc.session.DB("thetaskboard").C("projects").Find( bson.M{ "_id": id }).Select(bson.M{ "tasks": 1}).Sort("-DateLastUpdated").One(&project)
  if ( err != nil ) {
    panic(err)
  }
  //fmt.Println("Tasks in project with id'" + id + "': ", tasks)
  // Marshal provided interface into JSON structure
  tj, _ := json.Marshal(project.Tasks)
  // Write content-type, statuscode, payload
  response.Header().Set("Content-Type", "application/json")
  response.WriteHeader(200)
  fmt.Fprintf(response, "%s", tj)
}


func (pc ProjectController) DeleteTasks(response http.ResponseWriter, request *http.Request, params httprouter.Params) {

}

func (pc ProjectController) UpdateTasks(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
  /*p := models.Project{}
  id := params.ByName("pId")

  json.NewDecoder(request.Body).Decode(&p)*/
}
