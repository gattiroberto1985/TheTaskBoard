/*
 * File       : ttb-server_test.go
 * Description:
 *       Main test program for the application
 *
 * Changelog:
 *
 *  2017.12.04 -- roberto -- Creation
 */


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


func TestMain(t *testing.T) {

    // Initializing log . . .
    Init(os.Stdout, os.Stdout, os.Stdout, os.Stderr)

    rlog.Info("Starting thetaskboard server . . . ")

    var User = models.User{name    : "the user name", surname : "the user surname",  username: "the user username",  password: "the user password" }

    resp, err := http.Get("http://thegotaskboard.dev/rest/users")
}
