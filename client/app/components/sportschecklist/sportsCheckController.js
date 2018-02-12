(function() {
  'use strict';

  angular
    .module('app')
    .component('sportsCheck', {
      templateUrl: 'app/components/sportschecklist/sportsCheckView.html',
      controller: "sportsCheckController as sportsCheckCtrl",
      bindings: {
        s: '=',
      },
    })
    .controller('sportsCheckController', sportsCheckController);


  function sportsCheckController(SpotsDataService, $uibModal, hobbies) {
    var vm = this;


    vm.$onInit = function() {
      vm.showButton = false;
      vm.tempArray = [];
      vm.hobbies = hobbies;
    }

    vm.openModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/components/sportsmodal/sportsModalView.html',
        controller: 'sportsModalController as sportsModalCtrl',
        resolve: {
          hobbies: function() {
            return vm.hobbies;
          }
        }
      });
      modalInstance.result.then(function(response) {
        vm.submit(JSON.parse(response));
      });
    }


    vm.submit = function(arr) {
      vm.s = [];
      for (var i = 0; i < arr.length; i++) {
        vm.s.push(arr[i]);
      }
    }

  };
})();