
<!-- Numbered sections:
 pandoc --number-sections md_file outputfile.html
 
 MarkDown base Help
Sub-heading
-----------
 
### Another deeper heading
 
Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a  
line break

Text attributes *italic*, **bold**, 
`monospace`, ~~strikethrough~~ .

A [link](http://example.com).
<<<   No space between ] and (  >>>

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain. 
 -->
 
TheTaskBoard Guide Page
=======

In this page you will find infos on the app.

Use Case
--------
The user can:
* Add a new project
* Modify an existing project
* Add a task to a project
* Modify an existing task
* delete a task
* delete a project

Application objects
-------------------

They are projects and task. Here is the project fields:
* id: this is a db-generated field, an integer;
* name: this is an identifier, like a serial number, or a code;
* description: the description of the project, with the milestones and the objectives;
* dateOpen: when the project starts;
* dateClose: when the project closes;
* dateLastModified: when the project had a change;
* status: status of the project;
* assignedTo: the assigner of the project (main referee);
* effort: time spent in doing the project;
* taskList: a list of task related to the project.

The task shares the same logical structure, with the exception that a task could not have
sons (how the hell can i represent it on a web page?? when i get it, i'll improve the app,
but for the moment . . . ). 

A note on angularJS factory and service
---------------------------------------

See [here](http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html) for details.

To declare the two types, you should write this:
    
    // Service is just a constructor function that will be called with 'new'
    app.service('MyService', function () 
    { 
        this.sayHello = function ( name ) { return "Hello from service, " + name + "!"; }
    });
    
    app.factory('MyFactory', function() 
    {
        return {
            sayHello: function(name) { return "Hello from factory, " + name + "!"; }
        }
    });

In every case, the output is the "same":
    
    app.controller('AppCtrl', function (MyService, MyFactory) {
        MyService.sayHello('Ciccio');
        MyFactory.sayHello('Ciccio');
    });
    
A first, manifest, difference is that `factory` returns something, while `service` doesn't. This is because 
what happen when we create a service is, ultimately, that an object is created, while when we create a 
factory, an object is returned. This is the key difference: in the `factory` case, **before** returning a value,
we can easily write code to manage, say, configuration stuff, conditional creation, and so on. 
Strictly speaking, the same thing is achievable also via service: in javascript, differently from Java, 
**a constructor function could return whatever it wants**! So we can insert the same code of `'MyFactory'` 
in the `'MyService'` definition, obtaining the same, identical result. 

The real difference is elsewhere.

In the angularJS source code, the  `.factory` method takes the two parameters (name and factory function) 
and returns a provider with the same name and with the `$get` method which is exactly our factory function. Then,
when we ask the injector for a factory dependency, it asks the corresponding provider for an instance
of that, by calling the `$get` method. 
When we create a service, __the `.service` method actually calls `.factory`__! The difference is that it
doesn't just pass the service function (the second parameter), but it passes a function that asks the injector to
instantiate an object with the given constructor:

    function factory(name, factoryFunction, enforce) 
    {
        return provider( name, 
                         {
                            $get: enforce !== false ? enforceReturnValue(name, factoryFunction) : factoryFunction ;
                         }
                       );
    }


    function service(name, serviceFunction)
    {
        return factory (name, 
                        [
                            '$injector', 
                            function( $injector ) {
                                return $injector.instantiate(serviceFunction);
                            }
                        ]
                       );
    }
    
What changes is the method called when, ultimately, the dependency is injected. In the `factory` case, the 
`factoryFunction` is called, via `$get` method of the provider. In the other case, it is the 
`instantiate` method that is called, which calls the `Object.create()`. It's the service case, and that's why
we find `this` in the service declaration.

### So, what the hell should I use?? a `factory` or a `service`??

Writing service in the way you write a factory is contra productive, since it's called as a constructor function,
so it should also be *used* as a constructor function.
The main difference in on the logical plane: 
* a service could be used as a factory but the opposite is not true;
* a service should be used as a constructor function, while a factory as a "normal" function.

Is there any advantage over the other at all then? Yes, there is. It turns out that it’s actually better to use 
services where possible, when it comes to migrating to [ES6](https://en.wikipedia.org/wiki/ECMAScript), the new
version of the script language specification implemented by the new version of Javascript. 

The reason for that is simply that a service is a constructor function and a factory is not. Working with 
constructor functions in ES5 allows us to easily use ES6 classes when we migrate to ES6.

For example, we can take our code and rewrite it in ES6 like this:

    class MyService 
    {
        sayHello() { console.log('hello'); }
    }

    app.service('MyService', MyService); // here is used the constructor, not the class!!

An ES6 class is really just a constructor function in ES5. We wrote about that in Using ES6 with Angular today, 
if you haven’t read that article yet, I’d recommend checking that out.

With factories, this is not possible because they are simply called as functions.  