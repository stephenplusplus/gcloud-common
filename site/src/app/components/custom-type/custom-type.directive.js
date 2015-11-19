(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('customType', customType);

  /** @ngInject */
  function customType($state, manifest) {
    var converter = {
      node: function(customType) {
        var parts = customType.split('#');
        var stateName = 'docs.service';
        var stateParams = { serviceId: parts[0] };
        var stateOptions = { inherit: false };

        if (parts.length > 1) {
          stateParams.method = parts[1];
        }

        return $state.href(stateName, stateParams, stateOptions);
      }
    }[manifest.lang];

    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var customType = attrs.customType;

        elem.html(customType)
          .addClass('skip-external-link')
          .attr('href', converter(customType.replace('[]', '')));
      }
    };
  }

}());
