// Defining application
var app = angular.module("TTBApp", ["ngRoute"]);

// Configuring the app
app.config( function ($routeProvider ) {
    'use strict';

    var homePageDatas = {
        controller: 'projectsCtrl',
        templateUrl: 'pages/projects.html',
        /*  resolve: {
            store: function () {

                });
            }*/
        };

    var projectDetailsData = {
        controller: 'tasksCtrl',
        templateUrl: 'pages/tasks.html'
    };

    $routeProvider
        .when('/projects', homePageDatas)
        // :userId indica che al routing sto passando un parametro!
        // Tale parametro sarà poi recuperabile dal controller
        // utenteCtrl tramite apposita variabile
        .when('/project/:id/tasks', projectDetailsData)
        .otherwise({
            redirectTo: '/projects'
        });
});

// Defining application constants
app.constant("PROJECT_STATUSES", [{ }]);

function Project(id, title, description, dateOpen, dateClose, dateLastUpdated, owner) {
    this.id              = id;
    this.title           = title;
    this.description     = description;
    this.dateOpen        = /*Utils.toDate(*/ dateOpen        /*)*/;
    this.dateClose       = /*Utils.toDate(*/ dateClose       /*)*/;
    this.dateLastUpdated = /*Utils.toDate(*/ dateLastUpdated /*)*/;
    this.owner           = owner;
};
