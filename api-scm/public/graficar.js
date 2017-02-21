(function () {
'use strict';
                                   //esta dependencia esta en chart.js
angular.module('angularGrafico', ["ng-fusioncharts" ,"720kb.datepicker" ,"ngRoute"])
.controller('Controlador1', Controlador1)
.service('GraficoService', GraficoService)
.config(function($routeProvider) {
  $routeProvider.when('/evaluar',{
      template: '<chart title="Line chart example" xData="lineChartXData" yData="lineChartYData" xName="Month" yName="Hit" subtitle="This is an example"></chart>',
      controller: Controlador1
      });
});

Controlador1.$inject = ['$q', 'GraficoService'];
function Controlador1($q, GraficoService) {
  var graficos = this;
  var objShared = {};
  var promise = {};
  var selectParametroUno = document.getElementById("parametroUnoId");

  graficos.dataArray = [];
  graficos.array = [];

  graficos.placeParametroUno = "";

  graficos.labels = ["uno", "dos", "tres"];
  graficos.data = [300, 500, 100];
  graficos.options = {};

  graficos.formData = {};
  graficos.parametros = ["Responsable","Plataforma"];
  graficos.placePlataforma = "";
  graficos.valueParametroUno = "Parametro";
  graficos.CurrentDate = new Date();

  graficos.selectParametroUno = function(){
    graficos.placeParametroUno = graficos.parametroUnoSelect;
    graficos.valueParametroUno = graficos.parametroUnoSelect;
    selectParametroUno.selectedIndex = 0;
    console.log('selec parametroUnoSelect' + graficos.valueParametroUno);
  };

  graficos.crearGrafico = function(parametro, fechaIni, fechaFin){

    if (parametro === 'Responsable') {
      graficos.array = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
    } else {
      graficos.array = ["plataforma1","plataforma2"];
    }

    var promises = [];

    for(var i = 0; i < graficos.array.length;i++){

        var promise = GraficoService.consulta3dvecesbyParameters(parametro.toLowerCase(), graficos.array[i], fechaIni, fechaFin);
        // console.log('Query: ' + parametro.toLowerCase());
        promises.push(promise);
        // console.log(promises);
      }
        $q.all(promises).
        then(function (dataArray) {
          // console.log(dataArray)
          graficos.dataArray = dataArray;
          console.log('Key: ' + graficos.array[0]);
          console.log('Value: ' + JSON.stringify(graficos.dataArray[0].data.value));//ok si devuelve un valor fijo
          console.log(parametro);
          var items = [];
          for (var i=0; i<graficos.array.length; i++){
            items.push({label:graficos.array[i], value:graficos.dataArray[i].data.value});
            // graficos.array[i] = graficos.dataArray[i].data.value;
}
          console.log(graficos.array);
                var propertiesObject = {
                  type : "pie3d",
                  id : "container-chart1",
                  width : "500",//width of the chart
                  height: "400",//height of the chart
                  renderAt: "chart-container1",
                  dataFormat:"json",
                  dataSource: {
                      chart:{
                        // caption:"Utilizando Constructor mediante un obj json",
                        caption:"Eventos por: " + parametro,
                        bgColor:"EEEEEE,CCCCCC",
                        bgAlpha : "70,80",
                        bgRatio:"60, 40",
                        paletteColors: "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                        use3DLighting:0,
                        borderColor: "#EEEEEE",
                        exportEnabled: "1",
                        borderThickness:3
                      },
                  data: items
                    }
                };
                var containerChart1 = new FusionCharts(propertiesObject);
                containerChart1.render();

        })
        .catch(function (errorResponse) {
          console.log("Problemas al conectar con la API");
          console.log(errorResponse.message);
        });
  };
}
//##########################################################################SERVICE
GraficoService.$inject = ['$q', '$http'];
function GraficoService($q, $http) {
  var service = this;

  service.consulta3dvecesbyParameters = function (key, value, fechaIni, fechaFin) {
    var d = $q.defer();
    var response = $http({
        method: "GET",
        url: ("/api/queryTimesbyparameters/"+key+"/"+value+"/"+fechaIni+"/"+fechaFin)
      });

      d.resolve(response);

      return d.promise;
  }

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
})();
