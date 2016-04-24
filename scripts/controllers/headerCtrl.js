app.controller("headerCtrl", function ( $scope, $location ) {
    console.log(" [ AJS ] [ headerCtrl ] Entering header controller . . .");
    $scope.appDetails = {
        title  : "TheTaskBoard",
        tagline: "App per la gestione minimale dei progetti!"
    };

    $scope.menuClass = function(page) {
        var current = $location.path().substring(1);
        return page === current ? "active" : "";
    };
});
