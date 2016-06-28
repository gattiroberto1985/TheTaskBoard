/**
 * AngularJS controller for the fast task component.
 */
app.controller( 'fasksCtrl', function ( $scope, $filter, $location, $cookies, projectServ ) {
    console.log(" [ fasksCtrl ] Work in progress . . . :) ");

    var logged = $cookies.get("TTB_COOKIE");
    if ( logged === undefined || logged == null || logged == "" )
    {
        console.log("No user logged, redirect to login page . . .");
        $location.path("/login");
    }

});
