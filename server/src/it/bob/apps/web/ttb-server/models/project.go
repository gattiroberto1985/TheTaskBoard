package models

import (
        "time"
)

type Project struct {
        Title       string    `json:"title"`
        Description string    `json:"description"`
        DateOpen    time.Time `json:"dateOpen"`
        DateClosed  time.Time `json:"dateClosed"`
        DatePaused  time.Time `json:"datePaused"`
        DateWorking time.Time `json:"dateWorking"`
        Status      int       `json:"status"` // creare mappa stato - codice stato
        StatusNote  string    `json:"statusNote"` }
