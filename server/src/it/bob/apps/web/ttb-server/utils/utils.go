package utils

import (
    // System standard library
    "encoding/json"
    "fmt"
    "net/http"
    "strings"

    // External additional libraries
    //"gopkg.in/mgo.v2"
    //"gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/web/ttb-server/models"
)

func writeTTBResponse(httpcode int, message string, body *interface{}, response http.ResponseWriter) {
    responseObject := models.ResponseMessage{HttpCode: httpcode, Message: message, Body: body }
    responseMessage, _ := json.Marshal(responseObject )
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s",responseMessage)
}
