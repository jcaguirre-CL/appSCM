// var routerApp = angular.module('routerApp', ['ui.router']);

// routerApp.config(function($stateProvider, $urlRouterProvider) {
//
//     $urlRouterProvider.otherwise('/home');
//
//     $stateProvider
//
//         // HOME STATES AND NESTED VIEWS ========================================
//         .state('home', {
//             url: '/home',
//             templateUrl: 'partial-home.html'
//         })
//
//         // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
//         .state('about', {
//             // we'll get to this in a bit
//         });
//
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////



(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.router', '720kb.datepicker'])
        .config(config)
        .controller('SettingsController', ['$scope', function ($scope) {
          console.log('sadasdas');
        }])
        .controller('LoginController', ['$location', 'AuthenticationService', 'FlashService', '$state', '$scope', function ($location, AuthenticationService, FlashService, $state, $scope) {
              var vm = this;

              vm.login = login;
              console.log('INSIDELoginController');

              vm.test="qqqqqq";
              // console.log(vm.test);
              (function initController() {
                  // reset login status
                  AuthenticationService.ClearCredentials();
                  console.log('initController');

              })();

              function login() {
                  // vm.dataLoading = true;
                  console.log('login press button');
                  AuthenticationService.Login(vm.username, vm.password, function (response) {
                      if (response.success) {
                          AuthenticationService.SetCredentials(vm.username, vm.password);
                          // $location.path('/');
                          $state.transitionTo("#/home");
                          console.log('login success');

                      } else {
                          FlashService.Error(response.message);
                          vm.dataLoading = false;
                          console.log('login failed');

                      }
                  });
              };
          }])



        .run(run);

    // config.$inject = ['$routeProvider', '$locationProvider'];
    // function config($routeProvider, $locationProvider) {
    //   // if (!restrictedPage && loggedIn) {
    //     $routeProvider
    //         .when('/', {
    //             controller: 'HomeController',
    //             templateUrl: 'home.view.html',
    //             controllerAs: 'vm'
    //         })
    //
    //         .when('/login', {
    //             controller: 'LoginController',
    //             templateUrl: 'login.view.html',
    //             controllerAs: 'vm'
    //         })
    //
    //         .when('/register', {
    //             controller: 'RegisterController',
    //             templateUrl: 'register.view.html',
    //             controllerAs: 'vm'
    //         })
    //
    //         .when('/ingresarRegistro', {
    //             controller: 'RegistrarController',
    //             templateUrl: 'registrar.evento.view.html',
    //             controllerAs: 'formulario'
    //         })
    //
    //         .otherwise({ redirectTo: '/login' });
    //     // }
    // }
///////////////////////////////////nuevo config para ui VIEWS

          config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider'];
          function config($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {

          /////// .config(function($stateProvider, $urlRouterProvider)
            // if (!restrictedPage && loggedIn) {
              // $urlRouterProvider.otherwise('/login');
              $stateProvider

                  // HOME STATES AND NESTED VIEWS ========================================
                  .state('home', {
                    url: '/',
                    views: {
                      'bloqueup': {
                      controller: 'HomeController',
                      templateUrl: 'home.view.html',
                      controllerAs: 'vmqqq'
                      }
                    }

                  })
                  .state('login', {
                    url: '/login',
                    views: {
                      'bloqueup': {
                        templateUrl: 'login.view.html',
                        // controller: function($scope){
                        //     console.log('controller');
                        // }
                        controller: 'LoginController',

                        controllerAs: 'vm'
                        // authenticate: false
                      }
                    }
                  })
                  .state('register', {
                    url: '/register',
                    views: {
                      'bloqueup': {
                      controller: 'RegisterController',
                      templateUrl: 'register.view.html',
                      controllerAs: 'vmqqqq'
                      // authenticate: false
                    }
                    }
                  })
                  .state('registrar', {
                    url: '/registrar',
                    views: {
                      controller: 'RegistrarController',
                      templateUrl: 'registrar.view.html',
                      controllerAs: 'formulario'
                    }
                  })
                  .state('listar', {
                    url: '/listar',
                    views: {
                      controller: 'ListarController',
                      templateUrl: 'listar.view.html',
                      controllerAs: 'busqueda'
                    }
                  })

                  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                  // .state('about', {
                  //     // we'll get to this in a bit
                  // });


            // }

          }
//////////////////////////////////fin nuevo config

        run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$state'];
        function run($rootScope, $location, $cookieStore, $http, $state) {
            // keep user logged in after page refresh

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
              console.log('currentUser');

                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                console.log('locationChangeStart');

                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    console.log('restrictedPage');

                    $state.transitionTo("login");
                    event.preventDefault();

                    // $location.path('/login');
                }
            });
        }

    })();

  //   angular.module("myApp").run(function ($rootScope, $state, AuthService) {
  // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //   if (toState.authenticate && !AuthService.isAuthenticated()){
  //     // User isn’t authenticated
  //     $state.transitionTo("login");
  //     event.preventDefault();
  //   }
  // });
// });
