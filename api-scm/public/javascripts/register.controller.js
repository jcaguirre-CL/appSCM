(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', '$state'];
    function RegisterController(UserService, $location, $rootScope, FlashService, $state) {
        var vm = this;
        console.log('registrado');

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            console.log('registrado');

            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $state.transitionTo("login");
                        console.log('registrado');
                        // $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
