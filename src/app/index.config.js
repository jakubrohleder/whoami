(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
