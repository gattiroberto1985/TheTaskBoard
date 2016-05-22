/**
 * Angular service for the correct data layer API to use.
 */
app.service('storageServ', function ($http, $injector) {
	'use strict';

	this._apiIDB          = false; // true if using local indexedDB
	this._apiLocalStorage = false; //
	this._apiNodeJS       = false;
	this._storageServ     = null;

    /* ********************************************************************* */
	/*                                API CHECKER                            */
	/* ********************************************************************* */

	/**
	 * Checking API ( NodeJS > IDB > localstorage ).
	 */
	this.checkAPI = function ( ) {
		console.log(" [ storageServ ] Checking API for storage . . .");
		this.checkNodeJSApi();
	};

	/**
	 * Check method for the nodeJS server.
	 */
	this.checkNodeJSApi = function ( ) {
		$http.get( "http://localhost:3000/ttb_mongo_api").then(
			// on success . . .
			function ( response ) {
				console.log ( " [ storageServ ] Using mongoDB factory! ");
				this._apiNodeJS = true;
				this._storageServ = $injector.get( "nodejsStorageAPI" );
				this.getProjects();
			},
			// on error . . .
			function ( response ) {
				console.log ( " [ storageServ ] NodeJS server not available!");
				this._apiNodeJS = false;
				this.checkIDBApi();
			}
		);
	};

	/**
	 * Check method for the Indexed DB.
	 */
	this.checkIDBApi = function ( ) {
		$http.get( "http://localhost:8080/" ).then(
		// on success
		function ( response ) {
			console.log ( " [ storageServ ] Using indexedDB API !");
			this._apiIDB = true;
			this._storageServ = $injector.get("idbStorageAPI");
		},
		// on error
		function ( response ) {
			console.log( " [ storageServ ] Localhost server not available. Indexed DB is not usable!");
			this._apiIDB = false;
			this.checkLocalStorageAPI();
		});
	};

	/**
	 * Check method for the local storage db.
	 */
	this.checkLocalStorageAPI = function ( ) {
		console.log( " [ storageServ ] Checking for localstorage . . . well, let's say it's not a check, we will definitely use it!");
		this._apiLocalStorage = true;
		this._storageServ = $injector.get("localStorageAPI");
	}

	/* ********************************************************************* */
	/*                              CRUD METHODS                             */
	/* ********************************************************************* */

	this.addProject = function ( project ) { return this._storageServ.addProject( project ) ; }

	this.removeProject = function ( projectId ) { return this._storageServ.removeProject( projectId ) ; }

	this.updateProject = function ( project ) { return this._storageServ.updateProject( project ) ; }

	this.getProjects = function ( project ) {
		this._storageServ = $injector.get("nodejsStorageAPI");
		 return this._storageServ.getProjects() ;
	}

	// Detecting api . . .
	//this.checkAPI();

});
