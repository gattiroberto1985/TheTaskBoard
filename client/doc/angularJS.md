# AngularJS

# Generalita'


AngularJS è un framework javascript open source che fornisce gli strumenti per
lo sviluppo di *Single Page Application*, sfruttando il pattern MVC.

Il framework opera manipolando ed estendendo il codice HTML, permettendo ad
esempio la definizione di nuovi tag, tramite *direttive*; fornisce inoltre un
*data-binding* sincronizzato tra model e view (ogni modifica alla pagina è
riportata immediatamente al modello, senza la necessità di intervenire via DOM).

## Inclusione della libreria
Al solito, via statica o via CDN (recuperato al volo via rete):

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

Per la corretta attivazione del framework è poi necessario che ad un tag venga
dato l'attributo `ng-app[="nomeModuloAJS"]` (parte tra quadra è facoltativa).
Tipicamente si da' tale attributo al `body` o al tag `html`.

## Fasi di avvio della libreria

Di seguito le fasi di avvio di AngularJS:

1. Server invia il codice HTML al client;
2. il client processa il DOM contenuto nell'html;
3. Interviene AngularJS, che esegue la ricerca della direttiva `ng-app`,
identificando la root dell'applicazione; se trovato, viene:
    1. caricato l'eventuale modulo specificato all'interno di `ng-app`;
    2. creato l'*application injector*;
    3. elaborato il DOM finale modificato da AngularJS.

# Direttive

Costituiscono dei tag aggiuntivi, o degli attributi da dare a tag esistenti. In ogni caso, sono delle estensioni dell'HTML di base e sono caratterizzati dal prefisso `ng-`.
Alcune direttive predefinite più comuni sono le seguenti:

- `ng-app`: definisce l'elemento di root dell'applicazione, quello in cui
 andremo a definire tutta la parte di DOM che angular dovrà andare a gestire;
- `ng-model`: indica un campo (una variabile nello scope), in cui andare a
 registrare il contenuto del tag cui questa direttiva è appesa; il *binding*
 è immediato, ed ogni modifica alla variabile viene registrata immediatamente
 sul campo (e viceversa). Le modalità di aggiornamento possono essere
 specificate tramite un'opzione:

        ng-model-options="{updateOn: 'default blur', debounce: {default: 500, blur:0}}"

