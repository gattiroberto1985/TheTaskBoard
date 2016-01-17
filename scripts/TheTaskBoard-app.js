/******************************************************************************/
/*  
 * Script di definizione applicazione TheTaskBoard.
 *
 * FileName: ................ TheTaskBoard-app.js                  
 * Version : ................ 0.0.0.1                                         
 *
 */
/******************************************************************************/

// Definizione variabili globali
var TTBAPP_MODULE_NAME                     = "TTBApp";
var TTBAPP_CONTROLLER_TASKS_NAME           = "TTBTasksCtrl";
var TTBAPP_CONTROLLER_TASK_DETAILS_NAME    = "TTBTaskDetailCtrl";
var TTBAPP_CONTROLLER_PROJECTS_NAME        = "TTBProjectsCtrl";
var TTBAPP_CONTROLLER_PROJECT_DETAILS_NAME = "TTBProjectDetailsCtrl"; //TTBProjectDetailsCtrl
var TTBAPP_CONTROLLER_HEADER_NAME          = "TTBHeaderCtrl";
var TTBAPP_SERVICE_PROJECTS                = "TTBProjectsSrv";
var TTBAPP_SERVICE_TASKS                   = "TTBTasksSrv";
var TTBAPP_SERVICE_DATABASE                = "TTBAppBEidbSrv";

var TTBAPP_NAV_PROJECTS_PAGE     = "/projects"; // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_PAGE         = "/tasks";    // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_PROJ_DETAILS_PAGE = "/project";  // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_DETAILS_PAGE = "/task";     // ATTENTION: this value should match the one in the index.html!


var TTBAPP_APP_NAME    = "TheTaskBoard App";
var TTBAPP_DESCRIPTION = "Task manager for the stupid guy!";

// Graphical transactions time
var TIME_TRANS_HIDE_SHOW_SIBLINGS = 250; // ms
var TIME_TRANS_HIDE_SHOW_DIV      = 250; // ms
var TIME_TRANS_ADD_REMOVE_CLASS   = 250; // ms


var TEST_PROJECTS =  [
    {
        id: 1,
        uniqueId: "prj_1",
        name: "PRJ-PROGETTO_1",
        description: "Progetto 1 -- descrizione",
        status: "OPEN",
        assignedTo: "Sherlock Holmes",
        taskList: [
            { 
                id: 1,
                uniqueId: "tsk_1",
                description: "Control the room of the red studio",
                assignedTo: "Sherlock Holmes",
                status: "CLOSED",
                notes: [ 
                    {
                        id: 1,
                        uniqueId: "nte_1",
                        date: "12-08-2015 23:43:12",
                        text: "Found a body with scaring face. Wonder what cause it."
                    }, // closing note 1
                    {
                        id: 2,
                        uniqueId: "nte_2",
                        date: "12-08-2015 23:45:00",
                        text: "Seems like the man have been poisoned. "
                    } // closing note 2                        
                ] // closing note array
            }, // closing first task of first project 
            { 
                id: 2,
                uniqueId: "tsk_2",
                description: "Searching for Jefferson Hope",
                assignedTo: "Sherlock Holmes",
                status: "OPEN",
                notes: [ 
                    {
                        id: 3,
                        uniqueId: "nte_3",
                        date: "13-08-2015 11:29:32",
                        text: "Asked to my boys to search JH"
                    } // closing note 1                       
                ] // closing note array
            } // closing first task of first project              
        ]
    },
    {
        id: 2,
        uniqueId: "prj_2",
        name: "JPR-PROGETTO_2",
        description: "Progetto 2 -- descrizione",
        status: "BACKLOGGED"
    },
    {
        id: 3,
        uniqueId: "prj_3",
        name: "RPJ-PROGETTO_3",
        description: "Progetto 3 -- descrizione",
        status: "CLOSED"
    }];



