// Defining application
var app = angular.module("TTBApp", ["ngRoute", "ngCookies"/*, "ui.tree" */ ]);

// Configuring the app
app.config( function ($routeProvider ) {
    'use strict';

    /*var loginPageDatas = {
        controller: 'loginCtrl',
        templateUrl: 'pages/login.html'
    };*/

    var adminPageDatas = {
        controller: 'adminCtrl',
        templateUrl: 'pages/admin.html'
    };
    
    
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

    var projectTasksPageDatas = {
      controller: 'tasksCtrl',
      templateUrl: 'pages/project-tasks.html'
    };

    /*var projectDetailsData = {
        controller: 'adminCtrl',
        templateUrl: 'pages/admin.html'
    };*/

    $routeProvider
        .when('/dashboard', homePageDatas)
        .when('/fasks', fasksPage)
        .when('/project/:_id', projectDetailsPageDatas )
        .when('/project/:_id/tasks', projectTasksPageDatas )
        //.when('/login', loginPageDatas)
        .when('/admin', adminPageDatas )
        .otherwise({
            redirectTo: '/dashboard'
        });
});

/*app.run(['$cookies', '$window', function($cookies, auth, $window, $log) {

        $window.onbeforeunload = function() {
            // Clearing all cookies now!
            $cookies.remove('TTB_COOKIE');
        };
    }]);*/

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
