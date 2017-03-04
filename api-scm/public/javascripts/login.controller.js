(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$state', '$scope'];
    function LoginController($location, AuthenticationService, FlashService, $state, $scope) {
        var vm = this;

        vm.login = login;
        console.log('inside LoginController');

        vm.test="qqqqqq";

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
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
    }

})();
