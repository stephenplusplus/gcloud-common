/* global semver:true */
(function() {
  'use strict';

  angular
    .module('gcloud')
    .controller('DocsCtrl', DocsCtrl);

  /** @ngInject */
  function DocsCtrl($state, langs, manifest, lastBuiltDate) {
    var docs = this;

    docs.langs = langs;
    docs.lastBuiltDate = lastBuiltDate;
    docs.guides = angular.copy(manifest.guides).filter(isAvailable);
    docs.services = angular.copy(manifest.services).filter(isAvailable);
    docs.services.forEach(updateNav);
    docs.version = $state.params.version;
    docs.selectedVersion = docs.version;
    docs.overview = [
      manifest.content,
      $state.params.version,
      manifest.overview
    ].join('/');
    docs.loadVersion = loadVersion;
    docs.getGuideUrl = getGuideUrl;
    docs.isActive = isActive;

    function loadVersion(version) {
      return $state.go($state.current.name, { version: version });
    }

    function isActive(serviceId) {
      return !!($state.params.serviceId || '').match(serviceId);
    }

    function getGuideUrl(page) {
      return page.title.toLowerCase().replace(/\s/g, '-');
    }

    function isAvailable(service) {
      var version = $state.params.version;

      if (version === 'master') {
        return true;
      }

      return semver.satisfies(version, service.implemented || '*');
    }

    function updateNav(service) {
      if (service.nav) {
        service.nav = service.nav.filter(isAvailable);
      }
    }
  }
}());
