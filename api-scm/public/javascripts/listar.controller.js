// (function () {
//     'use strict';
//
//     angular
//         .module('app')
//         .controller('LoginController', LoginController);
//
//     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
//     function LoginController($location, AuthenticationService, FlashService) {

(function () {
    'use strict';

    angular
      .module('app')
      .factory('ListFactory', ListFactory)
      .controller('ListarController', ListarController)
      .factory('sharedList', sharedList)
      .provider('Provider', Provider)
      .service('FormularioService', FormularioService)
      .service('ShoppingListService', ShoppingListService);


//################################################################CONTROLLER2
ListarController.$inject = ['FormularioService', 'Provider', 'sharedList', '$scope', '$rootScope', 'ListFactory', 'ShoppingListService'];
function ListarController(FormularioService, Provider, sharedList, $scope, $rootScope, ListFactory, ShoppingListService) {
  var busqueda = this;
  var objShared = {};
  var promiseUno = {};
  var scope = $rootScope;
  var promise = FormularioService.recuperarRegistros();
  scope.shared = {};
  scope.sharedUno = {};
  busqueda.listado = [];
  busqueda.itemUno = {};

  busqueda.responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
  busqueda.operadores = ["operador1","operador2","operador3","operador4","operador5","operador6","operador7"];
  busqueda.programas = ["Teletrece AM","Teletrece Tarde","Teletrece","Teletrece Noche","Bievenidos","etc.."];

  busqueda.filtro1 = "";
  busqueda.filtroText1 = "";

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

  busqueda.marcarRegistro = function (id) {
    promiseUno = FormularioService.recuperarUno(id);
    scope.sharedUno = {};

    console.log('promiseUno: '+ promiseUno);
    promiseUno.then(function (response) {
      scope.sharedUno = response.data;
      //   lista = response.data;
      console.log('Controlador2 Uno promiseUno: ' + response.data.descripcion);
    //   busqueda.listado = lista.data;
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });
  };

///el primer argumento debe ser un string o function
  scope.$watch("shared.descripcion", function (newValue, oldValue, scope) {

    promise = FormularioService.recuperarRegistros();

    promise.then(function (response) {
      busqueda.listado = response.data;
      //   lista = response.data;
      // console.log('Controlador2: ' + busqueda.listado);
    //   busqueda.listado = lista.data;
      scope.shared.descripcion = "";
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });
    console.log('objeto modificado: ' + scope.shared.descripcion);
    console.log('watch');

  });
//////Filtros
busqueda.resetFiltro1 = function() {
  // set filter object as blank
  busqueda.filtro1 = "";
  busqueda.filtroText1 = "";
};
busqueda.resetFiltro2 = function() {
  // set filter object as blank
  busqueda.filtro2 = "";
};
busqueda.resetFiltro3 = function() {
  // set filter object as blank
  busqueda.filtro3 = "";
};
busqueda.aplicarFiltro1 = function() {
  // set filter object as blank
  busqueda.filtro1 = busqueda.filtroText1;
};

}
////////////////////////////////////////////////
function ShoppingListService() {
  //***********PERMITE EXPONER EL customservice AL MUNDO EXTERIOR!!!!*****
  var service = this;
  var items = {};

  service.addItem = function (objShared) {
    items = objShared;
    console.log('Service: ' + items.descripcion);
    return items;
  };

  service.getnewItems = function () {
    console.log('Service-getItems: ' + items.descripcion)
    return items;
  };

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

  service.recuperarUno = function (id) {
        var response = $http({
          method: "GET",
          url: ("/api/" + id)
        });
        console.log('recuperarUno: ' + response.data);
        return response;
      };

  service.crearRegistros = function (registro) {
    var response = $http({
      method: "POST",
      url: ("/api"),
      headers: {
        'Content-Type': 'application/json'
      },
      data: registro
    });
    console.log('Insertado: ' + registro);
    return response;
  };

  service.modificarRegistros = function (registroID, objeto) {
    var response = $http({
      method: "PUT",
      url: ("/api/" + registroID),
      heardes: {
      'Content-Type': 'application/json'
    },
    data: objeto
    });
    console.log('adentro del modificarRegistros: ' + response);
    return response;
  };

  service.eliminarRegistros = function(id) {
    var response = $http({
      method: "DELETE",
      url: ("/api/" + id),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Borrado: ' + response);
    return response;
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
    console.log('ListFactory: ' + objShared.descripcion);

    //return objShared;
  }

  function getObjeto() {
    console.log('ListFactory-getObjeto: ' + objShared.descripcion);
    return objShared;
  }

  return {
    getObjeto: getObjeto,
    setObjeto: setObjeto
  };

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

})();
