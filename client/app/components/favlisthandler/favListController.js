(function() {
  'use strict';

  angular
    .module('app')
    .component('favList', {
      templateUrl: 'app/components/favlisthandler/favListView.html',
      controller: "favListController as favListCtrl",
      bindings: {
        m: '<',
        f: '='
      },
    })
    .controller('favListController', favListController)

  function favListController(FavDataService) {
    var vm = this;

    vm.$onInit = function() {

      vm.getFavs();
      vm.currentListId;
      vm.title;
      vm.displayAdd = false;
    }

    vm.addFav = function() {
      if (vm.title != '') {
        FavDataService.createFav(vm.title, function(success) {
          vm.getFavs();
        });
      } else {
        console.log('need valid name');
      }
    }

    vm.getFavs = function() {
      FavDataService.getFavs(function(success) {
        vm.favList = success.favs;
        vm.f = success.favs;
      })
    }

    vm.deleteFav = function(fav) {
      FavDataService.deleteFav(fav, function(success) {
        vm.getFavs();
      });
    }

    vm.addFavToList = function(fav) {
      var newFav = {
        _id: fav._id,
        name: fav.name
      };

      FavDataService.setFavMark(vm.currentListId._id, newFav, function(success) {
        vm.getFavs();
      });
    }

    vm.deleteFavItem = function(fav, item) {
      FavDataService.removeBookOfFav(fav, item, function(success) {
        vm.getFavs();
      });
    }

  };
})();