app.controller("headerCtrl", function ( $scope, $location, projectServ ) {

    console.log(" [ AJS ] [ headerCtrl ] Entering header controller . . .");

    $scope.spId = spId = null;

    projectServ.sProject != null ? spId = projectServ.sProject.id : spId = null;

    $scope.appDetails = {
        title  : "TheTaskBoard",
        tagline: "App per la gestione minimale dei progetti!"
    };

    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };
});
