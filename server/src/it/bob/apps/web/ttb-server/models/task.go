package models

import (
        "time"
        //"gopkg.in/mgo.v2"
        //"gopkg.in/mgo.v2/bson"

)

type Task struct {
  Id          string    `json:"_id"     bson:"_id"`
  Title       string    `json:"title" bson:"title"`
  Description string    `json:"description" bson:"description"`
  DateOpened  time.Time `json:"dateOpened" bson:"dateOpened"`
  DateUpdated time.Time `json:"dateLastUpdated" bson:"dateLastUpdated"`
  TOwner      Owner     `json:"owner" bson:"owner"`
  TStatus     Status    `json:"status" bson:"status"` // creare mappa stato - codice stato
  StatusNote  string    `json:"statusNote" bson:"statusNote"`
  Timeline    []TimeStep `json:"timeline" bson:"timeline"`
}
