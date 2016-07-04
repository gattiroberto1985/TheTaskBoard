# The TaskBoard WebApp

Un'applicazione di gestione task con angularJS ed IndexedDB.

# Funzionalità

L'applicazione darà la possibilità:

- di creare dei _progetti_, e di gestirne l'evoluzione;
- di creare dei _task_ da associare ai progetti, e con eventuali dipendenze
  tra di loro;
- di creare dei _fask_, ovvero dei _fast-task_, svincolati da attività
  progettuali e indipendenti tra di loro. Idealmente corrispondono a piccole
  attività one shot o a delle idee da abbozzare che poi diventeranno
  eventualmente dei progetti.

Come struttura, i progetti e i task condividono le seguenti proprietà:

- `id`: un identificativo numerico univoco;
- `name`: un identificativo in stringa, con il titolo o il codice dell'attività;
- `description`: una descrizione del progetto/task, con riportate le finalità
  dell'attività, obiettivi, requisiti, ecc.;
- `assigner`: un assegnatario dell'attività, se esistente ed univoco; in
 generale, il responsabile dell'attività;
- `dateOpen`  : data creazione della richiesta;
- `dateWork`  : data inizio lavori;
- `dateEnd`   : data fine lavori;
- `dateClosed`: data chiusura effettiva della richiesta;
- `datePaused`: data sospensione attività;
- `status`    : stato dell'attività (vedi stati possibili);
- `statusNote`: note relative allo stato (es. motivo sospensione);
- `timeline`  : mappa con la cronistoria dell'attività; è un array di oggetti
 del tipo data azionamento - stato - note status.
- `notes`: note dell'attività (appunti, idee, memo, ...);

Per i progetti sarà anche definita una `taskList`, cioè un array di oggetti
tipo `task`, definiti per il progetto.

Infine, l'ultimo componente logico-funzionale della webapp saranno i già citati
_fask_, che saranno costituiti da un id, un titolo, una descrizione e un flag
che indica se il fask e' stato o meno completato.

## Navigazione dell'applicazione

Sostanzialmente avremo:

1. una pagina _taskboard_:

    - una sidebar con la lista di _fask_, la possibilità di inserirne di nuovi,
      di modificare gli esistenti, ecc. Tale sidebar dovrà essere a scomparsa
      laterale;

    - un pannello con una lista dei progetti, in cui vengono visualizzate solo
      alcune informazioni:

        - `name`;
        - `description`;
        - `status`;
        - `assigner`;

      Da ogni singolo progetto dovrà essere possibile accedervi, caricando di
      conseguenza la schermata dei task;
      La lista di progetti dovrà essere raggruppabile ed ordinabile per stato
      e/o assegnatario;

    - un pannello con un form di inserimento di un nuovo progetto. I requisiti
      minimi sono il nome dell'attività e la descrizione. Previa conferma di
      inserimento tramite dialog all'utente, dovrà essere aperta la relativa
      pagina di dettaglio.

2. una pagina _prjDetails_ di dettaglio del singolo progetto, che dovrà
   presentare:

    - un pannello collassabile con la sua cronistoria;

    - un pannello con le informazioni di testata (intestazioni, date, stato);

    - un pannello con le note associate al progetto; la lista dovrà permettere
      ricerche e filtri;

    - un pannello con la lista di task associati al progetto; la lista dovrà
      permettere il raggruppamento per stato e/o assegnatario e dovrà essere
      filtrabile;

    - un pannello con un form di inserimento di un nuovo task. Previa conferma
    di inserimento tramite dialog all'utente, dovrà essere aperta la relativa
    pagina di dettaglio.

    - la solita sidebar con i _fask_, sempre a disposizione.

3. una pagina _tskDetails_ di dettaglio del task selezionato, del tutto simile
   a quella dei progetti, privata ovviamente della componente relativa ai task.
   Anche in questo caso, la sidebar collassabile dei _fask_ sarà disponibile.

In tutte le pagine dovrà essere presente un menu di navigazione.

# Analisi tecnica

Si farà uso di angularJS per la parte di gestione GUI e di MVC. A livello di
database verrà utilizzato dapprima il LocalStorage, con l'obiettivo di creare
dei driver anche per IndexedDB e per MongoDB.
Dovrà essere possibile cambiare a scelta l'adapter, anche eventualmente
ricaricando l'applicazione.

A livello di CSS, si farà utilizzo di bootstrap.

## Configurazione angularJS


Si svilupperà una SPA (_single page application_), dove tramite routing angular
verranno visualizzati i componenti opportuni.

## Routing dell'applicazione

Le tre macro-view dell'applicazione saranno mappate su tre url differenti:

- pagina _taskboard_: mappata su url di root (o `/taskboard`);

