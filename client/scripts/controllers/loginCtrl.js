
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
