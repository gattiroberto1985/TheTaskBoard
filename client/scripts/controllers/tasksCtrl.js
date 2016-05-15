/**
 * Controller for the task view.
 *
 * It manages the task view, by retreiving the task from the project and exposing
 * method to manage the save/update or the change of the selected task.
 *
 */
app.controller("tasksCtrl", function ( $scope, $location, projectServ ) {

    // First of all, check if a project is selected . . .
    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        // . . . otherwise i come back to dashboard view!
        console.log(" [ AJS ] [ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
        return;
    }

    console.log(" [ AJS ] [ tasksCtrl ] Entering tasks controller . . .");


    /**
     * Scope variables
     */
    $scope.tasks      = projectServ.sProject.tasks; // Tasks of the project
    $scope.owners     = projectServ.owners        ; // Owners (local alias)
    $scope.statuses   = projectServ.statuses      ; // Statuses (local alias)
    $scope.editedTask = null                      ; // edited task

    /**
     * The method save a new task/update an old one into the project, by
     * using the project service.
     */
    $scope.saveTask = function ( ) {
        console.log("Requesting task update . . .");
        projectServ.updateTask( $scope.editedTask );
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

});
