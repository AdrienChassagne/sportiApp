(function() {
  'use strict';

  angular
    .module('app')
    .service('SpotsDataService', SpotsDataService);


  function SpotsDataService($http) {
    this.markers = {};

    this.getSpotsInRange = function(url, selectedHobbies, callback) {
      var config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8;'
        }
      }
      $http({
        method: 'POST',
        url: url,
        data: {
          selectedHobbies: selectedHobbies
        }
      }).then(function(success) {
        callback(success.data);
      }, function(error) {
        console.log(error);
      });
    };
  }
})();