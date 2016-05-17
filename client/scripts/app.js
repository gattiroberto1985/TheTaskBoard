// Defining application
var app = angular.module("TTBApp", ["ngRoute"/*, "ui.tree" */ ]);

// Configuring the app
app.config( function ($routeProvider ) {
    'use strict';

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

    var fasksPage = {
        controller : 'fasksCtrl',
        templateUrl: 'pages/fasks.html'
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
        .when('/fasks', fasksPage)
        // :userId indica che al routing sto passando un parametro!
        // Tale parametro sarà poi recuperabile dal controller
        // utenteCtrl tramite apposita variabile
        .when('/project/:_id', projectDetailsPageDatas )
        //.when('/project/:id/tasks', projectDetailsData)
      //.when('/users', usersData )
        .otherwise({
            redirectTo: '/dashboard'
        });
});

// Defining application constants
app.constant("PROJECT_STATUSES", [{ }]);

function Project(_id, title, description, dateOpen, dateClose, dateLastUpdated, owner) {
    this._id             = _id;
    this.title           = title;
    this.description     = description;
    this.dateOpen        = /*Utils.toDate(*/ dateOpen        /*)*/;
    this.dateClose       = /*Utils.toDate(*/ dateClose       /*)*/;
    this.dateLastUpdated = /*Utils.toDate(*/ dateLastUpdated /*)*/;
    this.owner           = owner;
    this.timeline = [ ];
    this.notes = [ ];
    this.tasks = [ ];

    /**
     * Returns a JSON with the number of tasks in each state.
     */
    this.getTaskStatus = function ( ) {
        var tasksStatus = { "opened": 0, "closed": 0, "working": 0, "paused": 0 };
        for ( var i = 0; i < this.tasks.length; i++)
        {
            switch ( tasks[i].status.value )
            {
                case "Aperto"        : tasksStatus.opened++ ; break;
                case "In Lavorazione": tasksStatus.working++; break;
                case "In Attesa"     : tasksStatus.paused++ ; break;
                case "Chiuso"        : tasksStatus.closed++ ; break;
                default: break;
            }
        }
        return tasksStatus;
    }
};
