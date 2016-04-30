app.controller("tasksCtrl", function ( $scope, $location, projectServ ) {
    console.log(" [ AJS ] [ tasksCtrl ] Entering tasks controller . . .");

    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        console.log(" [ AJS ] [ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
        return;
    }

        $scope.tasks = projectServ.sProject.tasks;
        $scope.owners = projectServ.owners;
        $scope.statuses = projectServ.statuses;

        $scope.editedTask = null;

        /*$scope.openedTaskNumber = 0;
        $scope.closedTaskNumber = 0;
        $scope.pausedTaskNumber = 0;
        $scope.workingTaskNumber = 0;*/

        /**
         * Updating task
         */
        $scope.saveTask = function ( ) {
            console.log("Requesting task update . . .");
            projectServ.updateTask( $scope.editedTask );
        };

        /**
         * Managing task selection
         */
        $scope.setEditedTask = function ( task ) {

            // if editedTask is not null . . .
            if ( $scope.editedTask != null && projectServ.sTask != null )
            {
                // checking if the editedTask is different from the original . . .
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
            console.log("Changing selected task . . .");
            if ( task == null )
            {
                console.log(" .. creating new task . . .");
                task = { };
            }

            projectServ.sTask = task;
            $scope.editedTask = angular.extend( { }, task );

        };

});
