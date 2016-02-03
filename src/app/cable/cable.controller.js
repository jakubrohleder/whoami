(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .controller('CableController', CableController);

  /** @ngInject */
  function CableController(Conversations) {

    Conversations.channel.send({
      action: 'index'
    });
  }
})();
