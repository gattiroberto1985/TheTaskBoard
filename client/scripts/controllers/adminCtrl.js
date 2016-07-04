/**
 * Angular controller for the dashboard page.
 *
 * It manages a project dashboard, with only the project headers, and a form
 * to create a new project.
 *
 */
app.controller("adminCtrl", function ( $scope, $location, projectServ ) {
    console.log(" [ adminCtrl ] Entering admin controller . . .");

    $scope.projects = [ ];

    $scope.exportProjects = function ( ) {
        $scope.projects = projectServ.projects;
    };

    $scope.printProject = function ( project ) {
        return JSON.stringify( project );
    };

});
