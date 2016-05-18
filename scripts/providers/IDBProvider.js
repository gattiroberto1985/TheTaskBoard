app.service( 'indexedDBServ', function ( $window, $q ) {

  console.log("Defining factory for indexedDB . . .");

  this.READ_WRITE = "readwrite";
  this.READ_ONLY  = "readonly";

  this.IDB_NAME = "TTBAPP_v1";
  this.IDB_VERSION = 2;
  this.IDB_PROJECTS_OBJECT_STORE_NAME = "projects";
  this.database = null;

  this.indexedDB = $window.indexedDB;

  /**
   * IDB HANDLERS
   */

  this.onError = function ( e ) {
    console.log ( "ERROR: an error has occurred in IDB layer! Message is: '" + e.target + "'");
  };

  this.onSuccess = function ( e ) {

  };

  this.onBlocked = function ( e ) {

  };

  this.upgradeDatabase = function ( e ) {

    this.database = e.target.result;
    this.database.transaction.onerror = this.onError( e );
    if ( this.database.objectStoreNames.contains( this.IDB_PROJECTS_OBJECT_STORE_NAME ) ){
      // TODO: inserire logica di recupero dati!
      this.database.deleteObjectStore(this.IDB_PROJECTS_OBJECT_STORE_NAME);
    }

    var prjStore = this.database.createObjectStore(this.IDB_PROJECTS_OBJECT_STORE_NAME, { keyPath: "_id" } );
    prjStore.createIndex( "_id", "_id", { unique: true });
    for ( var i = 0; i < this.SAMPLE_PROJECTS.length; i++ )
    {
        var project = this.SAMPLE_PROJECTS[i];
        console.log("Adding to store the project '" + JSON.stringify ( project ) + "' . . .");
        var addReq = store.add( project );
        addReq.onsuccess = function ( e ) { console.log ( "Ok, project added "); };
        addReq.onerror   = function ( e ) { console.log ( "ERROR: " + e ); } ;
    }
  };

  /**
   * UTILITY FUNCTIONS
   */

   /**
    * Opens the database.
    */
  this.open = function ( ) {
      console.log("Opening database '" + this.IDB_NAME + "' with version '" + this.IDB_VERSION + "'. . .");
      var deferred = $q.defer();
      var request = this.indexedDB.open( this.IDB_NAME, this.IDB_VERSION);

      request.onupgradeneeded = this.upgradeDatabase;
      request.onsuccess = function ( e ) { this.database = e.target.result; deferred.resolve(); };
      request.onerror = function ( e ) {
         console.log ( "ERROR opening database: " + JSON.stringify( e.target )) ;
         deferred.reject();
        }

      return deferred.promise;
  };

  this.getProjects = function ( ) {
    console.log("Calling getProjects . . .");
    var deferred = $q.defer();
    if ( ! ( this.database === null ) )
    {
      console.log("Defining transaction . . .");
      var transaction = this.database.transaction( [this.IDB_PROJECTS_OBJECT_STORE_NAME] , this.READ_WRITE );
      console.log("Getting object store . . .");
      var prjStore = transaction.objectStore( this.IDB_PROJECTS_OBJECT_STORE_NAME );
      var projects = [ ];
      // Get everything in the store;
      console.log("Getting key range. . .");
      var keyRange = IDBKeyRange.lowerBound(0);
      console.log("Opening cursor . . .");
      var cursorRequest = prjStore.openCursor(keyRange);
      cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (result === null || result === undefined) {
          deferred.resolve(projects);
        }
        else
        {
          console.log (" Retreived project '" + JSON.stringify( result.value ) + "'");
          projects.push(result.value);
          result.continue();
        }
      };
      cursorRequest.onerror = function (e)
      {
        console.log(e.value);
        deferred.reject("Something went wrong!!!");
      };
    }
    else
      deferred.reject("Database not opened!");

    return deferred.promise;
  };

  /**
   * TODO: This datas must be retreived from a database layer!
   */
  this.owners = [
      { _id: "unknown"        , value: "Non Assegnato!" },
      { _id: "roberto.gatti"  , value: "Roberto"        },
      { _id: "stefano.moretto", value: "Stefano M."     },
      { _id: "s.fiorini"      , value: "Stefano F."     }
  ];

  /**
   * TODO: This datas must be retreived from a database layer!
   */
  this.statuses = [
      { _id: 0, value: "Aperto"         },
      { _id: 1, value: "In Lavorazione" },
      { _id: 2, value: "In Pausa"       },
      { _id: 3, value: "Chiuso"         }
  ];

  this.SAMPLE_PROJECTS  = [
      {
          _id: getUid(),
          title: "Progetto 1",
          description: "Descrizione progetto 1",
          status: this.statuses[0],
          owner: this.owners[1],
          tasks: [ ]
      },
      {
          _id: getUid(),
          title: "Progetto 2a",
          description: "Descrizione progetto 2a",
          status: this.statuses[1],
          owner: this.owners[1],
          tasks: [ ]
      },
      {
          _id: getUid(),
          title: "Progetto 3",
          description: "Descrizione progetto 3",
          status: this.statuses[2],
          owner: this.owners[3],
          dateOpen: new Date("2016", "04", "02"),
          dateClose: null,
          dateLastUpdated: new Date("2016", "04", "24"),
          statusNote: "In attesa chiarimenti",
          timeline: [
              { date: new Date("2016", "04", "03"), status: "In Lavorazione", note: "Inizio lavori!"},
              { date: new Date("2016", "04", "06"), status: "In Pausa"      , note: "Inviate indicazioni, in attesa riscontro"},
              { date: new Date("2016", "04", "06"), status: "In Lavorazione", note: "Info recuperate, riparto con l'attività"}
          ],
          notes: [
              { date: new Date("2016", "04", "03", "12", "22", "00"), title: "titolo nota 1", text: "testo nota 1 " },
              { date: new Date("2016", "04", "07", "17", "48", "00"), title: "titolo nota 2", text: "testo nota 2 " },
              { date: new Date("2016", "04", "13", "14", "12", "00"), title: "titolo nota 3", text: "testo nota 3 " }
          ],
          tasks: [
              {
                  _id: getUid(),
                  title: "Task 1",
                  description: "Descrizione Task 1",
                  status: this.statuses[1],
                  owner: this.owners[1],
                  dateOpen: new Date("2016", "04", "04"),
                  dateClose: null,
                  dateLastUpdated: new Date("2016", "04", "07"),
                  statusNote: "",
                  notes: [
                      { date: new Date("2016", "04", "04", "12", "00"), title: "titolo nota task 1", text: "testo nota task 1"}
                  ],
                  tasks: [ ]
              },
              {
                  _id: getUid(),
                  title: "Task 2",
                  description: "Descrizione Task 2",
                  status: this.statuses[0],
                  owner: this.owners[1],
                  dateOpen: new Date("2016", "04", "04"),
                  dateClose: null,
                  dateLastUpdated: new Date("2016", "04", "07"),
                  statusNote: "",
                  notes: [
                      { date: new Date("2016", "04", "04", "12", "00"), title: "titolo nota task 2", text: "testo nota task 2"}
                  ],
                  tasks: [ ]
              },
              {
                  _id: getUid(),
                  title: "Task 3",
                  description: "Descrizione Task 3",
                  status: this.statuses[3],
                  owner: this.owners[1],
                  dateOpen: new Date("2016", "04", "04"),
                  dateClose: null,
                  dateLastUpdated: new Date("2016", "04", "07"),
                  statusNote: "",
                  notes: [
                      { date: new Date("2016", "04", "04", "12", "00"), title: "titolo nota task 2", text: "testo nota task 2"}
                  ],
                  tasks: [ ]
              }
          ]
      }
  ];


});
