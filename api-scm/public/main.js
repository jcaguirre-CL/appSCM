(function () {
'use strict';

angular.module('angularRegistro', [])
.controller('Controlador1', Controlador1)
.controller('Controlador2', Controlador2)
.factory('ListFactory', ListFactory)
.factory('sharedList', sharedList)
.provider('Provider', Provider)
.service('FormularioService', FormularioService)
.service('ShoppingListService', ShoppingListService);
//.factory('Fact', Fact);
// .factory('Fact', function(){  return { Field: 'hola' };});
//.service('conectarApi', conectarApi);

Controlador1.$inject = ['FormularioService', 'Provider', 'sharedList', 'ListFactory', 'ShoppingListService', '$rootScope'];
function Controlador1(FormularioService, Provider, sharedList, ListFactory, ShoppingListService, $rootScope) {
  var formulario = this;
  var objShared = {};
  //var promise = sharedList.addItem(formulario.formData);
  //formulario.formData.titulo = "";
  //var lista = Provider;
  // formulario.items = lista.recuperarRegistros();

  formulario.text = "";

  formulario.formData = {};
  formulario.titulo = "";
  formulario.descripcion = "";
  formulario.plataforma = "";
  formulario.responsable = "";

  formulario.responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
  formulario.placeResponsable = "";
  formulario.plataformas = ["plataforma1","plataforma2"];
  formulario.placePlataforma = "";
  formulario.CurrentDate = new Date();

  //formulario.setNumber = ListFactory.setNumber(5);



  formulario.crearRegistro = function () {

    //FormularioService.crearRegistro(formulario);
    //formulario.setNumber = ListFactory.setNumber(10);
    //console.log('Controlador11: ' + ListFactory.getNumber());
    //lista.setLista('hola');
    formulario.formData.titulo = formulario.titulo;
    formulario.formData.descripcion = formulario.descripcion;
    formulario.formData.plataforma = formulario.plataforma;
    formulario.formData.responsable = formulario.responsable;

    //objShared = sharedList.addItem(formulario.formData);
    console.log('Controlador1: ' + formulario.formData.titulo);
    //ListFactory.setObjeto(formulario.formData);
    // $rootScope.shared = formulario.formData;
    FormularioService.crearRegistro(formulario.formData);
    $rootScope.shared = ShoppingListService.addItem(formulario.formData);
    //formulario.titulo = "";

    // var promise = FormularioService.recuperarRegistros();
    // promise.then(function (response) {
    //   lista = response.data;
    console.log('Controlador1 rootScope: ' + $rootScope.shared.titulo);
    // })
    // .catch(function (error) {
    //   console.log("Problemas al conectar con la API");
    // });
    // Fact.Field = 'cambio';
    //console.log('Controlador1; '+Fact);

    //busqueda.listado = FormularioService.recuperarRegistros().data;
  };

}

//################################################################CONTROLLER2
Controlador2.$inject = ['FormularioService', 'Provider', 'sharedList', '$scope', '$rootScope', 'ListFactory', 'ShoppingListService'];
function Controlador2(FormularioService, Provider, sharedList, $scope, $rootScope, ListFactory, ShoppingListService) {
  var busqueda = this;

  var objShared = {};

  var scope = $rootScope;
  //var promise = Fact;
  var promise = FormularioService.recuperarRegistros();
  scope.shared = {};
  busqueda.listado = [];
//  busqueda.objShared = ListFactory.getObjeto();
 console.log(promise);
  promise.then(function (response) {
    busqueda.listado = response.data;
    //   lista = response.data;
    console.log('Controlador2: ' + busqueda.listado);
  //   busqueda.listado = lista.data;
    })
    .catch(function (error) {
      console.log("Problemas al conectar con la API");
    });
  //busqueda.objShared = objShared;
//   busqueda.listado = scope.shared;
  //busqueda.listado = FormularioService.recuperarRegistros();


///el primer argumento debe ser un string o function
  scope.$watch("shared.titulo", function (newValue, oldValue, scope) {
    // busqueda.newItem = ShoppingListService.getnewItems();
    // busqueda.listado.push(ShoppingListService.getnewItems());  no funciono
    // busqueda.listado.push(scope.shared);
    promise = FormularioService.recuperarRegistros();

    promise.then(function (response) {
      busqueda.listado = response.data;
      //   lista = response.data;
      // console.log('Controlador2: ' + busqueda.listado);
    //   busqueda.listado = lista.data;
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });
    console.log('objeto modificado: ' + scope.shared.titulo);
  //   promise = FormularioService.recuperarRegistros();
  //
  //   //scope.listado = [];
  // //  busqueda.objShared = ListFactory.getObjeto();
  //  console.log(promise);
  //   promise.then(function (response) {
  //     busqueda.listado = response.data;
  //     //   lista = response.data;
  //     console.log('Controlador22: ' + busqueda.listado);
  //     // busqueda.listado = scope.listado;
  //   //   busqueda.listado = lista.data;
  //     })
  //     .catch(function (error) {
  //       console.log("Problemas al conectar con la API");
  //     });
    // busqueda.listado = FormularioService.crearRegistro(busqueda.newItem);
    //solo ocurre un avez pero funciona!!!
      //Do anything with $scope.letters
      //busqueda.objShared = objShared;
      //busqueda.listado = ShoppingListService.getItems();

      console.log('watch');
      // var promise = sharedList.getList();


  });

  //var lista = Provider;
  //busqueda.listado = lista.data;

  // busqueda.$watch('busqueda.number', function () {
  //        busqueda.number = ListFactory.getNumber();
  //    }
  // );


//  busqueda.listado = lista;
  //var test = promise.then.response.data;
  //console.log('controlador2: ' + busqueda.listado);

  //lista.item = "change";
  //busqueda.number = ListFactory.getNumber();
  //console.log('Controlador22: ' + busqueda.number);

  // $scope.$watch('busqueda.listado', function (newValue, oldValue, scope) {
  //     //Do anything with $scope.letters
  //     var promise = sharedList.getList();
  //     promise.then(function (response) {
  //       busqueda.listado = response.data;
  //     //   lista = response.data;
  //       console.log('Controlador2: ' + busqueda.listado);
  //     //   busqueda.listado = lista.data;
  //     })
  //     .catch(function (error) {
  //        console.log("Problemas al conectar con la API");
  //     });
  //
  // });


  //console.log('Controlador2: '+Fact);
}
////////////////////////////////////////////////
function ShoppingListService() {
  //***********PERMITE EXPONER EL customservice AL MUNDO EXTERIOR!!!!*****
  var service = this;

  // List of shopping items
  var items = {};

  service.addItem = function (objShared) {
    // var item = {
    //   titulo: objShared.titulo
    //
    // };
    items = objShared;
    console.log('Service: ' + items.titulo);
    return items;
  };

  service.getnewItems = function () {
    console.log('Service-getItems: ' + items.titulo)
    return items;
  };

  // return {
  //   addItem: service.addItem,
  //   getItems: service.getItems
  // };


}
//##########################################################################SERVICE
// ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
// function ShoppingListService($q, WeightLossFilterService) {
FormularioService.$inject = ['$http'];
function FormularioService($http) {
  var service = this;

  service.recuperarRegistros = function () {
      var response = $http({
        method: "GET",
        url: ("/api")
      });
      console.log('recuperar: ' + response.length);
      return response;
    };

  service.crearRegistro = function (registro) {
    $http.post('/api', registro)
    .success(function(data) {
            //console.log(data + 'holahola')
            //$scope.formData = {};
            // $http.get('/api')
            // .success(function(data) {
            //         //busqueda.formData = data;
            //         //return data;
            //         //console.log(busqueda + 'hola')
            // }).error(function(data) {
            //         console.log('Error: ' + data);
            // });
            console.log('Insertado:' + data);
    }).error(function(data) {
            console.log('Error:' + data);
    });
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };
}
//////////////////////////////////////////////////////////////////////
function sharedList($http) {
  //var  = "";

  return {
    addItem: addItem,
    getList: getList
  };

  function addItem(item) {
    $http.post('/api', item)
    .success(function(data) {
            //console.log(data + 'holahola')
    }).error(function(data) {
            console.log('Error:' + data);
    });

//    list.push(item);
  }

  function getList() {
    var response = $http({
      method: "GET",
      url: ("/api")
    });
    return response;
  }
}
///////////////////////////////////////////////////////////////////////////////
function ListFactory() {
  var objShared = {};


  function setObjeto(newObj) {
    objShared = newObj;
    console.log('ListFactory: ' + objShared.titulo);

    //return objShared;
  }

  function getObjeto() {
    console.log('ListFactory-getObjeto: ' + objShared.titulo);
    return objShared;
  }

  return {
    getObjeto: getObjeto,
    setObjeto: setObjeto
  };
  // var factory = function () {
  //   return new FormularioService();
  // };
//esta fabrica retorna una funcion..la cual en si retorna un custom service (objeto no singleton)
  //return factory;
}

//Provider.$inject = ['$http'];
function Provider() {
  var provider = this;
  var lista = {};

  //provider.defaults = {maxItems: 10};
//$get caracteriza el uso de los providers
  provider.$get = function () {
    // var promise = FormularioService.recuperarRegistros();
    // promise.then(function (response) {
    //   lista = response.data;
    // })
    // .catch(function (error) {
    //   console.log("Problemas al conectar con la API");
    // });
    //es como un factory
    // var shoppingList = new ShoppingListService(provider.defaults.maxItems);
//devuelve un objeto con la definicion de maxItems
    return lista;
  };

  provider.setLista = function(item) {
    // var promise = FormularioService.recuperarRegistros();
    // promise.then(function (response) {
    //   lista = response.data;
    // })
    // .catch(function (error) {
    //   console.log("Problemas al conectar con la API");
    // });
    // lista.item = item;
    return lista;
  };
}


// function Fact() {

    // return FormularioService.recuperarRegistros();
    // var promise = FormularioService.recuperarRegistros();
    // promise.then(function (response) {
    //   return response.data;
    // })
    // .catch(function (error) {
    //   console.log("Problemas al conectar con la API");
    // });

//esta fabrica retorna una funcion..la cual en si retorna un custom service (objeto no singleton)
// }

// conectarApi.$inject = ['$q', '$http'];
// function conectarApi($q, $http) {
//   var conectar = this;
//
//   conectar.recuperar = function () {
//     var deferred = $q.defer();
//
//     var result = {
//       message: ""
//     };
//
//     $http.get('/api')
//     .success(function(data) {
//             //en data esta el listado completo
//             console.log(data + ' hola recuperamos algo');
//             //return data;
//             deferred.resolve(data);
//     }).error(function(data) {
//             console.log('Error: ' + data);
//             result.message = "Stay away from cookies, Yaakov!";
//             deferred.reject(result);
//     });
//
//     console.log('deferred -----' + deferred.promise);
//     return deferred.promise;
//   };
// }


})();
