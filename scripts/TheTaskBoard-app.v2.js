
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
 * Configuration for the module.
 */
TTBApp.config( function ( $routeProvider ) {
    'use strict';

    var routeConfig = {
        controller: 'fasksCtrl',
        templateUrl: 'pages/fasks.html',
        resolve: {
            store: function (ttbFaskStorage) {
                // Get the correct module (API or localStorage).
                return ttbFaskStorage.then(function (module) {
                    module.get(); // Fetch the todo records in the background.
                    return module;
                });
            }
        }
    };

    $routeProvider
        .when('/', routeConfig)
        .when('/:status', routeConfig)
        .otherwise({
            redirectTo: '/'
        });
});

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
 * Definizione servizio angular con API di accesso per Firebase.
 */
TTBApp.factory("firebaseStorage", function($http, $injector) {
    console.log(" [ FIREBASE STORAGE ] To be implemented . . .");
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

    console.log(" [ INDEXEDDB STORAGE ] To be implemented . . .");
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
TTBApp.factory("ttbFaskStorage", function ($http) {

    console.log(" [ LOCAL STORAGE ] To be implemented . . .");
    'use strict';
    // Definisco uno store per i dati
    /*var projectStore = {

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

    };*/

    var faskStore = {
    };

    var store = { projectStore, faskStore };

    return store;
});

/**
 * CONTROLLERS DELL'APPLICAZIONE
 *
 * piccolo memo: un controller angularJS dovrebbe solamente impostare lo stato
 *               iniziale del modello dati e definire le funzionalita' per la
 *               view.
 *               NON DOVREBBE MAI:
 *                - manipolare il DOM (ci pensano le direttive);
 *                - formattare l'input (--> form angular) o l'output (filtri);
 *                - condividere dati (--> provider [service o factory]);
 *                - implementare funzionalita' generali (--> servizi)
 */

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
 * The controller:
 *    - retrieves and persists the model via the todoStorage service
 *    - exposes the model to the template and provides event handlers
 *
 * Il modello fask mette a disposizione:
 *
 *  - funzionalita' di controllo sullo stato dei vari fask (e.g. $watch-es );
 *  - i metodi di wrapping per modifica, aggiunta, rimozione e rollback dei
 *    fask;
 */
TTBApp.controller("fasksCtrl", function ($scope, $routeParams, $filter, store) {
    console.log(" [ AJS ] [ fasksCTRL ] Entering fask controller. . .");

    var store = store.faskStore;

    // Variabile di scope per la memorizzazione temporanea di un nuovo fask
    $scope.newFask = { };
    // Variabile di scope per la memorizzazione del fask modificato
    $scope.editedFask = null;

    // Array con tutti i fask censiti nello strato di persistenza
    // TODO: retrieve them via persistenceService!
    //var fasks = $scope.fasks = store.fasks;
    var fasks = $scope.fasks = [
        {
            id: 1,
            completed: false,
            title: "Fast task #1"/*,
            description: "Fast task #1 -- This is the description!"*/
        },
        {
            id: 2,
            completed: false,
            title: "Fast task #2"/*,
            description: "Fast task #2 -- This is the description!"*/
        },
        {
            id: 3,
            completed: false,
            title: "Fast task #3"/*,
            description: "Fast task #3 -- This is the description!"*/
        },
        {
            id: 4,
            completed: false,
            title: "Fast task #4"/*,
            description: "Fast task #4 -- This is the description!"*/
        },
    ];

    // Watch per il controllo dello stato dei fasks
    $scope.$watch('fasks', function () {
        $scope.remainingCount = $filter('filter')(fasks, { completed: false }).length;
        $scope.completedCount = fasks.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);

    // Event handler per il controllo del routing per modifiche e sistemazione
    // del filtro
    $scope.$on('$routeChangeSuccess', function () {
        var status = $scope.status = $routeParams.status || '';
        $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : {};
    });

    // Wrapping per lo strato di persistenza

    // Aggiunta fask
    $scope.addFask = function () {
        console.log(" [ CTRL FASK ] Adding new fask to persistence layer . . .");
        console.log(" [ CTRL FASK ] |-- Defining new fask . . .")
        var newFask = {
            title: $scope.newFask.trim(),
            completed: false
        };

        if (!newFask.title) {
            console.log(" [ CTRL FASK ] |-- WARNING: no title defined for fask!");
            return;
        }

        console.log(" [ CTRL FASK ] |-- Saving new fask . . .");
        $scope.saving = true;
        store.insert(newFask)
            .then(function success() {
                console.log(" [ CTRL FASK ] Fask saved!");
                $scope.newFask = '';
            })
            .finally(function () {
                $scope.saving = false;
            });
    } ;

    // Rimozione fask
    $scope.deleteFask = function (fask) {
        console.log(" [ CTRL FASK ] Deleting fask from persistence layer . .. ");
        store.delete(fask);
    };

    // Switch per la modifica di un fask nella view
    $scope.editFask = function(fask) {
        $scope.editedFask = fask;
        // Clone the original todo to restore it on demand.
        $scope.originalFask = angular.extend({}, fask);
    };

    // Gestione rollback modifiche del fask
    $scope.rollbackEdits = function(fask) {
        fasks[fasks.indexOf(fask)] = $scope.originalFask;
        $scope.editedFask = null;
        $scope.originalFask = null;
        $scope.reverted = true;
    };

    // Gestione salvataggio modifiche fask
    $scope.saveEdits = function (fask, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && $scope.saveEvent === 'submit') {
            $scope.saveEvent = null;
            return;
        }

        $scope.saveEvent = event;

        if ($scope.reverted) {
            // Fask edits were reverted-- don't save.
            $scope.reverted = null;
            return;
        }

        fask.title = fask.title.trim();

        if (fask.title === $scope.originalFask.title) {
            $scope.editedFask = null;
            return;
        }

        store[fask.title ? 'put' : 'delete'](fask)
            .then(function success() {}, function error() {
                fask.title = $scope.originalFask.title;
            })
            .finally(function () {
                $scope.editedFask = null;
            });
    };

    // Rimozione fask completati
    $scope.clearCompleted = function () {
        store.clearCompleted();
    };

    // Gestione flag fask completato
    $scope.toggleFaskCompleted = function (fask, completed) {
        if (angular.isDefined(completed)) {
            fask.completed = completed;
        }
        store.put(fask, fasks.indexOf(fask))
            .then(function success() {}, function error() {
                fask.completed = !fask.completed;
            });
    };

    // Gestione flag fask completati (tutti i fask)
    $scope.toggleAllFasksCompleted = function (completed) {
        fasks.forEach(function (fask) {
            if (fask.completed !== completed) {
                $scope.toggleCompleted(fask, completed);
            }
        });
    };

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
