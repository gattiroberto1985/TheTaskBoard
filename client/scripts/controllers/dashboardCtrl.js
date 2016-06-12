/**
 * Angular controller for the dashboard page.
 *
 * It manages a project dashboard, with only the project headers, and a form
 * to create a new project.
 *
 */
app.controller("dashboardCtrl", function ( $scope, $filter, $location, projectServ ) {
    console.log(" [ AJS ] [ dashboardCtrl ] Entering dashboard controller . . .");

    /**
     * Scope variables
     */
    $scope.newProject        = null                ; // contains a new project
    $scope.owners            = projectServ.owners  ; // contains the owners
    $scope.statuses          = projectServ.statuses; // contains the statuses
    $scope.sProject          = null                ; // selected project
    $scope.timelineSortField = 'date'              ; // sort field for the date
    $scope.timelineSortSense = false               ; // flag for the sort order
    $scope.projects          = projectServ.projects;
    // Calling getProjects() from the service, and valorizing the local
    // projects variable . . .
    projectServ.getProjects();/*.then(
        // onsuccess . . .
        function ( response ) {
            console.log( " [ dashboardCtrl ] Response retreived from the promise: " + JSON.stringify( response ) );
            setProjects(response);
        },
        // onerror . . .
        function ( response ) {
            console.log ( "ERROR: unable to retreive the projects!");
            if ( response.status == -1 )
                alert ( "ERROR: unable to get the projects: the server may be down . . .");
        });*/

    /* ******************************************************************** */
    /*                              CALLBACKS                               */
    /* ******************************************************************** */

    /**
     * Hidden callback to handle the local scope projects variable.
     */
    function setProjects( response )
    {
        console.log("Project retreived: '" + response.data.length + "'");
        $scope.projects = projectServ.projects = response.data;
    }
    
    /* ******************************************************************** */
    /*                        VIEW MANAGER FUNCTION                         */
    /* ******************************************************************** */

    /**
     * This function opens the header of the project in the view.
     *
     * @param project the project to open
     */
    $scope.openProject = function ( project ) {
        console.log(" [ dashboardCtrl ] Opening project . . .");
        projectServ.setSelectedProject( project/*._id */);
        $scope.sProject = angular.extend({ }, project);
        console.log(" [ dashboardCtrl ] Redirecting to 'project/" + project._id + "' . . . ");
        $location.path("project/" + project._id );
    };

    /**
     * Remove method for the project.
     *
     * @param projectId the _id of the project to remove.
     */
    $scope.removeProject = function ( projectId ) {
        projectServ.removeProject ( projectId );
        $scope.sProject = projectServ.sProject = null;
    };

    /**
     * The method refresh the project list in the dashboard.
     */
    $scope.refreshProjects = function ( ) {
        console.log("Refreshing projects in the dashboard . . .");
        projectServ.getProjects().then( function ( response ) {
            setProjects(response);
        });
    };

    /**
     * The method add a project in the store.
     */
    $scope.addProject = function ( ) {
        var project = angular.extend( { }, $scope.newProject );
        projectServ.createProject ( project );
        $scope.projects.push( project );
        $scope.newProject = null;
    };

    /**
     * Resets the fields of the new project view.
     */
    $scope.resetFields = function ( ) {
        console.log(" [ dashboardCtrl ] Resetting new project fields . . .");
        $scope.newProject = null;
    };

});
