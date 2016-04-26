app.service('projectServ', function ( ) {

    /**
     * TODO: This datas must be retreived from a database layer!
     */
    this.owners = [
        { id: "unknown"        , value: "Non Assegnato!" },
        { id: "roberto.gatti"  , value: "Roberto"        },
        { id: "stefano.moretto", value: "Stefano M."     },
        { id: "s.fiorini"      , value: "Stefano F."     }
    ];

    /**
     * TODO: This datas must be retreived from a database layer!
     */
    this.statuses = [
        { id: 0, value: "Aperto"         },
        { id: 1, value: "In Lavorazione" },
        { id: 2, value: "In Pausa"       },
        { id: 3, value: "Chiuso"         }
    ];

    // TODO: this datas MUST be retrieved from a database layer!
    this.projects = [
        {
            id: getUid(),
            title: "Progetto 1",
            description: "Descrizione progetto 1",
            status: this.statuses[0],
            owner: this.owners[1],

        },
        {
            id: getUid(),
            title: "Progetto 2",
            description: "Descrizione progetto 2",
            status: this.statuses[1],
            owner: this.owners[1]
        },
        {
            id: getUid(),
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
                    id: getUid(),
                    title: "Task 1",
                    description: "Descrizione Task 1",
                    status: "In Pausa",
                    owner: this.owners[1],
                    dateOpen: new Date(2016, 04, 04),
                    dateClose: null,
                    dateLastUpdated: new Date(2016, 04, 07),
                    statusNote: "",
                    notes: [
                        { date: new Date(2016, 04, 04, 12, 00), title: "titolo nota task 1", text: "testo nota task 1"}
                    ]
                }
            ]
        }
    ];

    this.selectedProjectId = null;
    this.sProject          = null;

    /* ********************************************************************* */
    /*                                CRUD METHODS                           */
    /* ********************************************************************* */

    this.createProject = function ( project )
    {
        // Calling API for inserting project and cleaning newProject var
        console.log( " [ AJS ] [ projectServ ] Creating project . . .");

        if ( project.status == null )
            project.status = "Aperto";

        if ( project.owner == null )
            project.owner = owners[0];

        project.dateOpen = project.dateLastUpdated = new Date();
        project.dateClose = null;

        project.id = getUid();

        this.projects.push( project );
        this.selectedProjectId = project.id;
        this.sProject = angular.extend( { }, project );
    };

    this.removeProject = function ( projectId )
    {
        console.log(" [ AJS ] [ projectServ ] deleting project with id '" + projectId + "'. . . ");
        var i = 0;
        for ( i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i].id == projectId )
            {
                this.projects.splice(i, 1 );
                break;
            }
        }
        console.log(" [ AJS ] [ projectServ ] Deleted project at index '" + i  + "' . . .");
    };

    /**
     * Starting from the id registered in the selectedProjectId field, an update
     * of the project is tried.
     */
    this.saveProject = function ( project )
    {
        console.log("Updating project . . .");
        for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i].id == project.id )
            {
                this.projects[i] = project;
                console.log("Project updated!");
                return;
            }
        }
        console.log(" ERROR: unable to find project to update with id: '" + project.id + "'");
    };

    /* ********************************************************************* */
    /*                             OTHER METHODS                             */
    /* ********************************************************************* */

    this.setSelectedProject = function ( project )
    {
        // Mantaining a backup copy of the project, to have simple rollback
        // behaviour...
        this.sProject = angular.extend( { }, project );
        if ( this.sProject.notes === undefined )
            this.sProject.notes = [ ];
        if ( this.sProject.timeline === undefined )
                this.sProject.timeline = [ ];

        console.log(" [ AJS ] [ projectServ ] selected project: '" + JSON.stringify(this.sProject) + "'");
    };

});
