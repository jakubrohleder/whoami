(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, uuid4Regex) {
    $stateProvider
      .state('start', {
        url: '/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartController',
        resolve: {
          user: function($state) {
            var user = localStorage.getItem('user')

            if (user !== null) {
              $state.go('in.start');
            }

            return user;
          }
        }
      })
      .state('in', {
        url: '',
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          user: function($state) {
            var user = localStorage.getItem('user')

            if (user === null) {
              $state.go('start');
            }

            return user;
          }
        }
      })
      .state('in.start', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        resolve: {
          conversations: function(Conversations) {
            return Conversations.all();
          }
        }
      })
      .state('in.conversation', {
        url: '/{id:' + uuid4Regex + '}',
        templateUrl: 'app/conversation/conversation.html',
        controller: 'ConversationController',
        resolve: {
          conversation: function(Conversations, $stateParams) {
            return Conversations.get($stateParams.id);
          }
        }
      })
    ;


    $urlRouterProvider.otherwise('/');
  }

})();
