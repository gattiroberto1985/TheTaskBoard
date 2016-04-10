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

    'use strict'; // MEMO: a che serve?

    // Detect if an API backend is present. If so, return the API module, else
    // hand off the localStorage adapter
    return $http.get('/indexedDB').then(function () {
            return $injector.get('appIndexedDBApiSrv');
        }, function () {
            return $injector.get('appLocalStorApiSrv');
    });
