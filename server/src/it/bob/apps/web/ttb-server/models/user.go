package models

type User struct {
    Id       string `json:"id" bson:"_id"`
    Name     string `json:"name" bson:"name"`
    Surname  string `json:"surname" bson:"surname"`
    Username string `json:"username" bson: "username"`
    Password string `json:"password" bson: "password"`
}