// Definizione modulo angular (attenzione al tag 'ng-app' nel template html!)
var TTBApp = angular.module(TTBAPP_MODULE_NAME, [ "ngRoute"/*, "ngDialog" */ ] );

$(window).load(function () {
   console.log ( "Page loaded, hiding overlay . . . ") ;
     $("#overlay").hide();
    
});

/*(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };
})(jQuery);*/

// Definizione della navigazione interna
TTBApp.config ( function ( $routeProvider ) {
    /*
    var TTBAPP_NAV_PROJECTS_PAGE     = "/projects"; // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_PAGE         = "/tasks";    // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_PROJ_DETAILS_PAGE = "/project";  // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_DETAILS_PAGE = "/task";     // ATTENTION: this value should match the one in the index.html!

    */
    $routeProvider
          .when(TTBAPP_NAV_PROJECTS_PAGE, {
			templateUrl: "templates/tpl_projects.html",
			controller: TTBAPP_CONTROLLER_PROJECTS_NAME
		}).when(TTBAPP_NAV_TASK_PAGE, {
			templateUrl: "templates/tpl_tasks.html",
			controller: TTBAPP_CONTROLLER_TASKS_NAME
		})/*.when(TTBAPP_NAV_PROJ_DETAILS_PAGE, {
			templateUrl: "templates/tpl_project.html",
			controller: TTBAPP_CONTROLLER_PROJECT_NAME
		}).when(TTBAPP_NAV_TASK_DETAILS_PAGE, {
			templateUrl: "templates/tpl_task.html",
			controller: TTBAPP_CONTROLLER_TASK_NAME
		})*/
	.otherwise({
		redirectTo: TTBAPP_NAV_PROJECTS_PAGE
	});
}); // chiude definizione routing applicazione

// Gestione database
var IDB_OBJECT_STORE_NAME = "projects";
var IDB_NAME = "TheTaskBoard_IDB";
var IDB_VERSION = 15;
var KEY_ID = "_id";

// Definizione dei factory e dei services angular
// Definizione service project . . .
TTBApp.service(TTBAPP_SERVICE_PROJECTS, function($window, $q) {
    // QUESTI DATI VANNO RECUPERATI DA DB!!!

    var myDb = $window.indexedDB;
    var db = null;
    var lastIndex = 0;
    
    this.open = function () {
        var deferred = $q.defer();
        var request = indexedDB.open(IDB_NAME, IDB_VERSION);
        request.onupgradeneeded = function (e) {
            console.log ( " [ DATABASE ] IDB upgrade needed!" );
            db = e.target.result;
            e.target.transaction.onerror = indexedDB.onerror;
            if (db.objectStoreNames.contains(IDB_OBJECT_STORE_NAME)) {
                console.log ( " [ DATABASE ] . . . removing old object store . . . " );
                db.deleteObjectStore(IDB_OBJECT_STORE_NAME);
            }
            
            console.log ( " [ DATABASE ] . . . creating new object store . . ." );
            var store = db.createObjectStore(IDB_OBJECT_STORE_NAME, {
                keyPath: KEY_ID,
                autoIncrement: true
            });
            
            // define what data items the objectStore will contain
            store.createIndex("id", "id", { unique: true });
        
            
            for ( var i = 0; i < TEST_PROJECTS.length ; i++  )
            {
                var project = TEST_PROJECTS[i];
                console.log( "Adding to store " + store + " the project with id " + project.id  ) ;
                var addReq = store.add(project);
                addReq.onsuccess = function(event) 
                { console.log(" [ DATABASE ] |---- inserted project with id '" + event.target.result.id + "'"); };
                addReq.onerror = function ( error ) 
                { console.log ( " [ DATABASE ] ... ERROR: " + error ); };
            }            
        };

        request.onsuccess = function (e) {
            console.log(" [ DATABASE ] . . . Created db!");
            db = e.target.result;
            deferred.resolve();
        };

        request.onerror = function () {
            deferred.reject();
        };
        return deferred.promise;        
    };
    
    this.getProjects = function () {
        
        var deferred = $q.defer();
        console.log("getProjects...");
        if (db === null)
            deferred.reject("IndexDB is not opened yet!");
        else 
        {
            var trans = db.transaction([IDB_OBJECT_STORE_NAME], "readwrite");
            var store = trans.objectStore(IDB_OBJECT_STORE_NAME);
            var projects = [];
            // Get everything in the store;
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);

            /*
                   var cursor = event.target.result;
                    //var tasks = [] ;
                    var task = { };
                    if ( cursor )
                    {
                        console.log("|-- object retreived");
                        task = cursor.value;
            */
            cursorRequest.onsuccess = function (e) {
                console.log("Success on cursorrequest");
                var cursor = e.target.result;
                if ( cursor ) 
                {
                    deferred.resolve(projects);
                    projects.push(cursor.value);
                    console.log("Getted project with id: " + cursor.value.id );
                    cursor.continue();
                }
            };

            cursorRequest.onerror = function (e) {
                console.log(e.value);
                deferred.reject("Something went wrong!!!");
            };
        }
        console.log ( deferred.promise );
        return deferred.promise;        
    };
    
    this.deleteProject = function ( project ) {
        
    };
    
    this.createProject = function ( project ) {
        
    };    
    
    // Ritorna i task specifici del progetto
    this.getProjectTask = function(project) {
        if ( project.id === undefined )
            throw "Project id is undefined!";
        console.log( "Task list contains " + project.taskList.length + " tasks!");
        return project.taskList;
    }
        
});

