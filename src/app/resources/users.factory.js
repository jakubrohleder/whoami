(function() {
  'use strict';

  angular.module('whoamiFrontend')
  .run(function(
    $jsonapi,
    apiURL
  ) {
    var schema = {
      type: 'users',
      id: 'uuid4',
      attributes: {
        name: {presence: true}
      },
      relationships: {
        messages: {
          type: 'hasMany',
          reflection: 'author'
        },
        conversations: {
          type: 'hasMany',
          reflection: false
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

    var localeSynchro = $jsonapi.sourceLocal.create('LocalStore synchronization', 'AngularJsonAPI');
    var restSynchro = $jsonapi.sourceRest.create('Rest synchronization', apiURL + '/users');
    var synchronizer = $jsonapi.synchronizerSimple.create([localeSynchro, restSynchro]);

    $jsonapi.addResource(schema, synchronizer);
  })
  .factory('Users', Users);

  function Users(
    $jsonapi
  ) {
    return $jsonapi.getResource('users');
  }
})();
