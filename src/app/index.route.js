(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, uuid4Regex) {
    $stateProvider
      .state('cable', {
        url: '/cable',
        templateUrl: 'app/cable/cable.html',
        controller: 'CableController'
      })
      .state('start', {
        url: '/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartController',
        resolve: {
          user: function($state, $q, $timeout) {
            var userId = localStorage.getItem('userId')

            if (userId !== null) {
              $timeout(function() {
                $state.go('in.menu');
              });

              return $q.reject();
            }
          }
        }
      })
      .state('in', {
        url: '',
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          user: function($state, $q, $timeout, Users) {
            var userId = localStorage.getItem('userId')
            var deffered = $q.defer();

            if (userId === null) {
              gotoStart();
            }

            var user = Users.get(userId);

            user.promise.then(function() {
              deffered.resolve(user);
            }, function() {
              localStorage.removeItem('userId');
              gotoStart();
            });

            return deffered.promise;

            function gotoStart() {
              $timeout(function() {
                $state.go('start');
              });
              deffered.reject();
            }
          }
        }
      })
      .state('in.menu', {
        url: '/',
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
