(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .controller('StartController', StartController);

  /** @ngInject */
  function StartController($scope, $state, Users) {
    $scope.user = Users.initialize();
    $scope.letsGo = letsGo;

    function letsGo() {
      $scope.user.save().then(resolved, rejected)
      console.log($scope.user);

      function resolved(argument) {
        console.log('resolved', argument);

        localStorage.setItem('userId', $scope.user.data.id)
        $state.go('in.menu');
      }

      function rejected(argument) {
        console.log('rejected', argument);
      }
    }
  }
})();
