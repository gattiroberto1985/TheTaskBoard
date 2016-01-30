
// Gestione database
var IDB_OBJECT_STORE_NAME = "ttb";
var IDB_NAME = "TTB_idb-v2";
var IDB_VERSION = 1;
var KEY_ID = "id";

var IDB_DATABASE = null;

function openOrCreateIDB()
{
    console.log("[ DATABASE ] Trying to open/create the indexed DB database with name '" + IDB_NAME + "' and version '" + IDB_VERSION + "'. . .");
    var request = indexedDB.open(IDB_NAME, IDB_VERSION);
    
    request.onupgradeneeded = function (e) { upgradeIDB(e); };

    request.onsuccess = function (e) {
        console.log(" [ DATABASE ] . . . Created db!");
        IDB_DATABASE = e.target.result;
        deferred.resolve();
    };

    request.onerror = function () { deferred.reject(); };    
    console.log("[ DATABASE ] Ok, database available: Object Store Name: '" + IDB_OBJECT_STORE_NAME + "' -- db name: '" + IDB_NAME );
    
    return deferred.promise();
}



/** 
 * Metodo di upgrade del database. Esegue la rimozione del vecchio object store, se presente, e procede
 * alla creazione di una nuova versione. 
 */
function upgradeIDB(e)
{
   console.log ( " [ DATABASE ] IDB upgrade needed!" );
    IDB_DATABASE = e.target.result;
    e.target.transaction.onerror = indexedDB.onerror;
    if (IDB_DATABASE.objectStoreNames.contains(IDB_OBJECT_STORE_NAME)) 
    {
        console.log ( " [ DATABASE ] . . . removing old object store . . . " );
        IDB_DATABASE.deleteObjectStore(IDB_OBJECT_STORE_NAME);
    }

    console.log ( " [ DATABASE ] . . . creating new object store . . ." );
    var store = IDB_DATABASE.createObjectStore(IDB_OBJECT_STORE_NAME, {
        keyPath: KEY_ID,
        autoIncrement: true
    });

    // define what data items the objectStore will contain
    store.createIndex("id", "id", { unique: true });

    for ( var i = 0; i < TEST_PROJECTS.length ; i++  )
    {
        var project = TEST_PROJECTS[i];
        console.log( "Adding to store " + store + " the project with id " + project.id  ) ;
        var addReq = store.add(project);
        addReq.onsuccess = function(event)  { console.log(" [ DATABASE ] |---- inserted project with id '" + event.target.result.id + "'"); };
        addReq.onerror = function ( error ) { console.log ( " [ DATABASE ] ... ERROR: " + error ); };
    }      
    console.log(" [ DATABASE ] Upgrade completed!");
}