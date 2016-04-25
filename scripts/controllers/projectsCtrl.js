app.controller("projectsCtrl", function ( $scope, $filter, $location ) {
    console.log(" [ AJS ] [ projectsCtrl ] Entering projects controller . . .");

    var timelineSortField   = $scope.timelineSortField = 'date';
    var timelineSortSense   = $scope.timelineSortSense = false;

    // Contains a new project
    var newProject      = $scope.newProject      = null;

    // It represents the selected project. A backup copy is provided via
    // id of the project in the $scope.projects array.
    var sProject        = $scope.sProject        = null;
    var originalProject = null;

    var newNote         = $scope.newNote         = null;

    // Contains the original project
    //var originalProject = $scope.originalProject = null;
    // Contains the edit to the project
    //var editedProject   = $scope.editedProject   = null;
    /**
     * TODO: This datas must be retreived from a database layer!
     */
    var owners = $scope.owners = [
        { id: "unknown"        , value: "Non Assegnato!" },
        { id: "roberto.gatti"  , value: "Roberto"        },
        { id: "stefano.moretto", value: "Stefano M."     },
        { id: "s.fiorini"      , value: "Stefano F."     }
    ];

    /**
     * TODO: This datas must be retreived from a database layer!
     */
    var statuses = $scope.statuses = [
        { id: 0, value: "Aperto"         },
        { id: 1, value: "In Lavorazione" },
        { id: 2, value: "In Pausa"       },
        { id: 3, value: "Chiuso"         }
    ];

    // TODO: this datas MUST be retrieved from a database layer!
    var projects = $scope.projects = [
        {
            id: getUid(),
            title: "Progetto 1",
            description: "Descrizione progetto 1",
            status: statuses[0],
            owner: owners[1],

        },
        {
            id: getUid(),
            title: "Progetto 2",
            description: "Descrizione progetto 2",
            status: statuses[1],
            owner: owners[1]
        },
        {
            id: getUid(),
            title: "Progetto 3",
            description: "Descrizione progetto 3",
            status: statuses[2],
            owner: owners[3],
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
                    owner: owners[1],
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

    /**
     * The method add a project in the store.
     */
    $scope.addProject = function ( ) {
        // Calling API for inserting project and cleaning newProject var
        console.log( " [ AJS ] [ projectsCtrl ] cleaning objects . . . ");

        if ( $scope.newProject.status == null )
            $scope.newProject.status = "Aperto";

        if ( $scope.newProject.owner == null )
            $scope.newProject.owner = owners[0];

        $scope.newProject.dateOpen = $scope.newProject.dateLastUpdated = new Date();
        $scope.newProject.dateClose = null;

        $scope.newProject.id = getUid();

        projects.push( $scope.newProject );
        newProject = $scope.newProject = null;
    };

    /* ********************************************************************
     *                    VIEW MANAGER FUNCTION
     * ******************************************************************** */

    /**
     * This function opens the header of the project in the view.
     */
    $scope.openProject = function ( project ) {
        console.log(" [ AJS ] [ projectsCtrl ] Opening project . . .");
        originalProject = angular.extend({ }, project);
        $scope.sProject = angular.extend({ }, project);

    };

    /**
     * This function redirect to the tasks page.
     */
    $scope.openProjectTasks = function ( project ) {
        if ( project == null )
        {
            console.log(" No project to open!");
            return;
        }
        console.log(" [ AJS ] [ projectsCtrl ] Redirecting to 'project/" + project.id + "/tasks' . . . ");
        $location.path("project/" + project.id + "/tasks" );
    };

    /**
     * This function close the project view. If the project has not been saved
     * the changes are lost!
     */
    $scope.closeProject = function ( ) {
        console.log("Closing project");
        $scope.sProject = null;
        originalProject = null;
    };

    /**
     * This function rollbacks all changes made to the original task.
     */
    $scope.rollbackProject = function( ) {
        console.log("Rollbacking changes . . .");
        $scope.sProject          = angular.extend({ }, originalProject);
        $scope.sProject.notes    = [ ];
        $scope.sProject.timeline = [ ];
        // Copying notes . . .
        for (var i = 0; i < originalProject.notes.length; i++) {
            var note =  originalProject.notes[i];
            $scope.sProject.notes.push(angular.extend( { }, note ));
        }
        // Copying timeline . . .
        for (var i = 0; i < originalProject.timeline.length; i++) {
            var timestep =  originalProject.timeline[i];
            $scope.sProject.timeline.push(angular.extend( { }, timestep ));
        }
    };

    /**
     *
     */
    $scope.removeProject = function ( projectId ) {
        console.log(" [ AJS ] [ projectsCtrl ] deleting project with id '" + projectId + "'. . . ");
        var i = 0;
        for ( i = 0; i < projects.length; i++ )
        {
            if ( projects[i].id == projectId )
            {
                projects.splice(i, 1 );
                break;
            }
        }
        $scope.sProject = originalProject = null;
        console.log( "Removed project at index '" + i + "'");
    };


    $scope.addProjectNote = function ( note ) {
        if ( note.text.trim() == null )
        {
            console.log("Insert a non null text!");
            return;
        }

        console.log(" [ AJS ] [ projectsCtrl ] Adding note to project . . . ");
        $scope.newNote.date = new Date();
        $scope.newNote.title = note.text.substring(10);

        $scope.sProject.notes.push($scope.newNote);
        $scope.newNote = newNote = null;
    };

    /**
     *
     */
    /*$scope.editProject = function ( project ) {
        // Backupping old project
        $scope.originalProject = angular.extend( { }, project );
        $scope.editedProject   = project;
    };*/

    /**
     *
     */
    /*$scope.rollbackProject = function ( project ) {
        console.log( " ROLLBACKING PROJECT ...");
        projects[projects.indexOf(project)] = $scope.originalProject;
        $scope.editedProject = null;
        $scope.originalProject = null;
        $scope.reverted = true;
    };*/

    /**
     *
     */
    /*$scope.updateProject = function ( project ) {
        // Checking project fields ...
        store['put'](project)
            .then(function success() {}, function error() {
                project = $scope.originalProject;
            })
            .finally(function () {
                $scope.editedProject = null;
            });
            console.log("Updating project . . .");
            $scope.originalProject = null;
            $scope.editedProject = null;
    };*/

});
