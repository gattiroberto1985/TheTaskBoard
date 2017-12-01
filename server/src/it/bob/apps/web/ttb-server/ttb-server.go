package main // per identificarlo come eseguibile

import (
    // Standard library packages
    //"fmt"
    //"time"
    //"encoding/json"
    "net/http"
    "io"
    //"io/ioutil"
    "log"
    "os"

    // External additional libraries
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"
    "gopkg.in/mgo.v2"

    // projects packages
    "it/bob/apps/web/ttb-server/controllers"

)

/* ************************************************************************* */
/*                              GLOBAL VARIABLES                             */
/* ************************************************************************* */

var (
    Trace   *log.Logger
    Info    *log.Logger
    Warning *log.Logger
    Error   *log.Logger
)

func Init(
    traceHandle io.Writer,
    infoHandle io.Writer,
    warningHandle io.Writer,
    errorHandle io.Writer) {

    Trace = log.New(traceHandle,
        "TRACE: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Info = log.New(infoHandle,
        "INFO: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Warning = log.New(warningHandle,
        "WARNING: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Error = log.New(errorHandle,
        "******* ERROR: ",
        log.Ldate|log.Ltime|log.Lshortfile)
}

func getSession() *mgo.Session {
    // Connect to our local mongo
    s, err := mgo.Dial("mongodb://localhost")

    // Check if connection error, is mongo running?
    if err != nil {
        panic(err)
    }
    return s
}


func main() {

    // Initializing log . . .
    Init(os.Stdout, os.Stdout, os.Stdout, os.Stderr)
    //Trace.Println("Trace message")
    //Info.Println("Info message")
    //Warning.Println("Warning message")
    //Error.Println("ERROR Message!")

    //rlog.SetConfFile("./log.config")
    rlog.Info("Starting thetaskboard server . . . ")
    //rlog.Debug("Debug message in rlog!")
    //rlog.Error("Error message in rlog!")

    // Instantiate a new router
    r := httprouter.New()

    // Get a UserController instance
    uc := controllers.NewUserController()
    pc := controllers.NewProjectController(getSession())
    //fc := controllers.NewFreezoneController()

    rlog.Info("Defining http routing . . . ")
    // Get a user resource
    r.GET("/rest/user/:id", uc.GetUser)
    r.POST("/rest/user/", uc.UpdateUser)

    // Routing for projects
    r.GET("/rest/projects"                , pc.GetProjects)
    r.POST("/rest/projects"               , pc.InsertProject)
    r.GET("/rest/projects/:pId"           , pc.GetProject)
    r.PUT("/rest/projects/:pId"           , pc.UpdateProject)
    r.DELETE("/rest/projects/:pId"        , pc.DeleteProject)
    r.GET("/rest/projects/:pId/tasks"     , pc.GetProjectTasks)
    r.PUT("/rest/projects/:pId/tasks"     , pc.UpdateProjectTasks)
    r.PUT("/rest/projects/:pId/tasks/:tId", pc.UpdateProjectTasks)

    //r.GET("/freezone/index.html", fc.getIndex )
    //r.GET("/freezone/admin.html", fc.getIndex )
    //r.GET("/freezone/index.html", fc.getIndex )
    /*r.GET("/rest/projects/:pId/tasks", pc.GetTask)
    r.GET("/rest/projects/:pId/tasks/:tId", pc.GetTask)
    r.POST("/rest/projects/:pId/tasks/:tId", pc.UpdateTask)
    r.POST("/rest/projects/:pId/tasks", pc.UpdateTask)*/

    rlog.Info("Serving files . . .")
    rlog.Error( http.ListenAndServe("www.thegotaskboard.dev:3000", r) )

    //deref getSession.close()

}
