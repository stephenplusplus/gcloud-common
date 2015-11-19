(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('bindHtmlCompile', bindHtmlCompile);

  /** @ngInject */
  function bindHtmlCompile($compile) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var unwatch = scope.$watch(onchange, compile);

        function onchange() {
          return scope.$eval(attrs.bindHtmlCompile);
        }

        function compile(value) {
          elem.html(value);
          $compile(elem.contents())(scope);
          unwatch();
        }
      }
    };
  }

}());
