(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('pageHeader', pageHeader);

  var templates = {
    node: '{{title ? title.join(" » ") : "Node.js"}}'
  };

  /** @ngInject */
  function pageHeader(manifest) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        title: '='
      },
      template: function() {
        return '<header class="docs-header">' +
          '<div class="row">' +
            '<div class="col-60 margin-vertical">' +
              '<h1 class="page-title">' +
                templates[manifest.lang] +
              '</h1>' +
            '</div>' +
            '<div class="col-40" ng-transclude></div>' +
          '</div>' +
        '</header>';
      }
    };
  }
}());
