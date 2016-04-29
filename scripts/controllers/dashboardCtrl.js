app.controller("dashboardCtrl", function ( $scope, $filter, $location, projectServ ) {
    console.log(" [ AJS ] [ dashboardCtrl ] Entering dashboard controller . . .");

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
        console.log(" [ AJS ] [ dashboardCtrl ] Opening project . . .");
        projectServ.setSelectedProject( project.id );
        $scope.sProject = angular.extend({ }, project);
        console.log(" [ AJS ] [ dashboardCtrl ] Redirecting to 'project/" + project.id + "/tasks' . . . ");
        $location.path("project/" + project.id );
    };

    /**
     *
     */
    $scope.removeProject = function ( projectId ) {
        projectServ.removeProject ( projectId );
        $scope.sProject = projectServ.sProject = null;
    };

});
