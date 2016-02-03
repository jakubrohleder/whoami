(function() {
  'use strict';

  angular.module('whoamiFrontend')
  .run(function(
    $jsonapi,
    apiURL
  ) {
    var schema = {
      type: 'messages',
      id: 'uuid4',
      attributes: {
        text: {presence: true}
      },
      relationships: {
        conversation: {
          type: 'hasOne'
        },
        author: {
          type: 'hasOne',
          model: 'users',
          include: true
        }
      },
      functions: {
        toString: function() {
          if (!this.data.attributes.name) {
            return this.data.id;
          }

          return this.data.attributes.name;
        }
      }
    };

    // var localeSynchro = $jsonapi.sourceLocal.create('LocalStore synchronization', 'AngularJsonAPI');
    var restSynchro = $jsonapi.sourceRest.create('Rest synchronization', apiURL + '/messages');
    var synchronizer = $jsonapi.synchronizerSimple.create([restSynchro]);

    $jsonapi.addResource(schema, synchronizer);
  })
  .factory('Messages', Messages);

  function Messages(
    $jsonapi
  ) {
    return $jsonapi.getResource('messages');
  }
})();
