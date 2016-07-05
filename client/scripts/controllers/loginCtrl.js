
app.controller("loginCtrl", function($scope, authServ, $location ) {

    console.log( " [ loginCtrl ] Entering login controller . . .");

    $scope.user = {
        username : undefined,
        password : undefined,
        firstname: undefined,
        lastname : undefined
    };


    $scope.login = function ( ) {
        console.log(" [ loginCtrl ] Trying to login user . . . ");
        authServ.login( $scope.user ).then (
            // on success
            function ( message ) {
                $location.path("dashboard");
            },
            // onerror
            function ( message ) {
                alert("Login failed: " + message );
            });
    };

    $scope.noLogin = function ( ) {
        var proceed = confirm(" WARNING: without user, you won't be able to share data between devices. All the informations " +
                "will be stored in local IndexedDB. Proceeding?");
        if ( proceed )
        {
            console.log( " [ loginCtrl ] Using TheTaskBoard without login!");
            console.log( " [ loginCtrl ] All datas will be managed in local IndexedDB database");
            authServ.noLogin( ).then(
                function ( result ) {
                    $location.path("dashboard");
                },
                function ( result ) {
                    alert("ERROR: an error has occurred! Inner message is '"+ result + "'" );
                }
            );
        }

    };

});
/*
.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})
*/
