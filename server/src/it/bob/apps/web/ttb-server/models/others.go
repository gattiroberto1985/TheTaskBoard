package models

import (
        "time"
        //"gopkg.in/mgo.v2"
        //"gopkg.in/mgo.v2/bson"

)

type Status struct {
    Id int `json:"id" bson:"id"`
    Value string `json:"value" bson:"value"` }

type Owner struct {
  Id int `json:"id" bson:"id"`
  Value string `json:"value" bson:"value"`
}

type TimeStep struct {
  Date time.Time `json:"date" bson:"date"`
  Note string    `json:"note" bson:"note"`
  OldTStatus Status `json:"status" bson:"status"`
}


type ResponseMessage struct {
  HttpCode int         `json:"httpcode" bson:"httpcode"`
  Message  string      `json:"message" bson:"message"`
  Body     interface{} `json:"body" bson:"body"`
}
