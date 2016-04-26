app.controller("projectsCtrl", function ( $scope, $filter, $location, projectServ ) {
    console.log(" [ AJS ] [ projectsCtrl ] Entering projects controller . . .");

    var timelineSortField   = $scope.timelineSortField = 'date';
    var timelineSortSense   = $scope.timelineSortSense = false;

    // Contains a new project
    $scope.newProject      = null;

    $scope.projects = projectServ.projects;
    $scope.owners   = projectServ.owners;
    $scope.statuses = projectServ.statuses;
    
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
     * The method add a project in the store.
     */
    $scope.addProject = function ( ) {
        projectServ.createProject ( $scope.newProject );
        $scope.newProject = null;
    };

    /* ******************************************************************** */
    /*                        VIEW MANAGER FUNCTION                         */
    /* ******************************************************************** */

    /**
     * This function opens the header of the project in the view.
     */
    $scope.openProject = function ( project ) {
        console.log(" [ AJS ] [ projectsCtrl ] Opening project . . .");
        projectServ.setSelectedProject( project );
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
    };

    /**
     * This function rollbacks all changes made to the original task.
     */
    $scope.rollbackProject = function( ) {
        console.log("Rollbacking changes . . .");
        $scope.sProject          = angular.extend({ }, projectServ.sProject);
        $scope.sProject.notes    = [ ];
        $scope.sProject.timeline = [ ];
        // Copying notes . . .
        for (var i = 0; i < projectServ.sProject.notes.length; i++) {
            var note =  projectServ.sProject.notes[i];
            $scope.sProject.notes.push(angular.extend( { }, note ));
        }
        // Copying timeline . . .
        for (var i = 0; i < projectServ.sProject.timeline.length; i++) {
            var timestep =  projectServ.sProject.timeline[i];
            $scope.sProject.timeline.push(angular.extend( { }, timestep ));
        }
    };

    /**
     *
     */
    $scope.removeProject = function ( projectId ) {
        projectServ.removeProject ( projectId );
        $scope.sProject = projectServ.sProject = null;
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

        if ( $scope.sProject.notes === undefined )
            $scope.sProject.notes = [ ];

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
    $scope.updateProject = function ( updatedProject ) {
        console.log(" [ AJS ] [ projectsCtrl ] Trying to save the project . . .");
        projectServ.saveProject( updatedProject );
    };

});
