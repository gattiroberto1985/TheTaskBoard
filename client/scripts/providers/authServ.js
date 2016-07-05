app.service("authServ", function ( $window, $q, $http, TTB_API_ENDPOINT, LOCAL_IDB_SESSION) {

    var LOCAL_TOKEN_KEY = "TTB_AUTH_TOKEN";
    var isAuthenticated = false;
    var authToken;

    function loadUserToken() {
        var token = $window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if ( token )
            setUserToken( token );
    };

    function saveUserToken(token) {
        $window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    };

    function setUserToken(token) {
        isAuthenticated = true;
        authToken       = token;
        $http.defaults.headers.common.Authorization = authToken;
    };

    function unsetUserToken() {
        isAuthenticated = false;
        authToken       = undefined;
        $http.defaults.headers.common.Authorization = undefined;
        $window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    };

    var register = function( user ) {
        return $q(
            function( resolve, reject ) {
                $http.post(TTB_API_ENDPOINT.url + "/register", user).then(
                    function( result )
                    {
                        if ( result.data.success )
                            resolve( result.data.msg );
                        else
                            reject( result.data.msg)
                    }
                ); // closing then
            } // closing $q function
        ); // closing $q
    }; // closing register function

    var login = function ( user ) {
        return $q(
            function ( resolve, reject ) {
                $http.post(TTB_API_ENDPOINT.url + "/login", user).then(
                    function ( result )
                    {
                        if ( result.data.success )
                        {
                            setUserToken( result.data.token );
                            resolve( result.data.msg );
                        }
                        else
                            reject ( result.data.msg );
                    },
                    function ( result )
                    {
                        console.log(" [ authServ ] Authentication failed!");
                        reject ( result.data.msg );
                    }
                );
            } // closing $q function
        ); // closing $q
    }; // closing login function

    var noLogin = function ( ) {

        return $q(
            function ( resolve, reject ) {
                $http.get("/client").then(
                    function ( result )
                    {
                        setUserToken( LOCAL_IDB_SESSION.value );
                        resolve( " [ authServ ] Using local idb session . . .");
                    },
                    function ( result )
                    {
                        console.log(" [ authServ ] ERROR: application must run in a server with endpoint '/client'!");
                        reject ( result );
                    }
                );
            }
        );
    };

    var logout = function ( ) {
        unsetUserToken();
    };

    // FOLLOWING CODE IS ALWAYS EXECUTED
    console.log(" [ authServ ] Loading user token, if any . . . ");
    loadUserToken();

    return {
        login   : login,
        noLogin : noLogin,
        register: register,
        logout  : logout,
        isAuthenticated: function ( ) { return isAuthenticated ; },
        isLocal : function ( ) { return authToken === LOCAL_IDB_SESSION.value }
    };

});

app.run( function( $rootScope, authServ, $location ) {
    $rootScope.$on('$locationChangeStart', function (event, next, nextParams, fromState) {
        if ( !authServ.isAuthenticated() )
        {
            console.log(" [ locationChangeStart @ rootScope ] User not authorized, backing to login page . . . ");
            $location.path("login");
        }
    });
});
