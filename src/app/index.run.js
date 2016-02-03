(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
