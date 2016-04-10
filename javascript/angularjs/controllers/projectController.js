
/**
 * Definizione controller relativo ai progetti.
 */
TTBApp.controller("projectsCtrl", function projectCTRL($scope, $routeParams, $filter, store) {

    'use strict';

    // recupero i project dallo store
    var projects = $scope.projects = store.projects;


});
