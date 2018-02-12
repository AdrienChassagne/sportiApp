(function() {
  'use strict';
  angular
    .module('app')
    .service('FavDataService', FavDataService);


  function FavDataService($http) {

    var config = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8;'
      }
    }
    var urlApi = 'http://localhost:3001/api/';

    this.createFav = function(title, callback) {
      $http({
        method: 'POST',
        url: urlApi,
        data: {
          name: title
        }
      }).then(function(success) {
        callback();
      }, function(error) {
        console.log(error);
      });
    };

    this.deleteFav = function(fav, callback) {
      $http({
        method: 'DELETE',
        url: urlApi + fav._id,
      }).then(function(success) {
        callback();
      }, function(error) {
        console.log(error);
      });
    }

    this.getFavs = function(callback) {
      $http({
        method: 'GET',
        url: urlApi,
      }).then(function(success) {
        callback(success.data);
      }, function(error) {
        console.log(error);
      });
    };

    this.setFavMark = function(fav, itemId, callback) {
      $http({
        method: 'PUT',
        url: urlApi,
        data: {
          _id: fav,
          newId: itemId
        }
      }).then(function(success) {
        callback(success.data);
      }, function(error) {
        console.log(error);
      });
    }

    this.removeBookOfFav = function(fav, itemId, callback) {
      console.log(fav, itemId);
      $http({
        method: 'PUT',
        url: urlApi + fav._id,
        data: {
          _id: fav,
          favToRemove: itemId._id
        }
      }).then(function(success) {
        callback(success.data);
      }, function(error) {
        console.log(error);
      });
    }
  }
})();