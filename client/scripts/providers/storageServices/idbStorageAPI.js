/**
 * Storage API for the IndexedDB.
 */
app.service('idbStorageAPI', function ( $window, storageServ, projectServ ) {

    this.IDB_DB_NAME = "TheTaskBoard_IDB";
    this.IDB_DB_VERS = 5;
    var IDB_PROJECTS_OBJECT_STORE_NAME = this.IDB_PROJECTS_OBJECT_STORE_NAME = "ttb_projects";
    var IDB_FASKS_OBJECT_STORE_NAME    = this.IDB_FASKS_OBJECT_STORE_NAME    = "ttb_fasks";
    var IDB_READ_WRITE_MODE            = this.IDB_READ_WRITE_MODE           = "readwrite";
    this.IDB_SERVICE = $window.indexedDB      = $window.indexedDB; // || $window.mozIndexedDB || $window.webkitIndexedDB || $window.msIndexedDB;
    //this.idbTransaction = $window.IDBTransaction = $window.IDBTransaction || $window.webkitIDBTransaction || $window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    //this.idbKeyRange    = $window.IDBKeyRange    = $window.IDBKeyRange || $window.webkitIDBKeyRange || $window.msIDBKeyRange;

    var idb = this.idb = null;

    this.onIDBRequestError = function ( event )
    {
        console.log( " [ idbStorageAPI ] ERROR: " + event.target.errorCode );
    }

    this.onIDBRequestSuccess = function ( event )
    {
        console.log ( " [ idbStorageAPI ] Request succedeed!");
        return event.target.result;
    }

    this.onIDBUpgradeNeeded = function ( event )
    {
        var db = event.target.result;
        var objectStorePrjs = db.createObjectStore( IDB_PROJECTS_OBJECT_STORE_NAME, { keyPath: "_id" } );
        objectStorePrjs.createIndex("_id_prjs", "_id", { unique: true });
        objectStorePrjs.createIndex("title", "title", { unique: true });
        var objectStoreFsks = db.createObjectStore( IDB_FASKS_OBJECT_STORE_NAME, { keyPath: "_id" } );
        objectStoreFsks.createIndex("_id_fsks", "_id", { unique: true });
    }

    this.setIDB = function ( event )
    {
        this.idb = event.target.result;
    }

    /* ********************************************************************* */
    /*                                CRUD METHODS                           */
    /* ********************************************************************* */

    this.addProject = function ( project ) {
        var transaction = /*this.*/idb.transaction( [ /*this.*/IDB_PROJECTS_OBJECT_STORE_NAME ], /*this.*/IDB_READ_WRITE_MODE);
        transaction.oncomplete = this.onIDBRequestSuccess;

        transaction.onerror = this.onIDBRequestError;

        var objectStore = transaction.objectStore(/*this.*/IDB_PROJECTS_OBJECT_STORE_NAME);
        var request = objectStore.add(project);
        request.onsuccess = function(event) {
            console.log ( " [ idbStorageAPI ] Added project with _id '" + project._id + "'!");
        };
        request.onerror = this.onIDBRequestError;

    };

    this.deleteProject = function ( projectId ) {
        var request = /*this.*/idb.transaction( [ /*this.*/IDB_PROJECTS_OBJECT_STORE_NAME ], /*this.*/IDB_READ_WRITE_MODE)
                        .objectStore( /*this.*/IDB_PROJECTS_OBJECT_STORE_NAME )
                        .delete( { _id: projectId });
        request.onsuccess = function ( event ) {
            console.log( " [ idbStorageAPI ] Successfully removed project with _id '" + projectId + "'!");
        };
    };

    this.updateProject = function ( project ) {

    };

    this.getProjects = function ( ) {
        console.log(" [ idbStorageAPI ] Opening IndexedDB database '" + this.IDB_DB_NAME + "' at version '" + this.IDB_DB_VERS + "' . . .");
        var request = this.IDB_SERVICE.open( this.IDB_DB_NAME, this.IDB_DB_VERS );
        request.onupgradeneeded = this.onIDBUpgradeNeeded;
        request.onerror = this.onIDBRequestError;
        request.onsuccess = function ( event )
        {
            //this.idb = event.target.result;
            idb = event.target.result;
            console.log(" [ idbStorageAPI ] Getting datas . . . ");
            var getProjectsReq = /*this.*/idb.transaction( [ /*this.*/IDB_PROJECTS_OBJECT_STORE_NAME ], /*this.*/IDB_READ_WRITE_MODE)
                                 .objectStore( /*this.*/IDB_PROJECTS_OBJECT_STORE_NAME ).getAll();
            getProjectsReq.onsuccess = function ( event )
            {
                console.log( " [ idbStorageAPI ] Data retreived: size is " + event.target.result.length);
                var projects = event.target.result;
                projectServ.setProjects ( projects );
                for ( var i = 0; i++; i < projects.length )
                    projectServ.projects.push( projects [ i ] );
            };
            getProjectsReq.onerror = function ( event )
            {
                console.log( " [ idbStorageAPI ] ERROR on getProjects: " + event.target.errorCode);
            };
        };
    };

});
