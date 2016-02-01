(function() {
  'use strict';

  angular
    .module('gcloud')
    .controller('HomeCtrl', HomeCtrl);

  /** @ngInject */
  function HomeCtrl(manifest, latestRelease) {
    var home = this;

    home.contentUrl = [manifest.content, manifest.home].join('/');
    home.latestRelease = latestRelease;
  }

}());
