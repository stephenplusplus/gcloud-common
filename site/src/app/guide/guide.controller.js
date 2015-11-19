(function() {
  'use strict';

  angular
    .module('gcloud')
    .controller('GuideCtrl', GuideCtrl);

  /** @ngInject */
  function GuideCtrl($scope, $state, $sce, $interpolate, guideObject, manifest, DeeplinkService, util) {
    var guide = this;

    guide.title = [guideObject.title];
    guide.contents = util.arrify(guideObject.contents).map(trustContent);
    guide.editUrl = guideObject.edit ? trustContent(guideObject.edit) : null;

    $scope.$on('$viewContentLoaded', watchSection);

    function watchSection() {
      return DeeplinkService.watch($scope, getSection);
    }

    function getSection() {
      var section = $state.params && $state.params.section;

      if (!section) {
        return null;
      }

      return section.replace(/\-/g, '');
    }

    function trustContent(content) {
      if (/^http/.test(content)) {
        return $sce.trustAsResourceUrl(content);
      }

      return $interpolate('{{content}}/{{version}}/{{data}}')({
        content: manifest.content,
        version: $state.params.version,
        data: content
      });
    }
  }

}());
