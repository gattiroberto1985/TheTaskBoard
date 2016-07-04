app.factory("authInterceptor", function ( $rootScope, $q, AUTH_EVENTS ) {
    return {
        responseError: function ( response ) {
            $rootScope.$broadcast( { 401: AUTH_EVENTS.notAuthenticated }[ response.status ], response);
            return $q.reject( response );
        } // closing responseError
    }; // closing json return
}); // closing factory

// Registering authInterceptor as interceptors . . .
app.config( function ( $httpProvider ) {
    $httpProvider.interceptors.push( "authInterceptor");
});
