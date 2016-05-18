// Defining application
var app = angular.module("TTBApp", ["ngRoute", "indexedDB" /*, "ui.tree" */ ]);

// Configuring the app
app.config( function ($routeProvider, $indexedDBProvider ) {
    'use strict';
c

    // Configuring IDB . . .
    $indexedDBProvider
          .connection('TTB_APP_V2')
          .upgradeDatabase(2, function(event, db, tx){
            console.log("UPGRADING DATABASE!");
            var objStore = db.createObjectStore('projects', {keyPath: '_id'});
            //objStore.createIndex('name_idx', 'name', {unique: false});
            objStore.createIndex('_id_idx', '_id', {unique: true});
          });

    var homePageDatas = {
        controller: 'dashboardCtrl',
        templateUrl: 'pages/dashboard.html',
        /*  resolve: {
            store: function () {

                });
            }*/
    };

    var projectDetailsPageDatas = {
      controller: 'projectCtrl',
      templateUrl: 'pages/project.html'
    };

    /*var projectTasksPageDatas = {
      controller: 'tasksCtrl',
      templateUrl: 'pages/tasks.html'
    };*/

    /*var projectDetailsData = {
        controller: 'tasksCtrl',
        templateUrl: 'pages/tasks.html'
    };*/

    var usersData = {
        controller: 'usersCtrl',
        templateUrl: 'pages/users.html'
    };

    $routeProvider
        .when('/dashboard', homePageDatas)
        // :userId indica che al routing sto passando un parametro!
        // Tale parametro sarà poi recuperabile dal controller
        // utenteCtrl tramite apposita variabile
        .when('/project/:id', projectDetailsPageDatas )
        //.when('/project/:id/tasks', projectDetailsData)
      //.when('/users', usersData )
        .otherwise({
            redirectTo: '/dashboard'
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
