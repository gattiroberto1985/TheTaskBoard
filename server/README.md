# TheTaskBoard -- Componente Server

## Qualche piccolo, ulteriore, lume su `require`

`NodeJS` lavora a _moduli_, cioe', in prima approssimazione, degli oggetti
`JSON` che espongono metodi e proprieta'. Sostanzialmente, si può definire
un file sorgente del tipo:

    var aProperty = 'default_property_value';

    function aFunction( param1, param2)
    {
        return "I Am the first function return value!";
    }

    function anotherFunction( param1 )
    {
        return "I Am the another function return value!";
    }

Quanto fatto dall'espressione `require` con il passaggio di un modulo o di un
file contenente un modulo, e' quello di definire tale oggetto in memoria:

    require = function ( path ) {
        // Read the file and set it into a local object, say module.exports
        ...
        // then return it!
        return module.exports;
    }

Eseguire pertanto `require("./mymodule.js")` equivale alla seguente:

    var mymodule = {

        aProperty: 'default_property_value';

        aFunction: function( param1, param2)
        {
            return "I Am the first function return value!";
        }

        anotherFunction: function( param1)
        {
            return "I Am the another function return value!";
        }

    };

## ... e arriviamo all'applicazione

L'applicazione gira su un server nodejs, avviato tramite file `server.js`.

Il server ha il compito di:
- mettere a disposizione delle interfacce REST per la gestione del database
  mongodb;
- Gestire l'autenticazione degli utenti.

A tale scopo sono usate:

- la libreria `mongoose`, per la definizione degli schema mongodb;
- la libreria `resourcejs` per la trasposizione degli schema mongo verso
  le interfacce rest;
- la libreria `passport` per la gestione dell'autenticazione.

## Definizione schema per collezione mongodb

E' necessario definire un file `js`, qui posizionato sotto la directory
`models`, per ogni collezione mongodb. Quelle ad ora identificate sono:

- `project`: contiene le informazioni relative ad un progetto;
- `fask`: modello di "task veloce", attività one-shot, idee, suggerimenti, ecc.;
- `users`: utenti ammessi all'applicazione;
- `statuses`: collezione relativa agli stati del progetto/task;
- `tag`: collezione dei tag dei progetti.

Per ogni model andrà poi definito un `controller` in cui, tramite libreria
`resourcejs`, verranno create le interfacce REST per lo schema mongodb relativo.
La struttura e' relativamente semplice:

  // Getting the mongoose module and translating it in a REST API!
  var Resource = require('resourcejs');

  module.exports = function(app, route) {

    // Setup the controller for REST;
    //console.log( JSON.stringify ( app.models.user ) );
    Resource(app, '', route, app.models.user).rest();

    // Return middleware.
    return function(req, res, next) {
      next();
    };
  };

## Autenticazione