- `ng-bind`: indica che qui deve essere inserito il valore della variabile
 nello `$scope` specificata; una maniera del tutto equivalente e' quello di
  usare la sintassi `{{ espressione }}` per avere lo stesso effetto;
  all'interno di questa sintassi sono anche possibili operazioni aritmetiche,
  risoluzioni oggetto-campo, array, formattazioni, utilizzo dell'operatore
  ternario. NON è invece possibile:

    - riferirsi a variabili globali;
    - usare strutture condizionali (diverse dall'operatore ternario);
    - iterare;
    - usare blocchi try ... catch ;
    - dichiarare funzioni;
    - usare espressioni regolari.


- `ng-init`: tramtie questa direttiva, è possibile passare dei valori iniziali
 alle variabili specificate. E' possibile inizializzare array, json, e
 differenti variabili in un colpo solo. Tipicamente però, per questo tipo di
 compito, si utilizzano i `controller`.

 Per un piccolo esempio, vedere <a href="./examples/01.html">qui</a>.

        <!DOCTYPE html>
        <html>
            <head>
                <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
            </head>
            <body>
                <div ng-app="" ng-init="nome='Roberto'">
                    <p>Come ti chiami?:</p>
                    <div><input type="text" ng-model="nome"></div>
                    <p>Il mio nome è <strong ng-bind="nome"></strong></p>
                </div>
                </body>
        </html>


## Altre direttive

Nella maggior parte dei casi le direttive sono specificate tramite atttributi
speciali, ma non è raro trovarne sotto forma di elementi, classi o anche
commenti. Inoltre, è possibile definire delle direttive personalizzate, a
nostro uso e consumo.

- `ng-show` ed `ng-hide`: consentono di visualizzare o meno elementi sulla
pagina:

        <div ng-show="true">Questo è un test < /div>
        <div ng-hide="true">Questo è un test < /div>

- `ng-if`: consente di visualizzare porzioni di interfaccia utente in base ad
una condizione:

        <p ng-if="utente.nome || utente.cognome" >
                Hello {{ utente.cognome + ", " + utente.nome }}
        </p>

    notare che la direttiva **elimina** ciò che non viene visualizzato, a differenza di ng-hide;

- `ng-switch`: fa ciò che ci si aspetta:

        <p>Colore: <input type="text" ng-model="colore"></p>

        <div ng-switch="colore">
            <span ng-switch-when="rosso" style="color:red">{{colore}}</span>
            <span ng-switch-when="verde" style="color:green">{{colore}}</span>
            <span ng-switch-when="blu"   style="color:blue">{{colore}}</span>
            <span ng-switch-default      style="color:black">{{colore}}</span>
        </div>

- `ng-include`: permette l'inclusione di altri documenti all'interno del documento primario:

        <div ng-include="'dati/documento.html'"></div>

 il codice contenuto in dati/documento.html verrà interpretato da Angular
 (quindi potrà contenere direttive,ecc. ). Notare la presenza degli apici:
 **quello che va specificato è una stringa**.
All'interno può anche essere specificato un *caricamento condizionale*:

        <p>Eta': < input type="text" ng-model="utente.eta"></p>

        <div ng-include="utente.eta >= 18? 'dati/docMaggiorenni.html' : 'dati/docMinorenni.html'"></div>

 sono ammesse anche funzioni, purchè ritornino stringhe:

        <div ng-include="caricaDocumento(utente.eta)"> </div>

 e anche degli *inline template*, purchè preventivamente definiti sotto forma di script nel documento:

        <div ng-include="'/doc.html'"></div>
        <script type="text/ng-template" id="/doc.html">
            Corpo del documento
        </script>

- `ng-class`: specifica una espressione il cui risultato deve essere una
 classe CSS valida del documento. Un esempio può essere il seguente:

        <p>Crea la tua password: <input type="password" ng-model="password"></p>

        <p ng-class="{'rosso': password.length < 4, 'giallo': password.length >= 4 && password.length < 8, 'verde': password.length >= 8}">
            Robustezza della password
        </p>

- `ng-repeat`: utile per la generazione di elenchi di oggetti. Ad ogni
 ripetizione, viene inserita nello `$scope` una variabile di scope, definita
 `$index`. un esempio:

        <ul>
            <li ng-repeat="persona in persone">
                N. {{$index}} - {{persona.nome}} {{persona.cognome}}
            </li>
        </ul>

- `ng-option`: utile per generare elenchi o campi select:

        $scope.elencoCitta = [
            {codice: "RM", nome: "Roma", regione: "Lazio"},
            {codice: "LT", nome: "Latina", regione: "Lazio"},
            {codice: "MI", nome: "Milano" regione: "Lombardia"},
            {codice: "NA", nome: "Napoli" regione: "Campania"},
            {codice: "CO", nome: "Como" regione: "Lombardia"},
            {codice: "PA", nome:"Palermo", regione: "Sicilia"},
            {codice: "CA", nome: "Caserta" regione: "Campania"},
            {codice: "AV", nome: "Avellino" regione: "Campania"},
            {codice: "TP", nome:"Trapani", regione: "Sicilia"},
            {codice: "AG", nome:"Agrigento", regione: "Sicilia"}
        ];
        ...
        <select ng-model="selectedItem"
                ng-options="citta.codice as citta.nome group by citta.regione for citta in elencoCitta">
        </select>

 con questa `select` abbiamo raggruppato le citta' per regione, mostrando
 nella combo i nomi, ma dando a `selectedItem` il valore relativo al codice.

## Direttive ed eventi

AngularJS prevede una serie di direttive per la gestione degli eventi di interazione utente con la GUI. I più comuni sono:

- `ng-click`
- `ng-dbl-click`
- `ng-mousedown`
- `ng-mouseup`
- `ng-mouseenter`
- `ng-mouseleave`
- `ng-mousemove`
- `ng-mouseover`
- `ng-keydown`
- `ng-keyup`
- `ng-keypress`
- `ng-change`

Sono distinti dai gestori evento standard, più che altro per la fase in cui
vengono "tradotti": nel caso del gestore evento angularJS, la direttiva
subisce il controllo da parte di angular stesso, aumentando quindi le
potenzialità. L'importante è che ciò che viene eseguito sia all'interno dello
scope angular corretto. A tali funzioni è possibile passare un oggetto
`$event`, che rappresenta l'oggetto standard che descrive l'evento catturato
dal browser.

# Controller
Questo componente funge da `binder` tra il modello e la vista e
sostanzialmente si tratta di un oggetto javascript. E' necessario istruire
l'applicazione che dovrà fare uso di un controller, ed un modo per farlo è
usando la direttiva ng-controller e specificare il nome del controller da
utilizzare. Per rendere l'idea, l'applicazione sopra si può trasformare in:

    <!DOCTYPE html>
    <html>
        <head>
        <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
        <script>
            // Definisco il modulo angular, da richiamare in ng-app
            var app = angular.module('myApp', []);
            // Definisco il controller specificato in ng-controller
            app.controller('myCtrl', function($scope) {
                $scope.nome = "Roberto";
                $scope.cognome = "Gatti";
                // Definisco una funzione che ritorni il nome completo
                $scope.nomeCompleto = function () {
                    return "'" + cognome + ", " + nome + "'";
                }
            });
        </script>
        </head>
        <body>
            <div ng-app="myApp" ng-controller="myCtrl">
                <p>Come ti chiami?:</p>
                <div><input type="text" ng-model="nome"></div>
                <div><input type="text" ng-model="cognome"></div>
                <p>Il tuo nome è {{ nomeCompleto() }} >
            </div>
        </body>
    </html>

Nel javascript, sono stati definiti un `modulo`, `myApp`, il cui nome coincide
con quanto definito in `ng-app` e un `controller` che è stato impostato come
tale all'interno dell'applicazione. Il parametro passato in input al
controller, `$scope`, tecnicamente viene detta _dipendenza_ ed è compito del
`dependency injector` eseguire tale operazione. Attenzione che **ogni
controller ha il suo scope**.

## Gerarchie di `$scope`

Generalmente, i controller ereditano tutti i metodi e tutte le proprietà di
tutti i controller a loro superiori, e al cui interno essi si ritrovano
innestati. Particolare importanza ricopre lo scope `rootScope`.
Naturalmente una dipendenza tra i controller non è necessariamente
 un male, ma va usata _cum grano salis_, dato che si deve intervenire nel
 caso di refactoring dell'interfaccia grafica.

Notare che non necessariamente un controller deve ereditare uno scope. Questo
significa che il controller definirà un suo scope, e nella view le variabili
al suo interno dovranno essere referenziate specificando anche il suo nome:

    angular.module("myApp", [])
        .controller("userController",   
            function() {
                    this.utente = {nome: "Mario", cognome: "Rossi"};
    [ ... ]

    <div ng-controller="userController as userCtrl">
        <p>Nome: <input type="text" ng-model="userCtrl.utente.nome"></p>
        <p>Cognome: <input type="text" ng-model="userCtrl.utente.cognome"></p>
        <p>{{userCtrl.saluta()}}</p>
    </div>

## Alcune osservazioni sui controller

Attenzione alla separazione delle competenze: il controller deve **impostare
lo stato iniziale del modello dati** e **definire le funzionalità per la
view**. Un controller, per natura, non dovrebbe mai:

- Manipolare il DOM: compito a carico delle `direttive`;
- Formattare l'input: compito a carico dei `form Angular`;
- Formattare l'output: lo faranno i `filtri`;
- Condividere dati con altri controller: questo sarà un compito dei `provider`
 o di suoi simili (`service` e `factory`);
- Implementare funzionalità generali: l'implementazione di
funzionalità che non riguardano direttamente l'interazione tra dati
e view deve essere fatta nei servizi.

# Filtri

Sono componenti che hanno il compito di formattare o comunque applicare
una elaborazione al risultato di una espressione. Per utilizzarli, è
sufficiente l'uso dell'operatore pipe `|`:

    <p>{{"Hello Angular" | uppercase }}</p>

Tramite pipe si possono concatenare più filtri in sequenza.

## Filtri predefiniti

Di seguito una tabella con alcuni filtri predefiniti:

<table>
    <tr>
        <th>Nome filtro</th>
        <th>Descrizione</th>
    </tr>
    <tr><td>`lowercase`</td><td>Tasforma la stringa in caratteri minuscoli </td> </tr>
    <tr><td>`uppercase`</td><td>Tasforma la stringa in caratteri maiuscoli</td> </tr>
    <tr><td>`number`</td><td>Formatta un numero (`number: #cifre`)</td> </tr>
    <tr><td>`currency`</td><td>Formatta una valuta (`"valuta": #cifre`)</td> </tr>
    <tr><td>`date`</td><td>Formatta date</td> </tr>
    <tr><td>`orderBy`</td><td>Ordinamento array</td> </tr>
    <tr><td>`limitTo`</td><td>Estrae i primi `n` elementi di un array</td> </tr>
    <tr><td>`filter`</td><td>Estrae gli elementi di un array che soddisfano un determinato criterio</td> </tr>
</table>

## Filtri personalizzati

Si possono creare fitri personalizzati, con codice javascript del tipo:

    angular.module("myApp").filter("capitalize",   
        function(){
            return function(text){
                var result = text;
                if (isNaN(text)) {
                    result = text.charAt(0).toUpperCase() + text.substr(1);
                }
            return result;
        }
    });

ed è sufficiente richiarlo in questo modo:

    <p>{{"questo è un test" | capitalize}}</p>

# Servizi e factory
I servizi sono i componenti Angular che offrono funzionalità indipendenti
dall’interfaccia utente. Essi, in genere, consentono di implementare la
logica dell’applicazione, cioè le funzionalità che si occupano di elaborare
e/o recuperare i dati da visualizzare sulle view tramite i controller.

Un altro ruolo che possiamo attribuire ai servizi è quello della
condivisione di funzionalità accessibili dagli altri componenti
dell’applicazione: controller, filtri, direttive o altri servizi. Per
fare un esempio, supponiamo di aver bisogno di una funzione per il
calcolo del codice fiscale a partire dai dati anagrafici di una persona
e che tale funzione venga utilizzata da più componenti della nostra
applicazione Angular. Il modo migliore di gestire questa esigenza è la
sua implementazione come servizio.

## Definizione servizi

Da un punto di vista tecnico, i servizi AngularJS sono oggetti singleton:
di essi, quindi, esisterà una sola istanza accessibile dagli altri componenti
dell’applicazione. Le due principali modalità di creazione di un servizio
utilizzano i metodi `service()` e `factory()` dell’applicazione Angular.
La differenza tra i due è sottile e consiste nel fatto che `service()`
restituisce una istanza della funzione specificata nel corpo mentre
`factory()` restituisce il return code della funzione specificata nel corpo.

Sfruttando la _dependency injection_ è possibile utilizzare uno o più
servizi all'interno di un controller, impostando come parametro della
funzione del controller il nome dei servizi:

    angular.module("myApp").controller("myController",   
        function($scope, somma1, somma2) {
            $scope.x = somma1.somma(1,2);
            $scope.y = somma2(1,2)
    });

## Servizi per condivisione dati

La funzionalità principale dei servizi è quella di condividere dati
tra le varie componenti di un'applicazione. I servizi vanno _iniettati
come dipendenza_ ai vari controller che ne devono utilizzare le
funzionalità.
Ad esempio, consideriamo il caso di due view, una di inserimento stringa:

    <div ng-controller="cittaController">
        <p>Città: <input type="text" ng-model="nome"/></p>
        <p>Regione: <input type="text" ng-model="regione"/></p>
        <p><button ng-click="aggiungiCitta()">Aggiungi</button></p>
    </div>

ed una di elenco stringhe:

    <div ng-controller="elencoController">
        <ul>
            <li ng-repeat="citta in elencoCitta">{{citta.nome}}</li>
        </ul>
    </div>

In questo caso è utile definire un servizio, in questo modo:

    angular.module("myApp").service("elencoCitta", function() {
		this.elenco  = [
			{nome: "Roma", regione: "Lazio"},
			{nome: "Latina", regione: "Lazio"},
			{nome: "Milano", regione: "Lombardia"},
			{nome: "Napoli", regione: "Campania"},
			{nome: "Como", regione: "Lombardia"},
			{nome:"Palermo", regione: "Sicilia"},
			{nome: "Caserta", regione: "Campania"},
			{nome: "Avellino", regione: "Campania"},
			{nome:"Trapani", regione: "Sicilia"},
			{nome:"Agrigento", regione: "Sicilia"}
		];

		this.aggiungi = function(citta) {
			this.elenco.push(citta);
		};
    });

Alle due view corrisponderanno due controller distinti, con funzionalità
diverse: nello specifico, il `cittaController` dovrà mettere a disposizione
un metodo di inserimento:

    angular.module("myApp") .controller("cittaController", function($scope, elencoCitta) {
		$scope.aggiungiCitta = function() {
			elencoCitta.aggiungi({nome: $scope.nome, regione: $scope.regione});
		};
    });

mentre `elencoCitta` non necessita di particolari metodi:

    angular.module("myApp").controller("elencoController", function($scope, elencoCitta) {
		$scope.elencoCitta = elencoCitta.elenco;
	});

Il punto chiave è l'iniezione del servizio `elencoCitta` come parametro
della `function` che gestisce il controller. In questo modo, il servizio
è visibile da entrambi i controller, che ne potranno disporre a piacimento.

## Il servizio `$http`

Serve per effettuare delle chiamate ajax (Asynchronous Javascript And Xml), e
mette a disposizione un oggetto che fornisce i metodi per invocare i
corrispondenti metodi HTTP:

- `$http.get(url)` 	
- `$http.post(url, dati)`
- `$http.put(url, dati)`
- `$http.delete(url)`
- `$http.head(url)`

I metodi del servizio `$http` restituiscono delle *promise*, cioè degli
oggetti che consentono di gestire in maniera strutturata l’esito di
chiamate asincrone. Tali *promise* hanno a disposizione i seguenti metodi:

| Metodo      | Descrizione     |
|-------------|-----------------|
| `success()` | Esito positivo  |
| `error()`   | Esito negativo  |

che a loro volta espongono i parametri:

| Parametro | Descrizione |
|-----------|-------------|
| data      | Dati restituiti dal server |
| status    | http status code della richiesta |
| headers   | header della risposta |
| config    | configurazione della chiamata (l'oggetto passato come ultimo parametro alla chiamata) |

Esempio di `get` e gestione delle sue promises:

    angular.module("myApp").controller("elencoController", function($scope, $http) {
        $http.get("/elencoCitta")
			.success(function(data) {
				$scope.elencoCitta = data;
			})
			.error(function() {
				alert("Si è verificato un errore!");
			});
	});

Esempio di `post`:

    $http.get("/elencoCitta", { nome: $scope.name, regione: $scope.regione })

E' possibile passare a tutti i metodi un terzo paramero, un JSON con
questa struttura:

| Proprietà        | Descrizione |
|------------------|-------------|
|method            | metodo http da usare (inutile, di solito, visto che c'è il nome della funzione che fa fede) |
|url               | url della chiamata (come sopra) |
|params            | Oggetto JavaScript che rappresenta eventuali parametri da aggiungere in coda all’URL |
|headers           | Oggetto JavaScript che rappresenta gli header HTTP da inviare al server con la richiesta |
|timeout           | Tempo massimo di attesa di una risposta da parte del server espresso in millisecondi |
|transformRequest  | Funzione che può trasformare la richiesta prima di inviarla al server |
|transformResponse | Funzione che può trasformare la risposta prima di passarla all’applicazione |

# Form

## Validazione dati
AngularJS ha un insieme di direttive utili nella validazione delle form.
È importante premettere che il framework valida i controlli di una form
prima di copiare il loro valore sulle variabili del modello a cui sono
legate. Questo garantisce che il modello avrà sempre valori validi in
base ai vincoli impostati sui controlli delle form.
E' importante assegnare al form un nome (attributo `name`), perchè questo
consentirà di aggiungere allo `$scope` l'istanza del controller
automaticamente creata da angular.

Ad esempio:

    <form name="myForm">
	   <div ng-show="myForm.$dirty">Form modificata</div>
	   <div ng-show="myForm.$pristine">Form non modificata</div>
	   <input type="text" ng-model="utente.nome" >
    </form>

Analizzando le proprietà `$dirty` e `$pristine` dell’istanza della form
possiamo controllare il suo stato e visualizzare il messaggio opportuno
nel caso in cui sia stata modificata (`$dirty`) o se contiene i suoi valori
iniziali (`$pristine`).

Un’altra accortezza da prendere in considerazione è l’uso dell’attributo
`novalidate`. Questo evita che il browser possa considerare validi i dati
presenti sulla form ignorando i controlli di validazione di AngularJS.

Sui vari campi del form sono impostabili altri controlli:

    ng-class="{    ''            : myForm.nomeUtente.$pristine,
		           'validClass'  : myForm.nomeUtente.$valid,
				   'invalidClass': myForm.nomeUtente.$invalid}"

per dare classi diverse a seconda della validazione (notare `$valid`).
Di default angular mette a disposizione le classi:

- `ng-pristine`
- `ng-dirty`
- `ng-valid`
- `ng-invalid`

che vanno però definite tra i fogli di stile dell'applicazione.
In caso di problemi con la validazione, è disponibile un oggetto `$error`.
Le sue proprietà corrispondono al vincolo impostato (`ng-required`,
`ng-maxlength`, ..., senza `ng-` davanti).

## Invio dei dati

Oltre all'approccio standard HTML, angular mette a disposizione una
direttiva, `ng-submit`:

    <form name="myForm" ng-submit="invia(utente)" novalidate>

        <input type="text" ng-model="utente.nome"
	           name="nomeUtente" ng-maxlength="20"
		       ng-required="true">

	    <div ng-show="myForm.nomeUtente.$invalid">
	       Il nome utente è obbligatorio e non può superare i 20 caratteri
	    </div>

        <button type="submit">Invia</button>

    </form>

In questo caso abbiamo specificato l’invocazione della funzione di scope
`invia()` tramite la direttiva `ng-submit`. Quando l’utente clicca sul
pulsante di invio viene eseguita la funzione che si occupa di inoltrare
i dati al server avendo la possibilità di effettuare eventuali
pre-elaborazioni:

    $scope.invia = function(utente) {

	       $http.post("/elaboraForm", utente)
	          .success(function() { alert("Dati correttamente inviati!");})
	          .error(function() { alert("Si è verificato un errore!");});
        };

Un'alternativa altrettanto valida è quella di utilizzare la direttiva
`ng-click`.
Un'altra valida prassi è quella di disabilitare il button di invio dati
finchè il form non è valido:

    <button type="submit" ng-disabled="myForm.$invalid"
            ng-click="invia(utente)">Invia</button>

# Moduli AngularJS

I moduli sono dei contenitore di componenti, indipendenti dalla loro natura
e dalla loro collocazione fisica.
E' possibile definire delle dipendenze tra i vari moduli, similmente a
quanto eseguito coi controller:

    angular.module("NomeModulo", [ "moduloDipendente1", "moduloDipendente2", ...])

il secondo parametro deve esistere: alpiù sarà un array vuoto.
Ai moduli è possibile aggiungere controller, factory, service, con i metodi
usati in precedenza.

Oltre all’assemblaggio dei moduli che compongono la nostra applicazione,
possiamo sfruttare questo modulo principale per effettuare configurazioni
globali ed inizializzazioni. Queste attività si basano su due metodi
`config()` (pre-caricamento moduli) e `run()` (post-caricamento moduli)
che corrispondono a due fasi cronologicamente distinte dell’avvio di
un’applicazione Angular.

## Dependency injection

la dependency injection è un design pattern che delega ad un’entità esterna
il compito di individuare e fornire una risorsa di cui un oggetto ha
bisogno. Nel nostro caso, se un componente Angular, come ad esempio un
controller, ha bisogno delle funzionalità di messe a disposizione da un
servizio non deve fare altro che specificare il suo nome tra i parametri
della sua definizione:

    angular.module("myApp").controller("myController", function(myService) {
		// ...

		myService.metodo1();

		// ...
	});

In questo modo la nostra definizione di controller delega al framework
il compito di individuare l’oggetto myService e di renderlo disponibile
all’interno del nostro componente.

Angular individua il componente da iniettare basandosi sul nome del parametro.
Si possono anche usare le annotazioni (utili nel caso si faccia uso
di tool di minificazione tipo `UglifyJS`):

    angular.module("myApp").controller("myController",["myService1","myService2", function(x, y){...}]);

dove i primi `n` elementi dell'array sono stringhe che identificando
il valore delle variabili `x` ed `y` nell'argomento della funzione
che definisce il controller.

# Single Page Application

Consiste in una singola pagina web in cui sono a disposizione tutte le
viste necessarie al funzionamento dell'applicazione. Le viste vengono
create ed eliminate, mostrate e nascoste, utilizzando URL diversi nonostante
la pagina rimanga sempre la stessa. Il meccanismo che permette di
realizzare un sistema di questo tipo è il `routing`.

AngularJS supporta il routing tra viste tramite il servizio `$route`, il
cui utilizzo richiede l’introduzione di alcuni concetti ed una opportuna
configurazione. Ma procediamo per gradi introducendo i vari concetti tramite
un esempio concreto: la visualizzazione di un elenco di utenti con la
possibilità di vedere i dettagli di ciascun utente cliccando su un
elemento dell’elenco.
Il routing va importato nell'applicazione tramite script ad hoc:

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.min.js"></script>

e inserito come dipendenza nella nostra applicazione tramite codice:

    angular.module("myApp", ["ngRoute"]);

Il routing va quindi configurato opportunamente, e nell'esempio che usiamo
sarà una cosa del tipo:

    angular.module("myApp", ["ngRoute"]).config(function($routeProvider) {
        $routeProvider.when("/utenti", {
			         templateUrl: "/templates/listaUtenti.html",
			         controller: "listaUtentiCtrl"
		            })
                        // :userId indica che al routing sto passando un parametro!
                        // Tale parametro sarà poi recuperabile dal controller
                        // utenteCtrl tramite apposita variabile
		              .when("/utenti/:userId", {
			                templateUrl: "/templates/utente.html",
			                controller: "utenteCtrl"
	                })
				      .otherwise({redirectTo: "/utenti"});
    });

    // controller lista utenti
    angular.module("myApp").controller("listaUtentiCtrl", function($scope, utentiService) {
	   $scope.utenti = utentiService.utenti;
    });

Ogni url va configurato con un oggetto JSON, in cui dovrà essere
specificando il _template_ e il controller.
Una volta definito come mappare gli url, è necessario specificare _dove_
angular dovrà mostrare le view. Tale compito è a carico della direttiva
`ng-view`:

    <body ng-app="myApp">
        <div ng-view></div>
    </body>

I template possono essere salvati in tre modi:

- con parametro `template`, e il valore che lo definisce (il codice HTML);
- con parametro `templateUrl` e puntando ad un file esterno;
- con parametro `templateUrl` e puntando ad un oggetto tipo `<script id="nomeTemplateUrl"`
  nel codice HTML dell'applicazione (in questo caso si parla di
  _inline template_).

## Parametri del routing

Come detto, è possibile passare dei parametri al routing, che poi si occuperà
di passarli al controller che ha in gestione la view.
Nel nostro caso, abbiamo `:userId`, che verrà passato al controller
`utenteCtrl`, tramite servizio `$routeParams`. Per accedervi è sufficiente:

    angular.module("myApp").controller("utenteCtrl", function($scope, $routeParams, utentiService, filterFilter) {
		var userId = $routeParams.userId;
		$scope.utente = filterFilter(utentiService.utenti, { id: userId })[0];
	};

# Direttive personalizzate
Il ruolo delle direttive consiste nell’estendere le potenzialità
dell’approccio dichiarativo dell’HTML nella costruzione di interfacce
grafiche.

Un primo esempio per rendere l'idea:

    angular.module("myApp", []).directive("titolo", function() {
        return {
            template: "<h1>Questo è un titolo</h1>"
        };
    });

che nel codice HTML possiamo richiamare così (sono tutte equivalenti):

    <!-- come tag -->
    <titolo></titolo>
    <!-- come direttiva angular -->
    <div titolo> </titolo>

Questo tipo di scrittura è vincolabile tramite parametro `restrict` nel
`return` della funzione `directive`. I valori sono:

| Valore | Uso | Descrizione |
|--------|-----|-------------|
|`E`     | `<titolo></titolo>`         | Elemento HTML |
|`A`     | `<div titolo></div>`        | Attributo di elemento |
|`C`     | `<div class="titolo">`      | Classe  |
|`M`     | `<!--directive: titolo -->` | Commento |

In linea di massima, gli ultimi due sono rari (la classe è utile se poi si
va a definire un css). In generale è opportuno definire una direttiva come
elemento quando stiamo costruendo un componente autonomo, come ad esempio
un datepicker, una griglia, un menu. Definiremo una direttiva come attributo
quando intendiamo arricchire un elemento esistente di una nuova funzionalità.

## Scope isolato

Le direttive sono componibili, quindi all'interno di una posso utilizzare
ad esempio un `ng-model` o altro (vedi **Direttive -> Definizione combo
con valori preimpostati**).
Notare che **lo scope della direttiva è quello del controller in cui questa
è inserita**, e ciò potrebbe portare dei problemi.
Per ovviare a questo, garantendo una certa indipendenza delle direttive
dalle view e dai controller in cui sono utilizzate, si può usare uno
`scope` isolato, cioè di uno scope legato alla direttiva e mappabile con
valori provenienti dall’esterno:

    angular.module("myApp", []).directive("mySelectCity", function() {
		return {
			restrict: "E",
			templateUrl: "/mySelectCityTemplate.html",
			scope: {
				elencoCitta: "=cityList"
			}
		};
	});

La stringa `=cityList` definisce un attributo per la direttiva, da
valorizzare:

    <div ng-controller="myController">
        <my-select-city city-list="elencoCitta"></my-select-city>
    </div>

tramite la variabile `elencoCitta` definita nel controller. Questa
impostazione permette di definire più elementi all'interno di uno
stesso controller.

Ad essere precisi, rimarrebbe ancora un altro vincolo alla completa
indipendenza della nostra direttiva dal modello dei dati definito nel
controller: i nomi delle proprietà codice e nome della singola città
da utilizzare per il binding delle option nella select.

Possiamo gestire anche questa situazione effettuando il seguente
refactoring della soluzione inizialmente proposta:

    angular.module("myApp", []).directive("mySelectCity", function() {
		return {
			restrict: "E",
			templateUrl: "/mySelectCityTemplate.html",
			scope: {
				cityList: "=",
				cityDisplayProperty: "="
			}
		};
	});

    <script type="text/ng-template" id="/mySelectCityTemplate.html">
        <select ng-model="selectedItem" ng-options="city[cityDisplayProperty] for city in cityList"> </select>
    </script>

Le modifiche rispetto alla soluzione iniziale sono diverse. Innanzitutto
abbiamo ridefinito il template della direttiva sfruttando `ng-options`
al posto di `ng-repeat`, che rende più flessibile la soluzione e permette
di limitare ad una sola proprietà il numero di quelle necessarie per il
binding delle option.

Proprio per il binding, abbiamo parametrizzato il nome della proprietà
mappandola su un nuovo attributo della nostra direttiva:
`city-display-property`.

Da notare come nella mappatura tra “proprietà dello scope della direttiva”
e “attributo” abbiamo riportato semplicemente la stringa` ="..."` invece
della stringa che riportava lo stesso nome preceduto dall’operatore `=`.
In effetti, quando il nome della proprietà dello scope è corrispondente
al nome dell’attributo possiamo anche semplicemente specificare
l’operatore `=`; in altre parole, gli assegnamenti
`cityDisplayProperty: "=cityDisplayProperty"` e
`cityDisplayProperty: "="` hanno lo stesso significato.

In conclusione, la nostra direttiva sarà utilizzata nel seguente modo:

    <div ng-controller="myController">
    	<my-select-city city-list="elencoCitta" city-display-property="'nome'">
    	</my-select-city>
    </div>

Con questo accorgimento la nostra direttiva è totalmente indipendente
dalle scelte effettuate nel controller per assegnare i nomi delle
variabili. Lo scope isolato e gli attributi della direttiva ci permettono
di mappare i dati in maniera molto semplice ed efficace.

### Modalità di mappatura dello scope
Esistono tre modalità di mappatura tra l'interno della direttiva e
l'esterno:

|Operatore     | Simbolo   | Descrizione |
|--------------|-----------|-------------|
|uguale        | `=`       | associa le variabili di scope di direttiva a un attributo |
|chiocciola    | `@`       | usare le stringhe per indicare la variabile giusta da considerare nel binding |
|e-commerciale | `&`       | permette di valutare espressioni ed eseguire funzioni nel contesto dello scope del controller |

Di seguito i dettagli:

- `=` mette in corrispondenza la variabile esterna con la variabile
 interna tramite un binding bidirezionale;
-

# Dietro le quinte

## Two-way binding

Per la modifica del campo e le relative modifiche alla pagina è sufficiente
il modello standard ad eventi del DOM:

    <div>
	   Nome: <input type="text" id="txtNome"><br/>
	   <span id="spnMessaggio"></span>
    </div>

    <script type="text/javascript">
        var txtNome = document.getElementById("txtNome");
        txtNome.addEventListener("input", function(e) {
            var spnMessaggio = document.getElementById("spnMessaggio");
	        spnMessaggio.innerHTML = "Buongiorno " + e.target.value;
        });
    </script>

Lo stesso effetto è ottenuto con AngularJS senza bisogno di scrivere codice JavaScript:

    <div>
	   Nome: <input type="text" id="txtNome" ng-model="nome"><br/>

        <span id="spnMessaggio" ng-show="nome != null && nome != ''">Buongiorno {{nome}}</span>
    </div>

Angular crea un `watch` sulla variabile del modello dati e sull'elemento
dell'interfaccia utente; nel nostro caso, avremo un watch associato alla
variabile nome dal momento che è stata definita come variabile del
modello dei dati tramite la direttiva `ng-model`.
Quando si verifica un evento che modifica il contenuto della variabile
`nome`, come ad esempio, l’inserimento di un valore nella casella di
testo associata, viene automaticmanete avviato un processo di
valutazione chiamato `digest loop`.
Questo consiste nello scorrere la lista dei `watch` allo scopo di
individuare le variabili il cui valore è cambiato dall’ultima esecuzione
del loop. Se il valore di una variabile è cambiato, vengono eseguite le
opportune attività che consentono, ad esempio, di aggiornare il DOM
nei punti in cui la variabile è utilizzata.
Il digest loop termina quando non ci sono più aggiornamenti da eseguire.
Può però succedere che una variabile a cui è associato un `watch` venga
modificata proprio nel corso del `digest loop`, ad esempio perché il suo
valore dipendeva da un’altra variabile tenuta sotto controllo da un altro
`watch`. In questo caso il `digest loop` viene rieseguito fino a quando
non ci sono più variazioni a catena.

Questo meccanismo consente non solo di tenere aggiornata automaticamente
l’interfaccia utente, ma anche di mantenere sincronizzato il contenuto dei
controlli HTML con le variabili del modello associate. In altre parole, il
`digest loop` è il meccanismo che implementa il two-way binding di AngularJS.

Il `digest loop`e tutto il processo di valutazione dei `watch` è spesso
detto _contesto Angular_. L’espressione sta ad indicare il fatto che in
quella fase Angular prende il controllo della nostra applicazione e
sincronizza variabili e DOM. Il concetto è fondamentale per comprendere il
perché talvolta ci troviamo in situazioni in cui ci aspettiamo un
comportamento e invece l’effetto non è proprio quello atteso oppure
addirittura non accade proprio nulla.
Ad esempio:

    <div ng-controller="myCtrl">
        Numero: <input type="text" ng-model="numero"></br>
        <button id="btnRaddoppia">Raddoppia</button></br>
	    <span>{{doppio}}</span>
    </div>

    <script type="text/javascript">
        angular.module("myApp", []).controller("myCtrl", function($scope) {
            document.getElementById("btnRaddoppia")
            .addEventListener("click", function() {
                $scope.doppio = $scope.numero * 2;
	        });
        });
    </script>

Ci si attende che al click, venga raddoppiato il valore della casella di
testo. Tuttavia, inserendo un numero e cliccando sul pulsante non accade
proprio nulla. Abbiamo definito le due variabili di scope `numero` e
`doppio` utilizzate nella view e quindi Angular ha creato due watch per
monitorare la variazione dei loro valori. Però il clic sul pulsante non
ha avviato il `digest loop`. Eppure se seguiamo con un debugger il codice
JavaScript notiamo che al clic sul pulsante il codice del gestore d’evento
viene eseguito correttamente. Il problema è che _tale codice viene eseguito
fuori dal contesto Angular_ e pertanto non avviene la valutazione dei
`watch`, cioè non viene attivato il `digest loop`.
Per avviarlo nel contesto angular, va utilizzato `$apply`, modificando il
corpo dell'`addEventListener`:

    .addEventListener("click", function() {
        $scope.$apply(function() {
            $scope.doppio = $scope.numero * 2;
        });
    });

Il metodo `$apply()` si occupa essenzialmente di eseguire la funzione
passata come argomento e avviare subito dopo il `digest loop`.
Attenzione, che la chiamata ad `$apply` in contesto angular genera un errore!
Come regola generale sarebbe opportuno utilizzare le direttive predefinite
che Angular ci mette a disposizione. Questo ci evita in linea di massima di
dover utilizzare funzionalità interne come `$apply()`. La conoscenza degli
`internals` può comuque tornarci utile quando vogliamo integrare nel
contesto Angular funzionalità implementate in una libreria non-Angular.

## Creazione di `watch`

Se dovessimo per esempio eseguire una specifica attività quando cambia il
valore di una variabile, è necessario definire manualmente dei `watch`:

    $scope.$watch("doppio", function(newValue, oldValue) {
        if (newValue != oldValue)
		alert("Raddoppio in " + newValue);
    });

La firma del metodo è intuitiva, e contiene il nome della variabile del
modello su cui si desidera inserire il `watch` e una funzione da chiamare
in risposta all'evento di modifica. Tale funzione ha in input il vecchio
ed il nuovo valore della variabile.

Attenzione che di default, nel caso di oggetti, **un `watch` confronta i
riferimenti**, cioè viene considerata variazione di valore solo se la
variabile punta ad un nuovo oggetto. Per indicare ad angular che intendiamo
catturare anche le variazioni delle proprietà di un oggetto, bisogna
specificare un terzo parametro nel metodo `$watch()`, un boolean:

    persona.nome = "ciccio";
    ...
    $scope.$watch("persona", function(newValue, oldValue) {
		if (newValue != oldValue)
			alert("Il nuovo valore è " + newValue.nome);
	}, true); // con il true, se cambio persona.nome, la funzione
              // viene invocata!

# Altre utilita'

## Promises
Permettono una sorta di multithread in un ambiente tipicamente single-thread come
e' quello di javascript in un browser web.
              

# Snippet utili generici

## Direttive

### Definizione combo con valori preimpostati

    angular.module("myApp", []).directive("mySelectCity", function() {
		return {
			restrict: "E",
			templateUrl: "/mySelectCityTemplate.html"
		};
	});

    <script type="text/ng-template" id="/mySelectCityTemplate.html">
	   <select ng-model="selectedItem">
		     <option ng-repeat="citta in elencoCitta" value="citta.codice">{{citta.nome}}</option>
	    </select>
    </script>
