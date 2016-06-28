app.controller("loginCtrl", function ( $scope, $location, $cookies, $http ) {
    console.log(" [ loginCtrl ] Entering login controller . . .");

    var logged   = $scope.logged   = false;
    var username = $scope.username = "";
    var password = $scope.password = "";

    $scope.doLogin = function ( ) {
        console.log(" [ loginCtrl ] Trying login . . . ");
        var postDatas = { username: $scope.username, password: $scope.password };
        $http.post('doLogin', postDatas).then(
            function ( response )
            {
                console.log(" [ loginCtrl ] Ok!");
                $cookies.put("TTB_COOKIE", $scope.username);
                $scope.logged = true;
                $location.path("/dashboard");
            },
            function ( response )
            {
                console.log(" [ loginCtrl ] Ko!");
            }
        );
    };

});
