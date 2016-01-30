
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
    
    /*var OBJECT_STORE_NAME    = "TTBApp-projects";
    var OBJECT_STORE_VERSION = 1;
    var OBJECT_DATABASE_NAME = "TTBApp-v2";    */    
    'use strict'; // MEMO: a che serve?

    // Detect if an API backend is present. If so, return the API module, else
    // hand off the localStorage adapter
    return $http.get('/indexedDB').then(function () {
            return $injector.get('appIndexedDBApiSrv');
        }, function () {
            return $injector.get('appLocalStorApiSrv');
    });
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

    var dbname = OBJECT_DATABASE_NAME;
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
            return /*$http.get('/api/todos')
                .then(function (resp) {
                    angular.copy(resp.data, store.todos);
                    return store.todos;
                })*/ null;
        }
        
    };
    
    return store;
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
            var deferred = $q.defer();

            angular.copy(store._getFromLocalStorage(), store.todos);
            deferred.resolve(store.todos);

            return deferred.promise;
        }
        
    };
    
    return store;
});


/**
 * Definizione servizio angular per gestione projects.
 *
 * Il servizio r
 * @param $window 
 * @param $q servizio angular per la gestione dei lanci asincroni.
 */
TTBApp.service("projectsSRV", function($window, $q) {
    
    console.log(" [ ANGULAR JS ] Starting '" + TTBAPP_SERVICE_PROJECTS + "' . . .");
    
});


TTBApp.controller("projectCTRL", function projectCTRL($scope, $routeParams, $filter, store) {
    
    'use strict';
    
    // recupero i project dallo store
    var projects = $scope.projects = store.projects;
    
    
} );