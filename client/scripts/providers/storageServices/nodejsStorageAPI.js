/**
 * Storage API for the Node JS server.
 */
app.service('nodejsStorageAPI', function ( $http,  TTB_API_REMOTE_ENDPOINT ) {


    /* ********************************************************************* */
    /*                             REST HANDLERS                             */
    /* ********************************************************************* */

    /**
     * Success REST Http request handler.
     *
     * @param response REST http response.
     */
    this.onSuccess = function ( response )
    {
        console.log( "Rest call correctly consumed! Request code: " + response.status + ".");
    }

    /**
     * Error REST Http request handler.
     *
     * @param response REST http response.
     */
    this.onError   = function ( response )
    {
        console.log( "ERROR: rest call in error: " + response.status );
        alert ( "ERROR: REST call failed: " + response.status);
    }


    this.addProject = function ( project ) {
        $http.post(TTB_API_REMOTE_ENDPOINT.url + "/projects", project ).then (
            // Success callback . . .
            this.onSuccess,
            // . . . and error callback!
            this.onError
        );
    };

    this.deleteProject = function ( projectId ) {
        $http.delete(TTB_API_REMOTE_ENDPOINT.url + "/projects/" + projectId).then (
            // Success callback . . .
            this.onSuccess, //function ( response ) { alert("Project deleted on server!"); console.log(response.data + " -- " + response.status )},
            // Error callback
            this.onError //function ( response ) { alert("ERROR: unable to delete project :( !");  console.log(response.data + " -- " + response.status )}
        );

    };

    this.updateProject = function ( project ) {
        $http.put(TTB_API_REMOTE_ENDPOINT.url + "/projects/" + project._id, project).then (
            // Success callback . . .
            this.onSuccess, //function ( response ) { alert("Project updated on server!"); console.log(response.data + " -- " + response.status )},
            // Error callback
            this.onError //function ( response ) { alert("ERROR: unable to update project :( !");  console.log(response.data + " -- " + response.status )}
        );
    };

    this.getProjects = function ( ) {
        console.log ( " [ nodejsStorageAPI ] Retreiving projects . . . ");
        return $http.get(TTB_API_REMOTE_ENDPOINT.url + "/projects");
    };

});
