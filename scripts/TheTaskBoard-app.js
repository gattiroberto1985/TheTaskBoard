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

var TTBAPP_NAV_PROJECTS_PAGE     = "/projects"; // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_PAGE         = "/tasks";    // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_PROJ_DETAILS_PAGE = "/project";  // ATTENTION: this value should match the one in the index.html!
var TTBAPP_NAV_TASK_DETAILS_PAGE = "/task";     // ATTENTION: this value should match the one in the index.html!


var TTBAPP_APP_NAME    = "TheTaskBoard App";
var TTBAPP_DESCRIPTION = "Task manager for the stupid guy!";
// Definizione modulo angular (attenzione al tag 'ng-app' nel template html!)
var TTBApp = angular.module(TTBAPP_MODULE_NAME, [ "ngRoute", "ngDialog" ] );

$(window).load(function () {
   console.log ( "Page loaded, hiding overlay . . . ") ;
     $("#overlay").hide();
    
});

(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };
})(jQuery);

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



/*// Definizione direttiva tooltip
app.directive('tooltip', function() {
    return {
        restrict: 'A',
        link: function() {
            var tooltipSpan, x, y;
            //Find the element which will contain tooltip
            tooltipSpan = document.getElementById('tooltip-span');
                
            //Bind mousemove event to the element which will show tooltip
            $("#tooltip").mousemove(function(e) {
                //find X & Y coodrinates
                x = e.clientX,
                y = e.clientY;
                    
                //Set tooltip position according to mouse position
                tooltipSpan.style.top = (y + 20) + 'px';
                tooltipSpan.style.left = (x + 20) + 'px';
            });  // chiude $("#tooltip").mousemove
        } // chiude link
    }; // chiude return
}); // chiude app.directive('tooltip')*/

// Definizione dei factory e dei services angular
// Definizione service project . . .
TTBApp.service(TTBAPP_SERVICE_PROJECTS, function() {
    // QUESTI DATI VANNO RECUPERATI DA DB!!!
    this.projects = [
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
                }, // closing first task of first project                 
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
    
    // Ritorna la lista completa di progetti
    this.getProjects = function () { return this.projects; }
    
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

TTBApp.controller(TTBAPP_CONTROLLER_PROJECT_DETAILS_NAME, function ( $scope, TTBProjectsSrv ) {
    
    var project = $scope.project;
    
    console.log( " project is " + project.id );
    
    
});

// Definizione controller task
TTBApp.controller(TTBAPP_CONTROLLER_TASKS_NAME, function ( $scope, TTBTasksSrv ) {
    
    // Recupero i task dal service . . .
    $scope.tasks = TTBTasksSrv.getTasks();
    
    console.log("There are " + $scope.tasks.length + " tasks to show!");
} ); // Chiude definizione controller TTBAPP_CONTROLLER_TASKS_NAME




// Definizione controller dei progetti
TTBApp.controller(TTBAPP_CONTROLLER_PROJECTS_NAME, function ( $scope, $location, TTBProjectsSrv, TTBTasksSrv, ngDialog ) { //TTBAPP_SERVICE_PROJECTS ) {
    
    // Inserisco nello scope del controller i progetti caricati dal service
    $scope.projects = TTBProjectsSrv.getProjects();
    
    $scope.getProject = function ( id ) { 
        for ( var project in $scope.projects )
            if ( project.id === id )
                return project;
    };
    
    // Definisco le callback utilizzate nel template HTML
    
    // Metodo di apertura progetto su pagina dedicata (details)
    $scope.openProject = function ( project ) { openProject(project, TTBTasksSrv, $location); };

    // Metodo di modifica rapida dei dati di testata del progetto
    $scope.editProject = function(project) {  editProjectHeader(project, ngDialog, $scope ); };

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

function editProjectHeader( project, ngDialog, $scope )
{
    console.log(". . Request for edit project: showing overlay and hiding container . . .");
    console.log ( ngDialog );
    $scope.project = project;
    ngDialog.open( { 
            template: 'templates/tpl_project_details.html',
            controller: "TTBProjectDetailsCtrl",
            class: "ngdialog-theme-flat",
            scope: $scope
        }
    );
    
    /*console.log("Hiding 'ul' element . . .");
    $( "#" + project.uniqueId ).siblings().hide(400);
    // Creo il clone per il project
    $("#" + project.uniqueId ).removeClass("col-md-4", 100).addClass("col-md-12", 100);
    
    //$("#prjShortHeader").show(400);
    console.log("Showing 'clonedDiv' element . . .");*/
    
}

function updateProject()
{
    console.log(". . Request for edit project: showing overlay and hiding container . . .");
    
    $("#" + project.uniqueId ).removeClass("col-md-12", 100).addClass("col-md-4", 100);
    $( "#" + project.uniqueId ).siblings().show(400);
    // Creo il clone per il project
    
}

function deleteProject( project )
{
    console.log("Requesting delete action for project with id '" + project.id + "' . . .");
    console.log("WARNING: NOT YET IMPLEMENTED!!");
}