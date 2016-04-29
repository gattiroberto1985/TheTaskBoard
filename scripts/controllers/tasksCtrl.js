app.controller("tasksCtrl", function ( $scope, $location, projectServ ) {
    console.log(" [ AJS ] [ tasksCtrl ] Entering tasks controller . . .");

    if ( projectServ.sProject === undefined || projectServ.sProject == null )
    {
        console.log(" [ AJS ] [ projectCtrl ] No project selected! Redirecting to dashboard . . .");
        $location.path("dashboard" );
        return;
    }

        $scope.tasks = projectServ.sProject.tasks;

        $scope.sTask = pro
});
