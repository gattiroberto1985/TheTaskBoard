/**
 * Angular controller for the admin view.
 *
 */
app.controller("adminCtrl", function ( $scope, $location, $cookies, projectServ ) {

    console.log("[ adminCtrl ] Entering projects controller . . .");

    $scope.projects = "";

    $scope.exportProjects = function ( ) {
        console.log("[ adminCtrl ] Exporting project . . . ");
        // How can i retreive all the projects?? Assume we have a variable data with the
        // JSON of the whole set of projects . . .

        projectServ.getProjects().then(
        // onsuccess . . .
        function ( response ) {
            console.log( " [ adminCtrl ] Response retreived from the promise! "); // + JSON.stringify( response ) );
            var data = response;
            var filename = "ttb_projects.json";
            var dataJSONify = JSON.stringify( data );

            var blob = new Blob( [ dataJSONify ], { type: "text/json"} );

            // saving to file . . .
            var e = document.createEvent('MouseEvents');
            var a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window,
                        0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        });


    }; // closing exportProjects . . .

    $scope.importProjects = function( ) {
        console.log( " [ adminCtrl ] Importing projects . . . ");
        var jsonPrjs = [ ];
        try {
            var jsonPrjs = JSON.parse( $scope.projects );
            jsonPrjs.forEach( function ( jsonPrj ) {
                console.log(" [ adminCtrl ] Trying to insert project '" + JSON.stringify(jsonPrj) + "' . . .");
                projectServ.createProject( jsonPrj );
            });
        }
        catch (e)
        {
            console.log("***** ERROR: " + e);
            alert(e);
        } finally
        {

        }


    }
});
