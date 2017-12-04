package models

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

// t.Error o t.Fail 

func TestUserInsert(t *testing.T) {
    rlog.Info(" [ TEST ] User tests: insert . . .")
}

func TestUserGet(t *testing.T) {
    rlog.Info(" [ TEST ] User tests: get . . .")
}

func TestUserUpdate(t *testing.T) {
    rlog.Info(" [ TEST ] User tests: update . . .")
}

func TestUserDelete(t *testing.T) {
    rlog.Info(" [ TEST ] User tests: delete . . .")
}
