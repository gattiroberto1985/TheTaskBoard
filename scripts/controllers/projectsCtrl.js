app.controller("projectsCtrl", function ( $scope ) {
    console.log(" [ AJS ] [ projectsCtrl ] Entering projects controller . . .");

    // Contains a new project
    var newProject      = $scope.newProject      = null;
    // Contains the original project
    var originalProject = $scope.originalProject = null;
    // Contains the edit to the project
    var editedProject   = $scope.editedProject   = null;
    /**
     * TODO: This datas must be retreived from a database layer!
     */
    var owners = $scope.owners = [
        { id: "unknown"        , value: "Non Assegnato!" },
        { id: "roberto.gatti"  , value: "Roberto"        },
        { id: "stefano.moretto", value: "Stefano M."     },
        { id: "s.fiorini"      , value: "Stefano F."     }
    ];

    // TODO: this datas MUST be retrieved from a database layer!
    var projects = $scope.projects = [
        {
            id: 1,
            title: "Progetto 1",
            description: "Descrizione progetto 1",
            status: "Aperto",
            owner: owners[1]
        },
        {
            id: 2,
            title: "Progetto 2",
            description: "Descrizione progetto 2",
            status: "In Lavorazione",
            owner: owners[1]
        },
        {
            id: 3,
            title: "Progetto 3",
            description: "Descrizione progetto 3",
            status: "Chiuso",
            owner: owners[3]
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

        projects.push( $scope.newProject );
        newProject = $scope.newProject = null;
    };

    /**
     *
     */
    $scope.removeProject = function ( project ) {
        console.log(" [ AJS ] [ projectsCtrl ] deleting project . . . ");
        var index = projects.indexOf( project );
        console.log( " index of project: " + index );
        projects.splice(index , 1 );
    };

    /**
     *
     */
    $scope.editProject = function ( project ) {
        // Backupping old project
        $scope.originalProject = angular.extend( { }, project );
        $scope.editedProject   = project;
    };

    /**
     *
     */
    $scope.rollbackProject = function ( project ) {
        console.log( " ROLLBACKING PROJECT ...");
        projects[projects.indexOf(project)] = $scope.originalProject;
        $scope.editedProject = null;
        $scope.originalProject = null;
        $scope.reverted = true;
    };

    /**
     *
     */
    $scope.updateProject = function ( project ) {
        // Checking project fields ...
        /*store['put'](project)
            .then(function success() {}, function error() {
                project = $scope.originalProject;
            })
            .finally(function () {
                $scope.editedProject = null;
            });*/
            console.log("Updating project . . .");
            $scope.originalProject = null;
            $scope.editedProject = null;
    };

});
