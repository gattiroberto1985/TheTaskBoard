package models

import (
        "time"
        //"gopkg.in/mgo.v2"
        //"gopkg.in/mgo.v2/bson"

)


type Project struct {
        Id          string    `json:"_id"     bson:"_id"`
        Title       string    `json:"title" bson:"title"`
        Description string    `json:"description" bson:"description"`
        DateOpen    time.Time `json:"dateOpen" bson:"dateOpen"`
        DateClosed  time.Time `json:"dateClose" bson:"dateClose"`
        DateUpdated time.Time `json:"dateLastUpdated" bson:"dateLastUpdated"`
        POwner      Owner     `json:"owner" bson:"owner"`
        PStatus     Status    `json:"status" bson:"status"` // creare mappa stato - codice stato
        StatusNote  string    `json:"statusNote" bson:"statusNote"`
        Tasks       []Task    `json:"tasks" bson:"tasks"` }

//func (project Project) validate
