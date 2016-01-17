// DB variables
var IDB_DATABASE = null;
var IDB_OBJECT_STORE_NAME = "projects";
var IDB_NAME = "TheTaskBoard_IDB";
var IDB_VERSION = 1;
var TASK_KEY_ID = "id";

// see http://www.raymondcamden.com/demos/2014/feb/7/#/home

// Actions
var DB_ACTION_UPGRADE         = "db_upgrade";
var DB_ACTION_OPEN            = "db_open";
var DB_ACTION_FETCH_ITEMS     = "db_fetch_items";
var DB_ACTION_FETCH_ITEM_DATA = "db_fetch_item_data";
var DB_ACTION_ADD_ITEM        = "db_add_item";
var DB_ACTION_UPDATE_ITEM     = "db_update_item";
var DB_ACTION_DELETE_ITEM     = "db_delete_item";

var projects =  [
        {
            id: 1,
            uniqueId: "prj_1",
            name: "PRJ-PROGETTO_1",
            description: "Progetto 1 -- descrizione",
            status: "OPEN",
            assignedTo: "Sherlock Holmes",
            taskList: [
                { 
                    id: 1,
                    uniqueId: "tsk_1",
                    description: "Control the room of the red studio",
                    assignedTo: "Sherlock Holmes",
                    status: "CLOSED",
                    notes: [ 
                        {
                            id: 1,
                            uniqueId: "nte_1",
                            date: "12-08-2015 23:43:12",
                            text: "Found a body with scaring face. Wonder what cause it."
                        }, // closing note 1
                        {
                            id: 2,
                            uniqueId: "nte_2",
                            date: "12-08-2015 23:45:00",
                            text: "Seems like the man have been poisoned. "
                        } // closing note 2                        
                    ] // closing note array
                }, // closing first task of first project 
                { 
                    id: 2,
                    uniqueId: "tsk_2",
                    description: "Searching for Jefferson Hope",
                    assignedTo: "Sherlock Holmes",
                    status: "OPEN",
                    notes: [ 
                        {
                            id: 3,
                            uniqueId: "nte_3",
                            date: "13-08-2015 11:29:32",
                            text: "Asked to my boys to search JH"
                        } // closing note 1                       
                    ] // closing note array
                }, // closing first task of first project                 
            ]
        },
        {
            id: 2,
            uniqueId: "prj_2",
            name: "JPR-PROGETTO_2",
            description: "Progetto 2 -- descrizione",
            status: "BACKLOGGED"
        },
        {
            id: 3,
            uniqueId: "prj_3",
            name: "RPJ-PROGETTO_3",
            description: "Progetto 3 -- descrizione",
            status: "CLOSED"
        }];

function initDB()
{
    console.log(" [ DATABASE ] |-- Creating open request for '" + IDB_NAME + "', version '" + IDB_VERSION + "'");
    var openDBRequest = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    // setting event handlers
    // TODO: define the action constants and the functions!
    openDBRequest.onerror         = function ( event ) { handleDBError  (DB_ACTION_OPEN, event); }
    openDBRequest.onupgradeneeded = function ( event ) { handleDBUpgrade(DB_ACTION_UPGRADE, event); }
    openDBRequest.onsuccess       = function ( event ) { handleDBSuccess(DB_ACTION_OPEN, event); }
    
    console.log(" [ DATABASE ] See for asynchronous operation with the request! ");
}


function handleDBError(action, event, params)
{
    console.log(" [ DATABASE ] ERROR: an error has occurred during the action '" + action + "'!");
    console.log(" [ DATABASE ]        The message is: '" + event.target.error.message + "'");
}




function handleDBUpgrade(action, event, params)
{
    console.log(" [ DATABASE ] Trying to upgrade the indexedDB ...");
    try
    {
        IDB_DATABASE = event.target.result;
        if ( IDB_DATABASE.objectStoreNames.contains(IDB_OBJECT_STORE_NAME) )
        {
            console.log(" [ DATABASE ] Deleting old version of '" + IDB_OBJECT_STORE_NAME + "'...");
            IDB_DATABASE.deleteObjectStore(IDB_OBJECT_STORE_NAME);
        }
        console.log(" [ DATABASE ] Creating new version of '" + IDB_OBJECT_STORE_NAME + "'...");
        var taskStore = IDB_DATABASE.createObjectStore(IDB_OBJECT_STORE_NAME, { keyPath: TASK_KEY_ID, autoIncrement: true });
        
        // define what data items the objectStore will contain
        taskStore.createIndex("id", "id", { unique: true });
        
        for ( var project in projects )
        {
            var request = taskStore.add(task);
            request.onsuccess = function(event) 
            { console.log(" [ DATABASE ] |---- inserted project with id '" + event.target.result.id + "'"); };
        }
    }
    catch ( err )
    {
        console.log(" [ DATABASE ] ERROR: caught an exception on handleDBUpgrade!");
        console.log(" [ DATABASE ]        Message is: '" + err.message + "'");
        alert("ERRORE: upgrade fallito con messaggio '" + err.message + "'");
    }
    
}





function handleDBSuccess(action, event, params)
{
    switch( action )
    {
        case DB_ACTION_OPEN:
        {
            getTasks(event);
            break;
        }
        /*case DB_ACTION_FETCH_ITEMS:
        {
            fetchItem(event);
            break;
        }
        case DB_ACTION_FETCH_ITEM_DATA:
        {
            fetchItemData(event, params);
            break;
        }
        case DB_ACTION_ADD_ITEM:
        {
            addTask(event, params);
            break;
        }
        case DB_ACTION_UPDATE_ITEM:
        {
            updateTask(event, params);
            break;
        }
        case DB_ACTION_DELETE_ITEM:
        {
            deleteTask(event, params);
            break;
        }*/
        default: console.log(" [ DATABASE ] Unable to identify action! For what it's worth, the request has been successfully completed!");
    }
}

/*
 * Recupera i progetti dal database.
 */
function getProjects(event)
{
    IDB_DATABASE = event.target.result;
    console.log("Retreiving objects...");
    var transaction = IDB_DATABASE.transaction(IDB_OBJECT_STORE_NAME, IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore(IDB_OBJECT_STORE_NAME);
    var request = objectStore.openCursor();
    request.onerror = function(event) {
        // Handle errors!
        console.log("ERROR: on request of opencursor!");
    };
    request.onsuccess = function(event) { handleDBSuccess(DB_ACTION_FETCH_ITEMS, event); } 
    
}

function fetchItem(event)
{
    try
    {
        console.log("Data retreived, getting results...");
        var cursor = event.target.result;
        //var tasks = [] ;
        var task = { };
        if ( cursor )
        {
            console.log("|-- object retreived");
            task = cursor.value;
            console.log("|---- Task id: '" + task.taskId + "'");
            fillTaskFields(task);
            cursor.continue();
        }    
    }
    catch ( err ) 
    {
        console.log("ERROR: on fetch items: '" + err.message + "'");
        alert("ERRORE: impossibile recuperare gli oggetti! Messaggio interno: '" + err.message + "'");
    }
}
