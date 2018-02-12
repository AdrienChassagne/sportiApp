(function() {
  'use strict';

  angular
    .module('app')
    .component('sportsModal', {
      templateUrl: 'app/components/sportsmodal/sportsModalView.html',
      replace: true,
      controller: "sportsModalController as sportsModalCtrl",
    })
    .controller('sportsModalController', sportsModalController);

  function sportsModalController($uibModalInstance, hobbies) {
    var vm = this;

    vm.$onInit = function() {
      vm.hobbies = hobbies;
      vm.tempArray = [];
      vm.cancelModal = function() {
        $uibModalInstance.dismiss();
      };

      vm.ok = function() {
        var submitArr = JSON.stringify(vm.tempArray)
        $uibModalInstance.close(submitArr);
      }
    };
    vm.toggleSelection = function(hobby) {
      var i = vm.tempArray.indexOf(hobby);
      if (i > -1) {
        vm.tempArray.splice(i, 1);
      } else {
        vm.tempArray.push(hobby);
      }
    };
  }

})();