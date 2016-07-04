app.service("authServ", function ( $window, $q, $http, TTB_API_ENDPOINT) {

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
                    }
                );
            } // closing $q function
        ); // closing $q
    }; // closing login function

    var logout = function ( ) {
        unsetUserToken();
    };

    // FOLLOWING CODE IS ALWAYS EXECUTED
    console.log(" [ authServ ] Loading user token, if any . . . ");
    loadUserToken();

    return {
        login   : login,
        register: register,
        logout  : logout,
        isAuthenticated: function ( ) { return isAuthenticated ; }
    };

});
