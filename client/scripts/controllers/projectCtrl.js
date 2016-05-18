/**
 * Angular controller for the project view.
 *
 * It manages the operations allowed on a project, using the project service as
 * API to finalize the changes.
 *
 */
app.controller("projectCtrl", function ( $scope, $location, projectServ ) {

    // As usual, check if a project is selected . . .
    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        // . . . otherwise i come back to the dashboard!
        console.log("[ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
    }

    console.log("[ projectCtrl ] Entering projects controller . . .");

    /**
     * Scope variables.
     */
                                        // selected project
    $scope.sProject          = angular.extend( { }, projectServ.sProject );
    $scope.newNote           = { }                 ; // new project note
    $scope.owners            = projectServ.owners  ; // Owners (local alias)
    $scope.statuses          = projectServ.statuses; // Statuses (local alias)
    $scope.openedTaskNumber  = 0                   ; // Opened task counter
    $scope.closedTaskNumber  = 0                   ; // Closed task counter
    $scope.pausedTaskNumber  = 0                   ; // Paused task counter
    $scope.workingTaskNumber = 0                   ; // Working task counter

    /**
     * Local variables and alias.
     */
    var sProject = $scope.sProject;
    var newNote  = $scope.newNote;

    // Setting selected task
    if ( sProject.tasks != undefined && sProject.tasks != null )
    {
        for ( var i = 0; i < sProject.tasks.length; i++)
        {
            if ( _equals(sProject.tasks[i].status, $scope.statuses[0] ) ) $scope.openedTaskNumber++;
            if ( _equals(sProject.tasks[i].status, $scope.statuses[1] ) ) $scope.workingTaskNumber++;
            if ( _equals(sProject.tasks[i].status, $scope.statuses[2] ) ) $scope.pausedTaskNumber++;
            if ( _equals(sProject.tasks[i].status, $scope.statuses[3] ) ) $scope.closedTaskNumber++;
        }
    }
    // Setting timeline and notes
    if ( sProject.notes    === undefined ) sProject.notes    = [ ] ;
    if ( sProject.timeline === undefined ) sProject.timeline = [ ] ;

    /**
     * This function redirect to the tasks page.
     * @deprecated
     */
    /*$scope.openProjectTasks = function ( project ) {
        if ( project == null )
        {
            console.log(" No project to open!");
            return;
        }
        console.log("[ dashboardCtrl ] Redirecting to 'project/" + project.id + "/tasks' . . . ");
        $location.path("project/" + project.id + "/tasks" );
    };*/

    /**
     * This function close the project view. If the project has not been saved
     * the changes are lost!
     */
    /*$scope.closeProject = function ( ) {
        console.log("Closing project");
        sProject = sProject = null;
        $location.path("/dashboard");
    };*/

    /**
     * This function rollbacks all changes made to the original task.
     */
    $scope.rollbackProject = function( ) {
        console.log("Rollbacking changes . . .");
        sProject          = angular.extend({ }, projectServ.sProject);
        sProject.notes    = [ ];
        sProject.timeline = [ ];

        // Copying notes . . .
        for (var i = 0; i < projectServ.sProject.notes.length; i++) {
            var note =  angular.extend( { }, projectServ.sProject.notes[i]);
            sProject.notes.push(angular.extend( { }, note ));
        }
        // Copying timeline . . .
        for (var i = 0; i < projectServ.sProject.timeline.length; i++) {
            var timestep =  projectServ.sProject.timeline[i];
            sProject.timeline.push(angular.extend( { }, timestep ));
        }
    };

    /**
     * Adds a note to the project. No params are necessary, as the new note
     * is a scope variable.
     */
    $scope.addProjectNote = function ( /* new note is in scope . . . */ ) {
        if ( $scope.newNote.text.trim() == null )
        {
            console.log("Insert a non null text!");
            return;
        }
        console.log("[ dashboardCtrl ] Adding note to project . . . ");
        $scope.newNote.date = new Date();
        $scope.newNote.title = $scope.newNote.text.substring(10);

        if ( sProject.notes === undefined )
            sProject.notes = [ ];

        sProject.notes.push(angular.extend( { }, $scope.newNote) );
        $scope.newNote = { };
    };

    /**
     * Update a project (by calling the project service).
     *
     * @param updatedProject the old project with the new data (shares same _id).
     */
    $scope.updateProject = function ( updatedProject ) {
        console.log("[ dashboardCtrl ] Trying to save the project . . .");
        projectServ.saveProject( updatedProject );
    };

    /**
     * Remove a project (by calling the project service).
     *
     * @param projectId the _id of the project to remove.
     */
    $scope.removeProject = function ( projectId ) {
        projectServ.removeProject ( projectId );
        sProject = projectServ.sProject = null;
    };
});
