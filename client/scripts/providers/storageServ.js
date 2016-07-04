/**
 * Angular service for the correct data layer API to use.
 */
app.service('storageServ', function ($http, $injector, $q/*, projectServ */ ) {
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

		/*
		function asyncGreet(name) {
		  // perform some asynchronous operation, resolve or reject the promise when appropriate.
		  return $q(function(resolve, reject) {
		    setTimeout(function() {
		      if (okToGreet(name)) {
		        resolve('Hello, ' + name + '!');
		      } else {
		        reject('Greeting ' + name + ' is not allowed.');
		      }
		    }, 1000);
		  });
		}
		*/
		return $q( function ( resolve, reject ) {
			console.log ( " [ storageServ ] CheckAPI $q . . .");
			$http.get ( "http://localhost:3000/ttb_mongo_api" ).then(
				// onSuccess
				function ( response ) {
					console.log ( " [ storageServ ] NodeJS server up&running! Using nodejs with mongoose . . . ");
					resolve ( $injector.get("nodejsStorageAPI") );
				},
				// onError
				function ( response ) {
					console.log ( " [ storageServ ] NodeJS server unavailable: using local IDB . . . ");
					resolve ( $injector.get("idbStorageAPI") );
				}
			);
		});
		/*console.log(" [ storageServ ] Checking API for storage . . .");
		this.checkNodeJSApi();*/
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



	this.getProjects = function ( strgServ ) {

		console.log ( " [ storageServ ] entering get projects . . . ");
		/*return $q(
			function ( resolve, reject )
			{*/
				console.log( " [ storageServ ] Retreiving projects . . . ");
				// return a promise . . .
				return strgServ.getProjects();
			/*}
		);*/
/*		promise.then ( function ( response ) {
			this._storageServ = response;
		},
		function ( response ) {
			console.log ( " [ storageServ ] ERROR: " + JSON.stringify ( response ) );
		});*/
		/*this.checkAPI();
		this._storageServ = $injector.get("nodejsStorageAPI");
		 return this._storageServ.getProjects() ;*/
	}

	// Detecting api . . .
	//his.checkAPI();

});
