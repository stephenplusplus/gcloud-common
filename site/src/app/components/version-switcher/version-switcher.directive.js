(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('versionSwitcher', versionSwitcher);

  /** @ngInject */
  function versionSwitcher() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/version-switcher/version-switcher.html'
    };
  }

}());
