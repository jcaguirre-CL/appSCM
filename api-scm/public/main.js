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

Controlador1.$inject = ['FormularioService', 'Provider', 'sharedList', 'ListFactory', 'ShoppingListService', '$rootScope'];
function Controlador1(FormularioService, Provider, sharedList, ListFactory, ShoppingListService, $rootScope) {
  var formulario = this;
  var objShared = {};
  var promise = {};
  var scope = $rootScope;
  var selectPlataforma = document.getElementById("plata");
  var selectResponsable = document.getElementById("resp");

  scope.sharedUno = {};

  formulario.formData = {};
  formulario.responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
  formulario.placeResponsable = "";
  formulario.plataformas = ["plataforma1","plataforma2"];
  formulario.placePlataforma = "";
  formulario.CurrentDate = new Date();

  formulario.selectPlataforma = function(){
    formulario.placePlataforma = formulario.plataforma;
    selectPlataforma.selectedIndex = 0;
    console.log('selec plataforma' + formulario.placePlataforma);
  };

  formulario.selectResponsable = function(){
    formulario.placeResponsable = formulario.responsable;
    selectResponsable.selectedIndex = 0;
  };

  formulario.crearRegistro = function () {
      if (formulario.titulo){
        formulario.formData.titulo = formulario.titulo;
        formulario.formData.descripcion = formulario.descripcion;
        formulario.formData.plataforma = formulario.plataforma;
        formulario.formData.responsable = formulario.responsable;

        console.log('Controlador1: ' + formulario.formData.titulo);

        promise = FormularioService.crearRegistros(formulario.formData);
        console.log(promise);

        promise.then(function () {
          $rootScope.shared = ShoppingListService.addItem(formulario.formData);

          console.log('Controlador1 rootScope: ' + $rootScope.shared.titulo);
          // formulario.formData = {};
          formulario.titulo = "";
          formulario.descripcion = "";
          formulario.plataforma = "";
          formulario.responsable = "";
          formulario.placeResponsable = "";
          formulario.placePlataforma = "";
          selectPlataforma.selectedIndex = 0;
          selectResponsable.selectedIndex = 0;
          })
          .catch(function (error) {
            console.log("Problemas al conectar con la API");
          });


    };
  };

  formulario.borrarRegistro = function (id) {

    promise = FormularioService.eliminarRegistros(formulario.registroID);
    promise.then(function () {
      // $rootScope.shared = ShoppingListService.addItem(formulario.formData);
      $rootScope.shared.titulo = "borrar";
      formulario.titulo = "";
      formulario.descripcion = "";
      formulario.plataforma = "";
      formulario.responsable = "";
      formulario.placeResponsable = "";
      formulario.placePlataforma = "";
      selectPlataforma.selectedIndex = 0;
      selectResponsable.selectedIndex = 0;
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });

    // console.log('deberia eliminar: ' + scope.shared.titulo);
  };

  scope.$watch("sharedUno.titulo", function (newValue, oldValue, scope) {

    formulario.titulo = scope.sharedUno.titulo;
    formulario.descripcion = scope.sharedUno.descripcion;

    // formulario.plataforma = scope.sharedUno.plataforma;
    // formulario.responsable = scope.sharedUno.responsable;
    formulario.placeResponsable = scope.sharedUno.plataforma;
    formulario.placePlataforma = scope.sharedUno.responsable;
    formulario.registroID = scope.sharedUno._id;
    console.log('id: ' + formulario.registroID);
    selectPlataforma.selectedIndex = 0;
    selectResponsable.selectedIndex = 0;

  });

}

//################################################################CONTROLLER2
Controlador2.$inject = ['FormularioService', 'Provider', 'sharedList', '$scope', '$rootScope', 'ListFactory', 'ShoppingListService'];
function Controlador2(FormularioService, Provider, sharedList, $scope, $rootScope, ListFactory, ShoppingListService) {
  var busqueda = this;
  var objShared = {};
  var promiseUno = {};
  var scope = $rootScope;
  var promise = FormularioService.recuperarRegistros();
  scope.shared = {};
  scope.sharedUno = {};
  busqueda.listado = [];
  busqueda.itemUno = {};

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

    console.log('promiseUno: '+promiseUno);
    promiseUno.then(function (response) {
      scope.sharedUno = response.data;
      //   lista = response.data;
      console.log('Controlador2 Uno promiseUno: ' + response.data.titulo);
    //   busqueda.listado = lista.data;
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });
  };

///el primer argumento debe ser un string o function
  scope.$watch("shared.titulo", function (newValue, oldValue, scope) {

    promise = FormularioService.recuperarRegistros();

    promise.then(function (response) {
      busqueda.listado = response.data;
      //   lista = response.data;
      // console.log('Controlador2: ' + busqueda.listado);
    //   busqueda.listado = lista.data;
      scope.shared.titulo = "";
      })
      .catch(function (error) {
        console.log("Problemas al conectar con la API");
      });
    console.log('objeto modificado: ' + scope.shared.titulo);
    console.log('watch');

  });
}
////////////////////////////////////////////////
function ShoppingListService() {
  //***********PERMITE EXPONER EL customservice AL MUNDO EXTERIOR!!!!*****
  var service = this;
  var items = {};

  service.addItem = function (objShared) {
    items = objShared;
    console.log('Service: ' + items.titulo);
    return items;
  };

  service.getnewItems = function () {
    console.log('Service-getItems: ' + items.titulo)
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
