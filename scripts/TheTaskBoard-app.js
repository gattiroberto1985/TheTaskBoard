/******************************************************************************/
/*  
 * Script di definizione applicazione TheTaskBoard.
 *
 * FileName: ................ TheTaskBoard-app.js                  
 * Version : ................ 0.0.0.1                                         */
/******************************************************************************/

// Definizione variabili globali
var TTBAPP_MODULE_NAME              = "TTBApp";
var TTBAPP_CONTROLLER_TASKS_NAME    = "TTBTasksCtrl";
var TTBAPP_CONTROLLER_PROJECTS_NAME = "TTBProjectsCtrl";
var TTBAPP_CONTROLLER_HEADER_NAME   = "TTBHeaderCtrl";

var TTBAPP_APP_NAME    = "TheTaskBoard App";
var TTBAPP_DESCRIPTION = "Task manager for the stupid guy!";
// Definizione modulo angular (attenzione al tag 'ng-app' nel template html!)
var TTBApp = angular.module(TTBAPP_MODULE_NAME, [ "ngRoute" ] );



// Definizione della navigazione interna
TTBApp.config ( function ( $routeProvider ) {
    
}); // chiude definizione routing applicazione


// Definizione dei factory e dei services angular



// Definizione del controller per l'header di pagina (occhio alle dipendenza da
// $location!)
TTBApp.controller(TTBAPP_CONTROLLER_HEADER_NAME, function ($scope, $location ) {
	$scope.appDetails = {};
	$scope.appDetails.title = TTBAPP_APP_NAME;
	$scope.appDetails.tagline = TTBAPP_DESCRIPTION;
	
    // Navigazione con item tipo li (non necessaria, abbiamo unica pagina!)
	/*$scope.nav = {};
	$scope.nav.isActive = function(path) {
		if (path === $location.path() ) {
			return true;
		}
		
		return false;
	} */
    
}); // chiude definizione controller TTBAPP_CONTROLLER_HEADER_NAME




// Definizione controller task
TTBApp.controller(TTBAPP_CONTROLLER_TASKS_NAME, function ( $scope ) {

} ); // Chiude definizione controller TTBAPP_CONTROLLER_TASKS_NAME




// Definizione controller dei progetti
TTBApp.controller(TTBAPP_CONTROLLER_PROJECTS_NAME, function ( $scope ) {
    $scope.projects = [
        {
            id: 1,
            name: "PRJ-PROGETTO_1",
            description: "Progetto 1 -- descrizione",
            status: "OPEN",
            assignedTo: "Sherlock Holmes",
            taskList: [
                { 
                    id: 1,
                    description: "Control the room of the red studio",
                    assignedTo: "Sherlock Holmes",
                    status: "CLOSED",
                    notes: [ 
                        {
                            id: 1,
                            date: "12-08-2015 23:43:12",
                            text: "Found a body with scaring face. Wonder what cause it."
                        }, // closing note 1
                        {
                            id: 2,
                            date: "12-08-2015 23:45:00",
                            text: "Seems like the man have been poisoned. "
                        } // closing note 2                        
                    ] // closing note array
                }, // closing first task of first project 
                { 
                    id: 2,
                    description: "Searching for Jefferson Hope",
                    assignedTo: "Sherlock Holmes",
                    status: "OPEN",
                    notes: [ 
                        {
                            id: 3,
                            date: "13-08-2015 11:29:32",
                            text: "Asked to my boys to search JH"
                        } // closing note 1                       
                    ] // closing note array
                }, // closing first task of first project                 
            ]
        },
        {
            id: 2,
            name: "JPR-PROGETTO_2",
            description: "Progetto 2 -- descrizione",
            status: "BACKLOGGED"
        },
        {
            id: 1,
            name: "RPJ-PROGETTO_3",
            description: "Progetto 3 -- descrizione",
            status: "CLOSED"
        }];
} ); // Chiude definizione controller TTBAPP_CONTROLLER_PROJECTS_NAME