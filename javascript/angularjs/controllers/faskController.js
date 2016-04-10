
/**
 * Definizione del controller relativo alla view dei fast-tasks.
 *
 * The controller:
 *    - retrieves and persists the model via the todoStorage service
 *    - exposes the model to the template and provides event handlers
 *
 * Il modello fask mette a disposizione:
 *
 *  - funzionalita' di controllo sullo stato dei vari fask (e.g. $watch-es );
 *  - i metodi di wrapping per modifica, aggiunta, rimozione e rollback dei
 *    fask;
 */
TTBApp.controller("fasksCtrl", function ($scope, $routeParams, $filter, store) {
    console.log(" [ AJS ] [ fasksCTRL ] Entering fask controller. . .");

    var store = store.faskStore;

    // Variabile di scope per la memorizzazione temporanea di un nuovo fask
    $scope.newFask = { };
    // Variabile di scope per la memorizzazione del fask modificato
    $scope.editedFask = null;

    // Array con tutti i fask censiti nello strato di persistenza
    // TODO: retrieve them via persistenceService!
    //var fasks = $scope.fasks = store.fasks;
    var fasks = $scope.fasks = [
        {
            id: 1,
            completed: false,
            title: "Fast task #1"/*,
            description: "Fast task #1 -- This is the description!"*/
        },
        {
            id: 2,
            completed: false,
            title: "Fast task #2"/*,
            description: "Fast task #2 -- This is the description!"*/
        },
        {
            id: 3,
            completed: false,
            title: "Fast task #3"/*,
            description: "Fast task #3 -- This is the description!"*/
        },
        {
            id: 4,
            completed: false,
            title: "Fast task #4"/*,
            description: "Fast task #4 -- This is the description!"*/
        },
    ];

    // Watch per il controllo dello stato dei fasks
    $scope.$watch('fasks', function () {
        $scope.remainingCount = $filter('filter')(fasks, { completed: false }).length;
        $scope.completedCount = fasks.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);

    // Event handler per il controllo del routing per modifiche e sistemazione
    // del filtro
    $scope.$on('$routeChangeSuccess', function () {
        var status = $scope.status = $routeParams.status || '';
        $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : {};
    });

    // Wrapping per lo strato di persistenza

    // Aggiunta fask
    $scope.addFask = function () {
        console.log(" [ CTRL FASK ] Adding new fask to persistence layer . . .");
        console.log(" [ CTRL FASK ] |-- Defining new fask . . .")
        var newFask = {
            title: $scope.newFask.trim(),
            completed: false
        };

        if (!newFask.title) {
            console.log(" [ CTRL FASK ] |-- WARNING: no title defined for fask!");
            return;
        }

        console.log(" [ CTRL FASK ] |-- Saving new fask . . .");
        $scope.saving = true;
        store.insert(newFask)
            .then(function success() {
                console.log(" [ CTRL FASK ] Fask saved!");
                $scope.newFask = '';
            })
            .finally(function () {
                $scope.saving = false;
            });
    } ;

    // Rimozione fask
    $scope.deleteFask = function (fask) {
        console.log(" [ CTRL FASK ] Deleting fask from persistence layer . .. ");
        store.delete(fask);
    };

    // Switch per la modifica di un fask nella view
    $scope.editFask = function(fask) {
        $scope.editedFask = fask;
        // Clone the original todo to restore it on demand.
        $scope.originalFask = angular.extend({}, fask);
    };

    // Gestione rollback modifiche del fask
    $scope.rollbackEdits = function(fask) {
        fasks[fasks.indexOf(fask)] = $scope.originalFask;
        $scope.editedFask = null;
        $scope.originalFask = null;
        $scope.reverted = true;
    };

    // Gestione salvataggio modifiche fask
    $scope.saveEdits = function (fask, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && $scope.saveEvent === 'submit') {
            $scope.saveEvent = null;
            return;
        }

        $scope.saveEvent = event;

        if ($scope.reverted) {
            // Fask edits were reverted-- don't save.
            $scope.reverted = null;
            return;
        }

        fask.title = fask.title.trim();

        if (fask.title === $scope.originalFask.title) {
            $scope.editedFask = null;
            return;
        }

        store[fask.title ? 'put' : 'delete'](fask)
            .then(function success() {}, function error() {
                fask.title = $scope.originalFask.title;
            })
            .finally(function () {
                $scope.editedFask = null;
            });
    };

    // Rimozione fask completati
    $scope.clearCompleted = function () {
        store.clearCompleted();
    };

    // Gestione flag fask completato
    $scope.toggleFaskCompleted = function (fask, completed) {
        if (angular.isDefined(completed)) {
            fask.completed = completed;
        }
        store.put(fask, fasks.indexOf(fask))
            .then(function success() {}, function error() {
                fask.completed = !fask.completed;
            });
    };

    // Gestione flag fask completati (tutti i fask)
    $scope.toggleAllFasksCompleted = function (completed) {
        fasks.forEach(function (fask) {
            if (fask.completed !== completed) {
                $scope.toggleCompleted(fask, completed);
            }
        });
    };

});