// Definizione service per i task . . . 
TTBApp.service(TTBAPP_SERVICE_TASKS, function() {
    this.tasks = [ ];
    
    this.setTasks = function ( tasklist ) {
        this.tasks = tasklist;
    } ;
    
    this.getTasks = function ( ) { return this.tasks; } ;
});

// Definizione del controller per l'header di pagina (occhio alle dipendenza da
// $location!)
TTBApp.controller(TTBAPP_CONTROLLER_HEADER_NAME, function ($scope, $location ) {
	$scope.appDetails = {};
	$scope.appDetails.title = TTBAPP_APP_NAME;
	$scope.appDetails.tagline = TTBAPP_DESCRIPTION;
	
    // Navigazione con item tipo li (non necessaria, abbiamo unica pagina!)
	$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path() ) {
			return true;
		}
		
		return false;
	};
    
}); // chiude definizione controller TTBAPP_CONTROLLER_HEADER_NAME


// Definizione controller task
TTBApp.controller(TTBAPP_CONTROLLER_TASKS_NAME, function ( $scope, TTBTasksSrv ) {
    
    // Recupero i task dal service . . .
    $scope.tasks = TTBTasksSrv.getTasks();
    
    console.log("There are " + $scope.tasks.length + " tasks to show!");
} ); // Chiude definizione controller TTBAPP_CONTROLLER_TASKS_NAME




