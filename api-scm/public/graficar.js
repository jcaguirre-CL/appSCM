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
  var selectParametroDos = document.getElementById("parametroDosId");


  graficos.dataArray = [];
  graficos.array = [];

  graficos.placeParametroUno = "";
  graficos.placeParametroDos = "";


  graficos.labels = ["uno", "dos", "tres"];
  graficos.data = [300, 500, 100];
  graficos.options = {};

  graficos.formData = {};
  graficos.parametros = ["Responsable","Plataforma"];
  graficos.tipoGraficos = ["Circular","Lineal"];
  graficos.placePlataforma = "";
  graficos.valueParametroUno = "Parametro";
  graficos.valueParametroDos = "TipoGrafico";

  graficos.CurrentDate = new Date();

  graficos.selectParametroUno = function(){
    graficos.placeParametroUno = graficos.parametroUnoSelect;
    graficos.valueParametroUno = graficos.parametroUnoSelect;
    selectParametroUno.selectedIndex = 0;
    console.log('selec parametroUnoSelect' + graficos.valueParametroUno);
  };

  graficos.selectParametroDos = function(){
    graficos.placeParametroDos = graficos.parametroDosSelect;
    graficos.valueParametroDos = graficos.parametroDosSelect;
    selectParametroDos.selectedIndex = 0;
    console.log('selec parametroDosSelect' + graficos.valueParametroDos);
  };

  graficos.crearGrafico = function(parametro, tipografico ,fechaIni, fechaFin){

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
              var propertiesObjectpie3d = {
                type : "pie3d",
                id : "container-chart1",
                width : "500",//width of the chart
                height: "400",//height of the chart
                renderAt: "chart-container1",
                dataFormat:"json",
                dataSource: {
                    chart:{
                      // caption:"Utilizando Constructor mediante un obj json",
                      subCaption: "Listado de la totalidad de eventos por plataforma/periodo",
                      caption:"Eventos por: " + parametro,
                      captionFontSize: "14",
                      subcaptionFontSize: "10",
                      subcaptionFontBold: "0",
                      //bgColor:"EEEEEE,CCCCCC",
                      bgcolor: "#ffffff",
                      bgAlpha : "70,80",
                      bgRatio:"60, 40",
                      paletteColors: "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                      use3DLighting:0,
                      borderColor: "#EEEEEE",
                      exportEnabled: "1",
                      borderThickness:3,
                      use3DLighting: "0",
                      showShadow: "0",
                      enableSmartLabels: "0",
                      startingAngle: "0",
                      showPercentValues: "1",
                      showPercentInTooltip: "0",
                      decimals: "1",
                      captionFontSize: "14",
                      subcaptionFontSize: "14",
                      subcaptionFontBold: "0",
                      toolTipColor: "#ffffff",
                      toolTipBorderThickness: "0",
                      toolTipBgColor: "#000000",
                      toolTipBgAlpha: "80",
                      toolTipBorderRadius: "2",
                      toolTipPadding: "5",
                      showHoverEffect: "1",
                      showLegend: "1",
                      legendBgColor: "#ffffff",
                      legendBorderAlpha: "0",
                      legendShadow: "0",
                      legendItemFontSize: "10",
                      legendItemFontColor: "#666666",
                      useDataPlotColorForLabels: "1"
                    },
                data: items
                  }
              };
              var propertiesObjectmultiserieline2d = {
                type : "msline",
                id : "container-chart1",
                width : "500",//width of the chart
                height: "400",//height of the chart
                renderAt: "chart-container1",
                dataFormat:"json",
                dataSource: {
                  "chart": {
                      "caption": "Eventos registrados la ultima semana/mes/año",
                      "subCaption": "Evaluando en base a parametro: " + parametro,
                      "captionFontSize": "14",
                      "subcaptionFontSize": "14",
                      "subcaptionFontBold": "0",
                      "paletteColors": "#0075c2,#1aaf5d",
                      "bgcolor": "#ffffff",
                      "showBorder": "0",
                      "showShadow": "0",
                      "showCanvasBorder": "0",
                      "usePlotGradientColor": "0",
                      "legendBorderAlpha": "0",
                      "legendShadow": "0",
                      "showAxisLines": "0",
                      "showAlternateHGridColor": "0",
                      "divlineThickness": "1",
                      "divLineDashed": "1",
                      "divLineDashLen": "1",
                      "xAxisName": "Dias",
                      "showValues": "0"
                  },
                  "categories": [
                      {
                          "category": [//eje X
                              {
                                  "label": "Lun"
                              },
                              {
                                  "label": "Mar"
                              },
                              {
                                  "label": "Mie"
                              },
                              {
                                  "label": "Jue"
                              },
                              {
                                  "label": "Vie"
                              },
                              {
                                  "label": "Sab"
                              },
                              {
                                  "label": "Dom"
                              }
                          ]
                      }
                  ],
                  "dataset": [
                      {
                          "seriesname": "Plataforma1",
                          "data": [
                              {
                                  "value": "15"
                              },
                              {
                                  "value": "13"
                              },
                              {
                                  "value": "25"
                              },
                              {
                                  "value": "1"
                              },
                              {
                                  "value": "19"
                              },
                              {
                                  "value": "2"
                              },
                              {
                                  "value": "12"
                              }
                          ]
                      },
                      {
                          "seriesname": "Plataforma2",
                          "data": [
                              {
                                  "value": "1"
                              },
                              {
                                  "value": "10"
                              },
                              {
                                  "value": "20"
                              },
                              {
                                  "value": "10"
                              },
                              {
                                  "value": "10"
                              },
                              {
                                  "value": "10"
                              },
                              {
                                  "value": "2"
                              }
                          ]
                      }
                  ]
              }
            };

      if (tipografico === 'Circular') {
        var containerChart1 = new FusionCharts(propertiesObjectpie3d);
        containerChart1.render();
        graficos.array = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
      } else {
        var containerChart1 = new FusionCharts(propertiesObjectmultiserieline2d);
        containerChart1.render();
      }


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
