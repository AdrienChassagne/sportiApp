(function() {
  'use strict';

  angular
    .module('app')
    .config(
      function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('/', {
            url: '/',
            templateUrl: 'app/views/home/homeView.html',
            controller: 'HomeController as homeCtrl',
          });
      }
    )
})();