// Definizione controller dei progetti
TTBApp.controller(TTBAPP_CONTROLLER_PROJECTS_NAME, function ( $scope, $location, $window, TTBProjectsSrv, TTBTasksSrv/*, ngDialog*/ ) { //TTBAPP_SERVICE_PROJECTS ) {
    
    var vm = this;
    vm.projects = [] ;
    console.log("Retreiving data from db . . .");
    
    vm.refreshList = function () {
        TTBProjectsSrv.getProjects().then(function (data) {
            vm.projects = data;
            $scope.projects = data;
        }, function (err) {
            $window.alert(err);
        });
    };    
    
    function init() {
        TTBProjectsSrv.open().then(function () {
            vm.refreshList();
            //$scope.projects = vm.projects;
        });
    };
    
    init();
    console.log ( "Projects: " + vm.projects.length );
    // Inserisco nello scope del controller i progetti caricati dal service
    //$scope.projects = TTBProjectsSrv.getProjects();

    //$scope.showModal = false; 
    
    $scope.getProject = function ( id ) { 
        for ( var project in $scope.projects )
            if ( project.id === id )
                return project;
    };
    
    // Definisco le callback utilizzate nel template HTML
    
    // Metodo di apertura progetto su pagina dedicata (details)
    $scope.openProject = function ( project ) { openProject(project, TTBTasksSrv, $location); };

    // Metodo di modifica rapida dei dati di testata del progetto
    $scope.editProject = function(boolFlag, project) 
    {
        //console.log("Changing showModal to: '" + $scope.showModal + "' . . .");
        //$scope.project = project;
        //$scope.showModal = !$scope.showModal;
        $scope.editing = boolFlag;
        editProjectHeader(boolFlag, project/*project, ngDialog, $scope */); 
    };

    // Metodo di rimozione progetto
    $scope.deleteProject = function ( project ) { deleteProject(project); };

    // Metodo di salvataggio modifiche dei dati di testata del progetto
    $scope.updateProject = function ( project ) { updateProjectHeader(project); };
    
} ); // Chiude definizione controller TTBAPP_CONTROLLER_PROJECTS_NAME

/* ************************************************************************* */
/*                           METODI DI GESTIONE PROGETTO                     */
/* ************************************************************************* */

function openProject( project, taskSRV, locationSRV )
{
    console.log("Trying to get project tasks . . . ");
    var taskList = project.taskList;
    if ( taskList === undefined || taskList.length == 0 )
    {
        console.log(". . . No task defined for project!")
    }
    else
    {
        console.log("Showing " + taskList.length + " tasks in panels . . .");
        taskSRV.setTasks(taskList);
    }
    console.log("Redirecting to '" + TTBAPP_NAV_TASK_PAGE + "' . . . ");
    locationSRV.path(TTBAPP_NAV_TASK_PAGE);
}

function editProjectHeader( editFlag, project )
{
    var projectUid = project.uniqueId;

    if ( editFlag ) 
    {
        console.log(". . Request for edit project on '" + projectUid + "': showing overlay and hiding container . . .");
        $( "#" + projectUid ).siblings().hide(TIME_TRANS_HIDE_SHOW_SIBLINGS);
        $( "#" + projectUid + "TxtDiv").hide(TIME_TRANS_HIDE_SHOW_DIV);
        $( "#" + projectUid + "FrmDiv").show(TIME_TRANS_HIDE_SHOW_DIV);
        $("#" + projectUid ).removeClass("col-md-4", TIME_TRANS_ADD_REMOVE_CLASS).addClass("col-md-12", TIME_TRANS_ADD_REMOVE_CLASS);
    }
    else 
    {
        console.log(". . Request for save edited project: showing container and hiding overlay . . .");
        $("#" + projectUid ).removeClass("col-md-12", TIME_TRANS_ADD_REMOVE_CLASS).addClass("col-md-4", TIME_TRANS_ADD_REMOVE_CLASS);        
        $( "#" + projectUid + "FrmDiv").hide(TIME_TRANS_HIDE_SHOW_DIV);
        $( "#" + projectUid + "TxtDiv").show(TIME_TRANS_HIDE_SHOW_DIV);
        $( "#" + projectUid ).siblings().show(TIME_TRANS_HIDE_SHOW_SIBLINGS);
    }    
}

function updateProject(project)
{
    console.log(". . Request for edit project: showing overlay and hiding container . . .");
    
    console.log ( project.id + " @@ " + project.name + " @@ " + project.status );
    /*$("#" + project.uniqueId ).removeClass("col-md-12", 100).addClass("col-md-4", 100);
    $( "#" + project.uniqueId ).siblings().show(400);*/
    // Creo il clone per il project
    
}

function deleteProject( project )
{
    console.log("Requesting delete action for project with id '" + project.id + "' . . .");
    console.log("WARNING: NOT YET IMPLEMENTED!!");
}