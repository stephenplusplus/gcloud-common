(function() {
  'use strict';

  angular
    .module('gcloud')
    .factory('DeeplinkService', DeeplinkService);

  /** @ngInject */
  function DeeplinkService($timeout, $anchorScroll) {
    var TIMEOUT = 250;

    $anchorScroll.yOffset = 70;

    function watch($scope, callback) {
      return $scope.$watch(callback, scrollTo);
    }

    function scrollTo(section) {
      return $timeout($anchorScroll, TIMEOUT, null, section);
    }

    return {
      watch: watch,
      scrollTo: scrollTo
    };
  }
}());
