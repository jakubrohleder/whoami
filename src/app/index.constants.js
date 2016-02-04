(function() {
  'use strict';
  var uuid4Regex = '[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}';
  var Cleverbot = require('cleverbot');

  angular
    .module('whoamiFrontend')
    .constant('uuid4Regex', uuid4Regex)
    .constant('apiURL', '//localhost:5002')
    .constant('cableURL', 'ws://localhost:5002/cable')
    .constant('Cable', window.ActionCableReact.Cable)
    .constant('$cable', window.ActionCableReact.ActionCable.createConsumer('ws://localhost:5002/cable'))
    .constant('cleverbot', new Cleverbot('HlgZbIBb8jpa7HxE', 'PLhnwSBIeuGvDRPQWi0jlpHgwKwfVnwS'))
    .constant('Favico', Favico)
  ;
})();
