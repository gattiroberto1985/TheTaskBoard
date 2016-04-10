/**
 * Definizione servizio angular con api di accesso relative al LocalStorage.
 *
 * TODO: Attenzione a definire esattamente gli stessi metodi per i due service
 *       di API per il db!
 *
 * @param $http
 */
TTBApp.factory("ttbFaskLocalStorage", function ($http) {

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
