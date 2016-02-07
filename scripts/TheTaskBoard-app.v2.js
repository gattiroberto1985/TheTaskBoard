
var TTBAPP_ANGULAR_SERVICE_APPSTORAGE = "appStorage";
var TTBAPP_ANGULAR_SERVICE_PROJECTS = "projectsSRV";
var TTBAPP_ANGULAR_SERVICE_APPSTORAGE_INDEXEDDB_API = "appIndexedDBApiSrv";
var TTBAPP_ANGULAR_SERVICE_APPSTORAGE_LOCALSTOR_API = "appLocalStorApiSrv";

/*
 * VARIABILI GLOBALI DI DATABASE
 */
var OBJECT_STORE_NAME    = "TTBApp-projects";
var OBJECT_STORE_VERSION = 1;
var OBJECT_DATABASE_NAME = "TTBApp-v2";

/*
 *  SERVIZI ANGULAR
 */

/**
 * Definizione del modulo angular dell'applicazione.
 */
var TTBApp = angular.module("TTBApp", [ "ngRoute"/*, "ngDialog" */ ] );

/**
 * Definizione servizio angular per identificazione API di interfaccia a db.
 *
 * Lo scopo del servizio è quello di fornire una interfaccia di accesso al
 * layer di persistenza dei dati. Devono essere fornite le classiche procedure
 * di accesso al db (CRUD), piu' eventualmente altri metodi di __REALE__
 * utilita' generale.
 *
 * @param $http servizio angular $http
 * @param $injector servizio angular $injector
 */
TTBApp.factory("appStorage", function ($http, $injector) {

    /*'use strict'; // MEMO: a che serve?

    // Detect if an API backend is present. If so, return the API module, else
    // hand off the localStorage adapter
    return $http.get('/indexedDB').then(function () {
            return $injector.get('appIndexedDBApiSrv');
        }, function () {
            return $injector.get('appLocalStorApiSrv');
    });*/
});

/**
 * Definizione servizio angular con api di accesso relative ad IndexedDB.
 *
 * TODO: Attenzione a definire esattamente gli stessi metodi per i due service
 *       di API per il db!
 *
 * @param $http
 *
 */
TTBApp.factory("appIndexedDBApiSrv", function ($http) {

    /*var dbname = OBJECT_DATABASE_NAME;
    var objstorename = OBJECT_STORE_NAME;
    var objstorevers = OBJECT_STORE_VERSION;

    'use strict';
    // Definisco uno store per i dati
    var store = {

        projects: [ ],

        insert: function( project ) {

        },

        update: function ( project ){

        },

        delete: function ( project ) {

        },

        get: function () {
            return //$http.get('/api/todos')
                //.then(function (resp) {
                //    angular.copy(resp.data, store.todos);
                //    return store.todos;
                //})
                 null;
        }

    };

    return store;*/
});

/**
 * Definizione servizio angular con api di accesso relative al LocalStorage.
 *
 * TODO: Attenzione a definire esattamente gli stessi metodi per i due service
 *       di API per il db!
 *
 * @param $http
 */
TTBApp.factory("appLocalStorApiSrv", function ($http) {

    /*'use strict';
    // Definisco uno store per i dati
    var store = {

        projects: [ ],

        insert: function( project ) {

        },

        update: function ( project ){

        },

        delete: function ( project ) {

        },

        get: function () {
            var deferred = $q.defer();

            angular.copy(store._getFromLocalStorage(), store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        }

    };

    return store;*/
});


/**
 * Definizione del controller relativo all'header della pagina. Gestisce la
 * navigazione tra i template dell'applicazione.
 *
 */
TTBApp.controller("headerCtrl", function ( ) {
    console.log(" [ AJS ] [ headerCtrl ] Entering header controller . . .");
});

/**
 * Definizione del controller relativo alla view dei fast-tasks.
 *
 */
TTBApp.controller("fasksCtrl", function ($scope) {
    console.log(" [ AJS ] [ fasksCTRL ] Entering fask controller. . .");

    $scope.fasks = [
        {
            id: 1,
            completed: false,
            title: "Fast task #1",
            description: "Fast task #1 -- This is the description!"
        },
        {
            id: 2,
            completed: false,
            title: "Fast task #2",
            description: "Fast task #2 -- This is the description!"
        },
        {
            id: 3,
            completed: false,
            title: "Fast task #3",
            description: "Fast task #3 -- This is the description!"
        },
        {
            id: 4,
            completed: false,
            title: "Fast task #4",
            description: "Fast task #4 -- This is the description!"
        },
    ];
});

/**
 * Definizione controller relativo ai progetti.
 */
TTBApp.controller("projectsCtrl", function projectCTRL($scope, $routeParams, $filter, store) {

    'use strict';

    // recupero i project dallo store
    var projects = $scope.projects = store.projects;


});

TTBApp.controller("tasksCtrl", function () {
    console.log(" [ AJS ] [ tasksCtrl ] Entering task controller . . .");
});

/**
 * Direttiva
 */
 /**
  * Directive that executes an expression when the element it is applied to gets
  * an `escape` keydown event.
  */
TTBApp.directive('faskEscape', function () {
    'use strict';
	var ESCAPE_KEY = 27;

	return function (scope, elem, attrs) {
	    elem.bind('keydown', function (event) {
 			if (event.keyCode === ESCAPE_KEY) {
 				scope.$apply(attrs.faskEscape);
 			}
 		});

 		scope.$on('$destroy', function () {
 			elem.unbind('keydown');
 		});
 	};
});

TTBApp.directive('faskFocus', function faskFocus($timeout) {
    'use strict';
	return function (scope, elem, attrs) {
	    scope.$watch(attrs.faskFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
			    }, 0, false);
            }
        });
	};
});
