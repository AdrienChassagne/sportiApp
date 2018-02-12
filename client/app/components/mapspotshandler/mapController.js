(function() {
  'use strict';

  angular
    .module('app')
    .component('mapSpotsHandler', {
      templateUrl: 'app/components/mapSpotsHandler/mapView.html',
      controller: "mapSpotsController as mapSpotsCtrl",
      bindings: {
        s: '<',
        m: '=',
        f: '<'
      },
    })
    .controller('mapSpotsController', mapSpotsController)

  function mapSpotsController(NgMap, SpotsDataService, FavDataService) {
    var vm = this;
    var sportApiUrl = "https://www.sportihome.com/api/spots/getAllMarkersInBounds/";
    var bounds;
    var currentUrl;

    vm.$onInit = function() {

      vm.key = "AIzaSyCO9Y6J9rubigOefi17Vpgvq3zidhuuso4";
      vm.urlApi = "https://maps.googleapis.com/maps/api/js?key=" + vm.key;

      vm.selectedHobbies = [];

      vm.mar = [];
      vm.map;

      NgMap.getMap().then(function(map) {
        vm.map = map;
        vm.bounds = vm.map.getBounds().toJSON();
        setupListener(vm.map);
      });

    }
    vm.$doCheck = function() {

      if (vm.map && vm.s.length > 0) {
        setIsFavorite();
        if (!sameMembers(vm.selectedHobbies, vm.s)) {
          vm.selectedHobbies = [];
          for (var i = 0; i < vm.s.length; i++) {
            vm.selectedHobbies.push(vm.s[i]);
          }
          currentUrl = sportApiUrl + vm.bounds.west + ',' + vm.bounds.south + '/' + vm.bounds.east + ',' + vm.bounds.north;
          SpotsDataService.getSpotsInRange(currentUrl, vm.selectedHobbies, function(success) {
            setMarkers(success);
          });
        }
      }
    }

    vm.createFavMark = function(mark) {
      vm.m = mark;
    }

    vm.setClass = function(hobby) {
      var className = "icon-" + hobby;
      return className;
    }

    var setIsFavorite = function(marker) {
      for (var i = 0; i < vm.f.length; i++) {
        for (var j = 0; j < vm.f[i].idList.length; j++) {
          if (vm.f[i].idList[j]._id === marker) {
            return true;
          }
        }
      }
      return false;
    }

    var containsAll = function containsAll(arr1, arr2) {
      return arr2.every(function(arr2Item) {
        return arr1.includes(arr2Item);
      });
    };

    var sameMembers = function sameMembers(arr1, arr2) {
      return containsAll(arr1, arr2) && containsAll(arr2, arr1);
    };

    var setupListener = function(map) {
      google.maps.event.addListener(map, 'idle', function() {
        setTimeout(function() {
          vm.bounds = vm.map.getBounds().toJSON();
          currentUrl = sportApiUrl + vm.bounds.west + ',' + vm.bounds.south + '/' + vm.bounds.east + ',' + vm.bounds.north;
          if (vm.s.length > 0) {
            SpotsDataService.getSpotsInRange(currentUrl, vm.selectedHobbies, function(success) {
              setMarkers(success);
            });
          }
        }, 400);
      });
    }

    var setMarkers = function(coords) {
      vm.mar = [];
      for (var i = 0; i < coords.length; i++) {
        vm.mar[i] = {
          name: coords[i].name,
          pos: [coords[i].loc.coordinates[1], coords[i].loc.coordinates[0]],
          _id: coords[i]._id,
          hobby: coords[i].hobby,
          favorite: setIsFavorite(coords[i]._id)
        };
      };
    };
  };
})();