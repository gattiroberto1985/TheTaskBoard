/*
 * MongoDB datas:
 *   collections: projects, fasks, users, tags
 *
 * API: XMqKdQMWKfpGmBVMCwS3_nYAxz2-z8de
 *
 * To connect using the mongo shell:
 *    mongo ds011732.mlab.com:11732/thetaskboard -u <dbuser> -p <dbpassword>
 * To connect using a driver via the standard MongoDB URI (what's this?):
 *    mongodb://<dbuser>:<dbpassword>@ds011732.mlab.com:11732/thetaskboard
 *
 *  user/pwd: roberto/roberto
 *
 */

app.service('projectServ', function ( $indexedDB ) {

    // TODO: define me as angular constant!
    var OBJECT_STORE_NAME = 'projects';

    /**
     * @type {ObjectStore}
     */
    //this.objectStore = indexedDBServ.objectStore(OBJECT_STORE_NAME);

    //myObjectStore.insert({"ssn": "444-444-222-111","name": "John Doe", "age": 57}).then(function(e){...});
    this.projects = [  ];
    $indexedDB.openStore('projects', function(store){

          //store.insert({"ssn": "444-444-222-111","name": "John Doe", "age": 57}).then(function(e){...});

          store.getAll().then(function(projects) {
            // Update scope
            this.projects = projects;
          });
        });
    /*indexedDBServ.open();
    indexedDBServ.getProjects().then(function(results) {
      // Update scope
      this.projects = results;
    });*/

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

    // TODO: this datas MUST be retrieved from a database layer!
    /*this.projects = [
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
            dateOpen: new Date(2016, 04, 02),
            dateClose: null,
            dateLastUpdated: new Date(2016, 04, 24),
            statusNote: "In attesa chiarimenti",
            timeline: [
                { date: new Date(2016, 04, 03), status: "In Lavorazione", note: "Inizio lavori!"},
                { date: new Date(2016, 04, 06), status: "In Pausa"      , note: "Inviate indicazioni, in attesa riscontro"},
                { date: new Date(2016, 04, 06), status: "In Lavorazione", note: "Info recuperate, riparto con l'attività"}
            ],
            notes: [
                { date: new Date(2016, 04, 03, 12, 22, 00), title: "titolo nota 1", text: "testo nota 1 " },
                { date: new Date(2016, 04, 07, 17, 48, 00), title: "titolo nota 2", text: "testo nota 2 " },
                { date: new Date(2016, 04, 13, 14, 12, 00), title: "titolo nota 3", text: "testo nota 3 " }
            ],
            tasks: [
                {
                    _id: getUid(),
                    title: "Task 1",
                    description: "Descrizione Task 1",
                    status: this.statuses[1],
                    owner: this.owners[1],
                    dateOpen: new Date(2016, 04, 04),
                    dateClose: null,
                    dateLastUpdated: new Date(2016, 04, 07),
                    statusNote: "",
                    notes: [
                        { date: new Date(2016, 04, 04, 12, 00), title: "titolo nota task 1", text: "testo nota task 1"}
                    ],
                    tasks: [ ]
                },
                {
                    _id: getUid(),
                    title: "Task 2",
                    description: "Descrizione Task 2",
                    status: this.statuses[0],
                    owner: this.owners[1],
                    dateOpen: new Date(2016, 04, 04),
                    dateClose: null,
                    dateLastUpdated: new Date(2016, 04, 07),
                    statusNote: "",
                    notes: [
                        { date: new Date(2016, 04, 04, 12, 00), title: "titolo nota task 2", text: "testo nota task 2"}
                    ],
                    tasks: [ ]
                },
                {
                    _id: getUid(),
                    title: "Task 3",
                    description: "Descrizione Task 3",
                    status: this.statuses[3],
                    owner: this.owners[1],
                    dateOpen: new Date(2016, 04, 04),
                    dateClose: null,
                    dateLastUpdated: new Date(2016, 04, 07),
                    statusNote: "",
                    notes: [
                        { date: new Date(2016, 04, 04, 12, 00), title: "titolo nota task 2", text: "testo nota task 2"}
                    ],
                    tasks: [ ]
                }
            ]
        }
    ];*/

    this.selectedProjectId = null;
    this.sProject          = null;
    this.sTask             = null;

    /* ********************************************************************* */
    /*                                CRUD METHODS                           */
    /* ********************************************************************* */

    this.createProject = function ( project )
    {
        // Calling API for inserting project and cleaning newProject var
        console.log( " [ AJS ] [ projectServ ] Creating project . . .");

        if ( project.status == null )
            project.status = this.statuses[0];

        if ( project.owner == null )
            project.owner = this.owners[0];

        project.dateOpen = project.dateLastUpdated = new Date();
        project.dateClose = null;

        project._id = getUid();

        //this.projects.push( project );
        //this.objectStore.add( project );
        this.selectedProjectId = project._id;
        this.sProject = angular.extend( { }, project );
        if ( this.sProject.notes === undefined || this.sProject.notes == null )
            this.sProject.notes = [ ];
        if ( this.sProject.timeline === undefined || this.sProject.timeline == null )
            this.sProject.timeline = [ ];
        if ( this.sProject.tasks === undefined || this.sProject.tasks == null )
            this.sProject.tasks = [ ];
    };

    this.removeProject = function ( projectId )
    {
        console.log(" [ AJS ] [ projectServ ] deleting project with id '" + projectId + "'. . . ");
        /*var i = 0;
        for ( i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == projectId )
            {
                //this.projects.splice(i, 1 );
                console.log("Project found, deleting it . . .");*/
                //this.objectStore.delete({ _id: projectId })
          /*      break;
            }
        }*/
        console.log(" [ AJS ] [ projectServ ] Deleted project!");
    };

    /**
     * Starting from the id registered in the selectedProjectId field, an update
     * of the project is tried.
     */
    this.saveProject = function ( project )
    {
        console.log("Updating project . . .");
        //this.objectStore.put( project );
        /*for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == project._id )
            {
                this.projects[i] = project;
                console.log("Project updated!");
                return;
            }
        }
        console.log(" ERROR: unable to find project to update with _id: '" + project._id + "'");*/
    };

    this.updateTask = function ( newTask )
    {
        console.log(" [ ProjectServ ] Updating task in project . . .");

        for ( var i = 0; i < this.sProject.tasks.length ; i++ )
        {
            var task = this.sProject.tasks[i];
            if ( task._id === newTask._id )
            {
                // Overwriting object . . .
                this.sProject.tasks[i] = angular.extend({ }, newTask);
                // aliasing reference . . .
                sTask = this.sProject.tasks[i];
                console.log(" [ ProjectServ ] ok, task updated!");
                return;
            }
        }

        console.log(" [ ProjectServ ] Warning: task not found: proceeding with a new insert . . .");
        var task = angular.extend( { }, newTask );
        if ( this.sProject.tasks === undefined || this.sProject.tasks == null )
            this.sProject.tasks = [ ];
        this.sProject.tasks.push( task );
        this.sTask = task;
    }

    /* ********************************************************************* */
    /*                             OTHER METHODS                             */
    /* ********************************************************************* */

    this.setSelectedProject = function ( projectId )
    {
        // Mantaining a backup copy of the project, to have simple rollback
        // behaviour...
        for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == projectId )
            {
                this.sProject = angular.extend( { }, this.projects[i] );
                if ( this.sProject.notes === undefined )
                    this.sProject.notes = [ ];
                if ( this.sProject.timeline === undefined )
                        this.sProject.timeline = [ ];
                if ( this.sProject.tasks === undefined )
                    this.sProject.tasks = [ ];

                console.log("Project selected!");
                return;
            }
        }
    };

    this.setSelectedTask = function ( task )
    {
        console.log ( " [ ProjectServ ] Setting selected task . . .");
        this.sTask = angular.extends( { }, task );
    }

});
