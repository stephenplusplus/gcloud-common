(function() {
  'use strict';

  angular
    .module('gcloud')
    .factory('util', util);

  /** @ngInject */
  function util() {
    function where(collection, source) {
      return collection.filter(function(obj) {
        return contains(obj, source);
      });
    }

    function contains(obj, source) {
      var key;

      for (key in source) {
        if (obj[key] !== source[key]) {
          return false;
        }
      }

      return true;
    }

    function findWhere(collection, source) {
      var subset = where(collection, source);

      if (subset.length) {
        return subset[0];
      }

      return null;
    }

    function arrify(thing) {
      return angular.isArray(thing) ? thing : [thing];
    }

    return {
      contains: contains,
      where: where,
      findWhere: findWhere,
      arrify: arrify
    };
  }

}());
