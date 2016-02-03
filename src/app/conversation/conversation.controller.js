(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .controller('ConversationController', ConversationController);

  /** @ngInject */
  function ConversationController($scope, $state, $cable, $timeout, Messages, conversation, user, cleverbot) {
    $scope.conversation = conversation;
    $scope.user = user;

    $scope.text = '';
    $scope.post = post;

    $scope.conversation.refresh();

    var conversationChannel = $cable.subscriptions.create({channel: 'ConversationChannel', id: conversation.data.id}, [
      'updated',
      'newMessage'
    ]);

    console.log($scope.conversation );

    conversationChannel.on('connected', function(){
      console.log('Connected to Conversation ' + conversation.data.id);
    });

    conversationChannel.on('updated', function(data){
      console.log('Updated ', data);
      $timeout(function(){
        $scope.conversation.refresh();
      }, 20);
    });

    conversationChannel.on('newMessage', function(data){
      console.log('New message ', data);
      $timeout(function(){
        $scope.conversation.refresh();
      }, 20);
    });

    $scope.disabled = disabled;
    $scope.showSurvey = showSurvey;
    $scope.answer = answer;

    function answer(argument) {
      conversation.form.data.attributes.answer = argument;
      conversation.save().then(function() {
        console.log('YOUR ANSWER WAS ', argument)
      });
    }

    function disabled() {
      return conversation.relationships.messages === undefined
        || conversation.data.attributes.status === 'open'
        || conversation.data.attributes.status === 'finished'
        || (user === conversation.relationships.whoami && conversation.relationships.messages.length%2 === 0)
        || (user === conversation.relationships.whoami && conversation.data.attributes.respondent === 'bot')
        || (user === conversation.relationships.author && conversation.relationships.messages.length%2 === 1)
    }

    function showSurvey() {
      return user === conversation.relationships.author
        && conversation.data.attributes.status === 'finished'
        && conversation.data.attributes.answer === null
      ;
    }

    $scope.$watch('conversation.relationships.messages.length', function(length) {
      if (user === conversation.relationships.whoami && length%2 === 1) {
        console.log('Clever response');
        cleverbot.ask("Just a small town girl", function (err, response) {
          console.log(response); // Will likely be: "Living in a lonely world"
          $timeout(function () {
            post(response);
          }, 500);
        });
      }
    })


    function post(text) {
      var message = Messages.initialize();

      console.log(conversation);

      message.form.data.attributes.text = text;
      message.link('author', user);
      message.form.link('author', user);
      message.link('conversation', conversation);
      message.form.link('conversation', conversation);

      message.save().then(function() {

      }, function(err){
        console.log(err);
      });

      $scope.text = '';
    }
  }
})();