- pagina _prjDetails_: mappata su url "rest"-style `/project/:prjId`;

- pagina _tskDetails_: mappata su url "rest"-style
  `/project/:prjId/task/:tskId`;

L'id dovrà sempre essere valorizzato, anche nel caso di progetto/task nuovo.

## Template e view

I tre template saranno definiti su file a sè stanti, residenti sotto la
directory `/pages`.

### Template della div relativa ai fask

La pagina è costituita da due `div`. La prima contiene un `form` di inserimento
nuovo fask, cosi' definito:

    <form name="newFask" >
        <!-- checkbox di completamento -->
        <input class="toggle" type="checkbox" ng-model="fask.completed" ng-change="toggleFaskCompleted(fask)">
        <!-- Campo di testo per inserimento titolo del fask -->
        <input  class="edit"
                ng-trim="false"
                ng-model="fask.title"
                fask-escape="revertEdits(fask)"
                ng-blur="saveEdits(fask, 'blur')"
                fask-focus="fask == editedFask"
                placeholder="Fask title..."></input>
        <!-- Area di testo per inserimento/modifica della descrizione del fask -->
        <textarea  class="edit"
                   ng-trim="true"
                   ng-model="fask.description"
                   fask-escape="revertEdits(fask)"
                   ng-blur="saveEdits(fask, 'blur')"
                   fask-focus="fask == editedFask"
                   placeholder="Write something to remember"></textarea>
    </form>

Per tale sezione sono stati definite nel controller della view le seguenti
funzioni:

- `toggleFaskCompleted(fask)`: imposta il fask come completato e salva le
   modifiche a db;
- `revertEdits(fask)`: esegue il rollback delle modifiche al fask, riportandolo
  alla versione iniziale;
- `saveEdits(fask, 'event')`: esegue il salvataggio dei dati del fask,
  aggiungendolo o aggiornandolo a db;

Sono state inoltre definite le direttive:

- `faskEscape`: viene eseguito il metodo qui sotto quando su un elemento viene
   scatenato un evento di `escape keydown`:

       'use strict';

       var ESCAPE_KEY = 27;

       return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                if (event.keyCode === ESCAPE_KEY) {
                    scope.$apply(attrs.todoEscape);
                }
            });

            scope.$on('$destroy', function () {
                elem.unbind('keydown');
            });
       };

- `faskFocus`: imposta il focus all'elemento corrente quando
  l'espressione passata e' `true`:

       'use strict';

       return function (scope, elem, attrs) {
           scope.$watch(attrs.todoFocus, function (newVal) {
               if (newVal) {
                   $timeout(function () {
                       elem[0].focus();
                   }, 0, false);
               }
           });
       };

E' inoltre presente una sezione con la lista totale di fask:

    <!-- Lista fasks -->
    <section id="fasksList" >
        <input id="toggle-all" type="checkbox" ng-model="allChecked" ng-click="markAll(allChecked)"></input>
        <label for="toggle-all">Mark all as complete</label>
            <ul id="fasks-list">
                <li ng-repeat="fask in fasks | filter:statusFilter track by $index" ng-class="{completed: fask.completed, editing: fask == editedFask}">
                <div class="view">
                    <input class="toggle" type="checkbox" ng-model="fask.completed" ng-change="toggleCompleted(fask)">
                    <label ng-dblclick="editFask(fask)">{{fask.title}}</label>
                    <button class="destroy" ng-click="removeFask(fask)"></button>
                </div>
                <form ng-submit="saveEdits(fask, 'submit')">
                        <input class="edit" ng-trim="false" ng-model="fask.title" fask-escape="revertEdits(fask)" ng-blur="saveEdits(fask, 'blur')" fask-focus="fask == editedFask"></input>
                </form>
            </li>
        </ul>
    </section>

Ed una sezione footer in cui vengono messi a disposizione dei filtri e un
riepilogo dei fask:

    <div id="fskList" ng-show="fasks.length" ng-cloak>
        <span id="fask-count"><strong>{{remainingCount}}</strong>
            <ng-pluralize count="remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
        </span>
        <ul id="filters">
            <li>
                <a ng-class="{selected: status == ''} " href="#/">All</a>
            </li>
            <li>
                <a ng-class="{selected: status == 'active'}" href="#/active">Active</a>
            </li>
            <li>
                <a ng-class="{selected: status == 'completed'}" href="#/completed">Completed</a>
            </li>
        </ul>
        <button id="clear-completed" ng-click="clearCompletedFasks()" ng-show="completedCount">Clear completed</button>
    </div>

### Template della view relativa ai progetti

### Template della view relativa ai task del progetto


## Controllers

## Services e factories

## Configurazione oggetti e DATABASE

### API indexedDB

### API MongoDB

### API LocalStorage
