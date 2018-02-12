(function() {
  'use strict';

  angular
    .module('app')
    .component('home', {
      templateUrl: 'app/components/home/homeView.html',
      controller: "HomeController as homeCtrl",
    })
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;

    vm.$onInit = function() {
      vm.favorite = [];
      vm.selectedHobbies = [];
      vm.selectedMark = [];
      vm.title = 'SportiExo';
    };

  };
})();