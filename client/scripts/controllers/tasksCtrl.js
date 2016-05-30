/**
 * Controller for the task view.
 *
 * It manages the task view, by retreiving the task from the project and exposing
 * method to manage the save/update or the change of the selected task.
 *
 */
app.controller("tasksCtrl", function ( $scope, $location, projectServ/*, modals */) {

    // First of all, check if a project is selected . . .
    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        // . . . otherwise i come back to dashboard view!
        console.log(" [ AJS ] [ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
        return;
    }

    console.log(" [ AJS ] [ tasksCtrl ] Entering tasks controller . . .");

    if ( projectServ.sProject.tasks === undefined || projectServ.sProject.tasks == null )
        projectServ.sProject.tasks = [ ];

    $scope.sProject = projectServ.sProject;

    /**
     * Scope variables
     */
    // HACK: task are copies of the original!
     // $scope.tasks      = projectServ.sProject.tasks; // Tasks of the project
    $scope.tasks = [ ];
    for ( var i = 0; i < projectServ.sProject.tasks.length; i++ )
        $scope.tasks.push ( angular.extend ( { }, projectServ.sProject.tasks[ i ] ) ) ;
    $scope.owners     = projectServ.owners        ; // Owners (local alias)
    $scope.statuses   = projectServ.statuses      ; // Statuses (local alias)
    $scope.editedTask = null                      ; // edited task

    /**
     * The method save a new task/update an old one into the project, by
     * using the project service.
     *
     * @param task The task to update
     */
    $scope.saveTask = function ( task ) {
        console.log("Requesting task update for task with id '" + task._id + "' . . .");
        task.dateLastUpdated = new Date();
        projectServ.updateTask( task );
    };

    /**
     * Changing task selection.
     *
     * @param task the new task selected (null if a new task should be created).
     */
    $scope.setEditedTask = function ( task ) {

        // if editedTask and selected task are not null . . .
        if ( $scope.editedTask != null && projectServ.sTask != null )
        {
            // . . . i check if the editedTask is different from the original . . .
            if ( ! _equals( $scope.editedTask, projectServ.sTask ) )
            {
                // . . . if so, asking for save . . .
                console.log("Previous unsaved and edited task!");
                var answer = confirm("Hai apportato modifiche al task selezionato: vuoi salvarle?");
                if ( answer )
                    // . . . your wish is my desire!
                    $scope.saveTask();
            }
        }
        // Now, we can change the task . . .
        console.log("Changing selected task . . .");
        // . . . but if the task is null . . .
        if ( task == null )
        {
            // . . . we create a new task!
            console.log(" .. creating new task . . .");
            task = { };
            task._id = getUid();
        }

        // . . . then we can set the selected task . . .
        projectServ.sTask = task;
        // . . . and the local edited task
        $scope.editedTask = angular.extend( { }, task );

    };

    /**
     * Adds a status note to the task.
     *
     * @param task The task to update.
     */
    $scope.saveTaskStatusNote = function ( task )
    {
        console.log ( " [ taskCtrl ] Adding status note to the task . . .");
        if ( task.statusNote.trim() == null )
        {
            console.log("Insert a non null text!");
            return;
        }
        var timestep = {
            date: new Date(),
            status: task.status,
            note: task.statusNote
        };

        if ( task.timeline === undefined )
            task.timeline = [ ];

        task.timeline.push ( timestep );
        task.dateLastUpdated = new Date();
        //task.statusNote = "";
    };

    /**
     * Reset all the tasks in the project with the ones in this scope.
     */
    $scope.fullSave = function ( )
    {
        console.log( " [ taskCtrl ] Overwriting all tasks of project . . . ");
        // Overwrite any task in the project selected in the projectServ . . .
        projectServ.sProject.tasks = [ ];
        for ( var i = 0; i < $scope.tasks.length; i++ )
        {
            projectServ.sProject.tasks.push ( $scope.tasks[ i ] );
        }
    };

    /**
     * Adds a task to the list.
     */
    $scope.addTask = function ( ) {
        console.log(" [ taskCtrl ] Adding new task . . .");
        // unshift adds an element on the top
        $scope.tasks.unshift(
            {
                _id: getUid(),
                title: "Titolo nuovo task",
                description: "Descrizione task",
                dateOpened: new Date(),
                dateLastUpdated: new Date(),
                timeline: [ ] } );
    };

    /**
     * Removes a task frome the task array in the scope.
     *
     * @param taskId id of the task to delete.
     */
    $scope.removeTask = function ( taskId ) {
        console.log( " [ taskCtrl ] Deleting task from the project . . . ");
        for ( var i = 0; i < $scope.tasks.length; i++ )
        {
            if ( $scope.tasks[ i ]._id == taskId )
            {
                console.log ( " [ tasksCtrl ] removing task . . . ");
                $scope.tasks.splice ( i, 1 );
                break;
            }
        }
    };

    /**
     * Gets back to the project details.
     */
    $scope.back = function ( ) {
        console.log(" [ taskCtrl ] Backing to project details . . . ");
        $location.path("project/" + projectServ.sProject._id );
    };

    /**
     * Opening task to edit it!
     *
     * @param task The task to edit.
     */
    /*$scope.openTask = function ( task ) {

        console.log( " [ taskCtrl ] Opening task for editing . . . ");
        // The .open() method returns a promise that will be either
        // resolved or rejected when the modal window is closed.
        var promise = modals.open(
            "alert",
            task
        );

        promise.then(
            function handleResolve( response ) {
                console.log( "Alert resolved." );
            },
            function handleReject( error ) {
                console.warn( "Alert rejected!" );
            }
        );
    };*/

});
