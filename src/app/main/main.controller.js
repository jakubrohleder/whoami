(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $cable, cableURL, Conversations, user, conversations) {
    $scope.conversations = conversations;
    $scope.user = user;
    $scope.join = join;
    $scope.start = start;
    $scope.length = 1;

    Conversations.channel.on('created', function(){
      $scope.conversations = Conversations.all();
    });

    $scope.$watchCollection('conversations.data', function(conversations) {
      if(conversations === undefined) {
        return;
      }

      $scope.open = conversations.filter(function(conversation) {
        return conversation.data.attributes.status === 'open' && conversation.relationships.author !== user;
      });
    })

    function join() {
      if ($scope.open.length === 0) {
        console.log('No free conversations');
        return;
      }

      var conversation = $scope.open[Math.floor(Math.random() * $scope.open.length)];

      Conversations.channel.send({
        action: 'joined',
        conversation: conversation.data.id,
        user: user.data.id
      });

      $state.go('in.conversation', {id: conversation.data.id});
    }

    function start() {
      console.log('start');
      var conversation = Conversations.initialize();
      conversation.form.link('author', user);
      conversation.form.data.attributes.length = $scope.length;
      conversation.save().then(function(){
        $state.go('in.conversation', {id: conversation.data.id});
      }, function(err){
        console.log(err);
      });
    }
  }
})();
