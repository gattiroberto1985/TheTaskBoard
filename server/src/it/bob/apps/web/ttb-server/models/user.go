package models

type User struct {
    Id       string `json:"id"`
    Name     string `json:"name"`
    Surname  string `json:"surname"`
    Username string `json:"username"`
    Password string `json:"password"`
}
