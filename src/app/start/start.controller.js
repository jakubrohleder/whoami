(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .controller('StartController', StartController);

  /** @ngInject */
  function StartController($scope, $state, $timeout, Users) {
    $scope.user = Users.initialize();
    $scope.letsGo = letsGo;
    $scope.welcomeMessageShow = false;

    function letsGo() {
      $scope.user.save().then(resolved, rejected)
      console.log($scope.user);
      $scope.welcomeMessageShow = true;

      function resolved(argument) {
        console.log('resolved', argument);

        localStorage.setItem('userId', $scope.user.data.id)
        $timeout(function() {
          $state.go('in.menu');
        }, 1500);
      }

      function rejected(argument) {
        console.log('rejected', argument);
      }
    }
  }
})();
