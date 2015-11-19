(function() {
  'use strict';

  angular
    .module('gcloud')
    .controller('ServiceCtrl', ServiceCtrl);

  /** @ngInject */
  function ServiceCtrl($scope, $state, DeeplinkService, DocsService, serviceObject) {
    var service = this;

    service.methods = serviceObject.methods.map(DocsService.setAsTrusted).sort(sortMethods);
    service.metadata = DocsService.setAsTrusted(serviceObject || {}).metadata;
    service.methodNames = service.methods.map(getName);
    service.title = serviceObject.metadata.title;
    service.showGettingStarted = false;

    $scope.$on('$viewContentLoaded', watchMethod);

    function getName(method) {
      return method.metadata.name;
    }

    function watchMethod() {
      return DeeplinkService.watch($scope, getMethod);
    }

    function getMethod() {
      return $state.params && $state.params.method;
    }

    function sortMethods(a, b) {
      if (a.metadata.constructor) {
        return -1;
      }

      if (b.metadata.constructor) {
        return 1;
      }

      var aName = a.metadata.name;
      var bName = b.metadata.name;

      return +(aName > bName) || +(aName === bName) - 1;
    }
  }
}());
