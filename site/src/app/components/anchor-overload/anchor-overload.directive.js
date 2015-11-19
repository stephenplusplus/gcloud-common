(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('a', anchorOverload);

  /** @ngInject */
  function anchorOverload() {
    return {
      restrict: 'E',
      link: setTarget
    };
  }

  function setTarget(scope, elem) {
    var skip = elem.hasClass('skip-external-link');

    if (skip) {
      return;
    }

    var href = elem.attr('href');
    var isExternal = /^http/.test(href);

    if (isExternal) {
      elem.attr('target', '_blank');
    }
  }

}());
