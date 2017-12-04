// To connect:
// mongo.exe 

var conn = new Mongo();
db = conn.getDB("thegotaskboard");
db.createCollection("projects");
db.createCollection("tasks");

//db.projects.createIndex( { "title": 1, "url": 1    }, { unique: true } )
//db.tasks   .createIndex( { "title": 1, "feedId": 1 }, { unique: true } )

/*
Title   string    `json:"title"      bson:"title"`
Url     string    `json:"url"        bson:"url"`
LastUpd time.Time `json:"lastUpdate" bson:"lastUpdate"`
*/
//db.feeds.insert( { title: "Motorsport (Tutti i feed)", url: "https://www.motorsport.com/rss/all/news/", lastUpd: new Date(2000, 01, 01, 00, 00, 00) } );
//db.feeds.insert( { title: "Il Post (Tutti i feed)"   , url: "http://www.ilpost.it/feed/"              , lastUpd: new Date(2000, 01, 01, 00, 00, 00) } );



// aggregating feed and article:

// db.articles.aggregate({  "$match"  : { "isRead": false } }, { "$project": { _id: 0, feedId: 1 } }, { "$group": { _id: "$feedId", unreadCount: { $sum: 1} } }, "$lookup": { from: "articles", localField: "_id", foreignField: "feedId", as: "feed" } )

//"$lookup": { from: "articles", localField: "_id", foreignField: "feedId", as: "feed" }
