/**
 * Angular controller for the project view.
 *
 * It manages the operations allowed on a project, using the project service as
 * API to finalize the changes.
 *
 */
app.controller("projectCtrl", function ( $scope, $location, $cookies, projectServ ) {

    var logged = $cookies.get("TTB_COOKIE");
    if ( logged === undefined || logged == null || logged == "" )
    {
        console.log("No user logged, redirect to login page . . .");
        $location.path("/login");
    }

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
     */
    $scope.updateProject = function ( /* updatedProject */ ) {
        console.log("[ dashboardCtrl ] Trying to save the project . . .");
        // If project state is different from the source . . .
        if ( sProject.status != projectServ.status )
        {
            // . . . if status note is empty or not changed wrt the old one . . .
            if ( _isNullOrEmpty ( sProject.statusNote ) || sProject.statusNote == projectServ.sProject.statusNote )
            {
                // . . . throwing error . . .
                alert ( "WARNING: inserire o modificare la nota per il cambio di stato!");
                return;
            }
            // . . . adding timeline step . . .
            $scope.addProjectTimelineStep();
        }
        // . . . otherwise if note is not null and is different from the old one . . .
        else if (  ( ! _isNullOrEmpty ( sProject.statusNote ) ) && sProject.statusNote != projectServ.sProject.statusNote  )
        {
            // . . . adding timeline step . . .
            $scope.addProjectTimelineStep();
        }
        // . . . then save the project!
        projectServ.saveProject( sProject );
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

    /**
     * Adds a status note in the timeline.
     */
    $scope.addProjectTimelineStep = function ( ) {
        console.log(" [ projectCtrl ] Adding timeline step . . . ");
        var timestamp = new Date();
        var status = sProject.status.value;
        var text = sProject.statusNote;

        sProject.timeline.push( { "date": timestamp, "status": status, "note": text } );

    };

    $scope.openTasks = function ( ) {
        console.log ( " [ projectCtrl ] Opening tasks . . . ");
        $location.path("project/" + sProject._id + "/tasks" );
    };

    $scope.back = function ( ) {
        console.log( " [ projectCtrl ] Backing to dashboard . . .");
        $location.path("dashboard" );
    };

});
