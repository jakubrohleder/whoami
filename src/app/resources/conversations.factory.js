(function() {
  'use strict';

  angular.module('whoamiFrontend')
  .run(function(
    $jsonapi,
    apiURL
  ) {
    var schema = {
      type: 'conversations',
      id: 'uuid4',
      attributes: {
        status: {},
        respondent: {},
        answer: {},
        length: {}
      },
      relationships: {
        messages: {
          included: true,
          type: 'hasMany'
        },
        author: {
          included: true,
          type: 'hasOne',
          model: 'users'
        },
        whoami: {
          included: true,
          type: 'hasOne',
          model: 'users'
        }
      },
      include: {
        get: [
          'messages.author'
        ]
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
    var restSynchro = $jsonapi.sourceRest.create('Rest synchronization', apiURL + '/conversations');
    var synchronizer = $jsonapi.synchronizerSimple.create([restSynchro]);

    $jsonapi.addResource(schema, synchronizer);
  })
  .factory('Conversations', Conversations);

  function Conversations(
    $jsonapi,
    $cable,
    $rootScope
  ) {
    var resource = $jsonapi.getResource('conversations');
    resource.channel = $cable.subscriptions.create({channel: 'ConversationsChannel'}, [
      'created',
      'joined'
    ]);

    console.log(resource.channel);

    resource.channel.on('connected', function(){
      console.log('Connected to Conversations!');
    });

    resource.channel.on('update', function(data){
      console.log('updated conversation', data);
    });

    return resource;
  }
})();
