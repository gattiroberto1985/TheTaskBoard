/*
 * Service layer for the app. Some data are hard-coded (owners and statuses),
 * while the projects are retreived from an external source.
 *
 * The service exposes CRUD methods for the project (Create, Get, Update,
 * Delete) and some utilities variable for referencing the user selection.
 *
 */
app.service('projectServ', function ( $http, storageServ, $q, $injector, authServ ) {

    this.owners            = [ ];     // local array for storing the owners
    this.statuses          = [ ];     // local array for storing the statuses
    this.projects          = [ ];     // local array for storing the projects
    this.sProject          = null;    // Selected project
    this.sTask             = null;    // Selected project task

    /**
     * TODO: This datas must be retreived from a database layer!
     */
    this.owners = [
        { id: "unknown"        , value: "Non Assegnato!" },
        { id: "roberto.gatti"  , value: "Roberto"        },
        //{ id: "stefano.moretto", value: "Stefano M."     },
        { id: "s.fiorini"      , value: "Stefano F."     }
    ];

    /**
     * TODO: This datas must be retreived from a database layer!
     */
    this.statuses = [
        { id: 0, value: "Aperto"         },
        { id: 1, value: "In Lavorazione" },
        { id: 2, value: "In Pausa"       },
        { id: 3, value: "Chiuso"         }
    ];

    /* ********************************************************************* */
    /*                                CRUD METHODS                           */
    /* ********************************************************************* */

    //storageServ.checkAPI() ;

    /**
     * Gets all the project from the database layer.
     */
    this.getProjects = function ( )
    {
        var returnFunction;
        if ( authServ.isLocal() )
        {
            // Using local IndexedDB . . .
            returnFunction = function ( resolve, reject ) {
    			console.log ( " [ projectServ ] Getting datas from local IDB . . .");
                $http.get( "http://localhost:3000/client").then(
                    // on Success . . .
				    function ( response ) {
					    storageServ._storageServ = $injector.get("idbStorageAPI");
                        var promise = storageServ.getProjects(storageServ._storageServ );
                        promise.then (
                            function ( response ) {
                                var projects = response;
                                console.log(" [ projectServ ] Response data: " + projects );
                                resolve(  projects );
                            },
                            function ( response ) {
                                console.log(" [ projectServ ] Response error. ");
                            }
                        );
				    } // closing then function
			    ); // closing then
		    } // closing returnFunction
        } // closing auth.isLocal
        else
        {
            // Using remote server . . .
            returnFunction = function ( resolve, reject ) {
    			console.log ( " [ projectServ ] Getting datas from remote server . . .");
                $http.get ( "http://thetaskboard-bob1985.rhcloud.com/health" ).then(
                    // onSuccess
                    function ( response ) {
                        console.log ( " [ storageServ ] NodeJS server up&running! Using nodejs with mongoose . . . ");
                        storageServ._storageServ = $injector.get("nodejsStorageAPI");
                        return storageServ.getProjects(storageServ._storageServ).then(
                            function ( rresponse)
                            {
                                console.log( " Response OK! ");
                                 return rresponse.data;
                            },
                            function ( rreject )
                            {
                                console.log( " asdasd ");
                            }
                        );
                    });
            } // closing returnFunction
        } // closing else branch

        return $q(returnFunction);
    }; // closing getProjects

    this.setProjects = function( projects )
    {
        this.projects = [ ];
        for ( var i = 0; i++; i < projects.length )
            this.projects.push( projects [ i ] );
    }

    /**
     * Create method for a project.
     *
     * @param project the project to be created.
     */
    this.createProject = function ( project )
    {
        // Calling API for inserting project and cleaning newProject var
        console.log( " [ AJS ] [ projectServ ] Creating project . . .");

        if ( project.status == null )
            project.status = this.statuses[0];

        if ( project.owner == null )
            project.owner = this.owners[0];

        project.dateOpen = project.dateLastUpdated = new Date();
        project.dateClose = null;

        // Defining _id for the project . . .
        project._id = getUid();

        storageServ.addProject( project );

        //this.selectedProjectId = project._id;
        this.sProject = angular.extend( { }, project );
        if ( this.sProject.notes === undefined || this.sProject.notes == null )
            this.sProject.notes = [ ];
        if ( this.sProject.timeline === undefined || this.sProject.timeline == null )
            this.sProject.timeline = [ ];
        if ( this.sProject.tasks === undefined || this.sProject.tasks == null )
            this.sProject.tasks = [ ];
    };

    /**
     * Remove a project from the database layer.
     *
     * @param projectId the _id of the project to remove
     */
    this.removeProject = function ( projectId )
    {
        console.log(" [ AJS ] [ projectServ ] deleting project with id '" + projectId + "'. . . ");
        storageServ.removeProject( projectId );

        // Removing from the local array . . .
        for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == projectId )
            {
                this.projects.splice(i, 1 );
                break;
            }
        }
        console.log(" [ AJS ] [ projectServ ] Deleted project at index '" + i  + "' . . .");
    };

    /**
     * Update method.
     * @param project the new version of the project (shares the same _id with
     *                the old version)
     */
    this.saveProject = function ( project )
    {
        console.log("Updating project . . .");
        storageServ.updateProject ( project );
        // updating local array . . .
        for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == project._id )
            {
                this.projects[i] = project;
                console.log("Project updated!");
                return;
            }
        }
    };

    /**
     * Update task method.
     *
     * @param newTask the new task (shares same _id with the old version)
     */
    this.updateTask = function ( newTask )
    {
        console.log(" [ ProjectServ ] Updating task in project . . .");

        // Searching for the task in the array . . .
        for ( var i = 0; i < this.sProject.tasks.length ; i++ )
        {
            var task = this.sProject.tasks[i];
            if ( task._id === newTask._id )
            {
                // Overwriting object . . .
                console.log(" [ projectServ ] Task found: " + task._id );
                this.sProject.tasks[i] = angular.extend({ }, newTask);
                // aliasing reference . . .
                sTask = this.sProject.tasks[i];
                console.log(" [ ProjectServ ] ok, task updated!");
                return;
            }
        }

        // if not update, we have to insert a new task!
        console.log(" [ ProjectServ ] Warning: task not found: proceeding with a new insert . . .");
        var task = angular.extend( { }, newTask );
        if ( this.sProject.tasks === undefined || this.sProject.tasks == null )
            this.sProject.tasks = [ ];
        this.sProject.tasks.push( task );
        this.sTask = task;
    }

    /**
     * Removes a task.
     *
     * @param taskId The id of the task to remove.
     */
    this.removeTask = function ( taskId )
    {
        console.log ( " [ projectServ ] Removing task with id '" + taskid + "' . . . ");
        for ( var i = 0; i < this.sProject.tasks.length ; i++ )
        {
            if ( this.sProject.tasks[ i ]._id == taskId )
                this.sProject.tasks.splice( i, 1 ); // removing 1 element at index i
        }
    };

    /* ********************************************************************* */
    /*                             OTHER METHODS                             */
    /* ********************************************************************* */

    this.setSelectedProject = function ( project )
    {
        // Mantaining a backup copy of the project, to have simple rollback
        // behaviour...
        /*for ( var i = 0; i < this.projects.length; i++ )
        {
            if ( this.projects[i]._id == projectId )
            {*/
        this.sProject = angular.extend( { }, project );
        if ( this.sProject.notes === undefined )
            this.sProject.notes = [ ];
        if ( this.sProject.timeline === undefined )
                this.sProject.timeline = [ ];
        if ( this.sProject.tasks === undefined )
            this.sProject.tasks = [ ];

        console.log("Project selected!");
        return;
            /*}
        }*/
    };

    this.setSelectedTask = function ( task )
    {
        console.log ( " [ ProjectServ ] Setting selected task . . .");
        this.sTask = angular.extends( { }, task );
    }

});
