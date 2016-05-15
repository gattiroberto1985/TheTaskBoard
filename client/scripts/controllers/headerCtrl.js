/**
 * Angular controller for the header.
 * To be improved. . . 
 *
 */
app.controller("headerCtrl", function ( $scope, $location, projectServ ) {

    console.log(" [ AJS ] [ headerCtrl ] Entering header controller . . .");

    /**
     * Scope variables
     */
    //$scope.spId     = spId          = null;
    $scope.sProject = projectServ.sProject;

    //projectServ.sProject != null ? spId = projectServ.sProject.id : spId = null;

    $scope.appDetails = {
        title  : "TheTaskBoard",
        tagline: "App per la gestione minimale dei progetti!"
    };

    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };
});
