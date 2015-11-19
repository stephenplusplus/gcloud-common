(function() {
  'use strict';

  angular
    .module('gcloud')
    .config(homeRoutes);

  /** @ngInject */
  function homeRoutes(manifest, $stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home',
      resolve: { latestRelease: getLatestRelease }
    });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function getLatestRelease($http, manifest) {
    var endpoint = 'https://api.github.com/repos/GoogleCloudPlatform/gcloud-' +
      manifest.lang + '/releases/latest';

    return $http.get(endpoint)
      .then(function(response) {
        var release = response.data;

        return {
          name: release.tag_name,
          date: new Date(release.published_at),
          link: release.html_url
        };
      })
      .then(null, angular.noop);
  }

}());
