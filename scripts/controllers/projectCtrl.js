app.controller("projectCtrl", function ( $scope, $location, projectServ ) {
    console.log(" [ AJS ] [ projectCtrl ] Entering projects controller . . .");

    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        console.log(" [ AJS ] [ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
    }

    $scope.sProject = sProject = angular.extend( { }, projectServ.sProject );

    $scope.newNote  = newNote  = null;

    $scope.owners   = projectServ.owners;
    $scope.statuses = projectServ.statuses;

    if ( sProject.notes    === undefined ) sProject.notes    = [ ] ;
    if ( sProject.timeline === undefined ) sProject.timeline = [ ] ;

    /**
     * This function redirect to the tasks page.
     */
    $scope.openProjectTasks = function ( project ) {
        if ( project == null )
        {
            console.log(" No project to open!");
            return;
        }
        console.log(" [ AJS ] [ dashboardCtrl ] Redirecting to 'project/" + project.id + "/tasks' . . . ");
        $location.path("project/" + project.id + "/tasks" );
    };

    /**
     * This function close the project view. If the project has not been saved
     * the changes are lost!
     */
    $scope.closeProject = function ( ) {
        console.log("Closing project");
        sProject = sProject = null;
    };

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

    $scope.addProjectNote = function ( /* new note is in scope . . . */ ) {
        if ( $scope.newNote.text.trim() == null )
        {
            console.log("Insert a non null text!");
            return;
        }
        console.log(" [ AJS ] [ dashboardCtrl ] Adding note to project . . . ");
        $scope.newNote.date = new Date();
        $scope.newNote.title = $scope.newNote.text.substring(10);

        if ( sProject.notes === undefined )
            sProject.notes = [ ];

        sProject.notes.push($scope.newNote);
        $scope.newNote = null;
    };

    /**
     *
     */
    $scope.updateProject = function ( updatedProject ) {
        console.log(" [ AJS ] [ dashboardCtrl ] Trying to save the project . . .");
        projectServ.saveProject( updatedProject );
    };

    /**
     *
     */
    $scope.removeProject = function ( projectId ) {
        projectServ.removeProject ( projectId );
        sProject = projectServ.sProject = null;
    };
});
