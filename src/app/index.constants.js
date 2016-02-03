(function() {
  'use strict';
  var uuid4Regex = '[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}';

  angular
    .module('whoamiFrontend')
    .constant('uuid4regex', uuid4Regex)
})();
