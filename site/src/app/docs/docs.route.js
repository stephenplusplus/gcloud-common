(function() {
  'use strict';

  angular
    .module('gcloud')
    .config(docsRoutes);

  /** @ngInject */
  function docsRoutes($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, manifest) {
    $urlMatcherFactoryProvider.type('nonURIEncoded', {
      encode: toString,
      decode: toString,
      is: function() { return true; }
    });

    $stateProvider
      .state('docs', {
        url: '/docs/:version',
        templateUrl: 'app/docs/docs.html',
        controller: 'DocsCtrl',
        controllerAs: 'docs',
        resolve: {
          lastBuiltDate: getLastBuiltDate
        },
        params: {
          version: manifest.versions[0]
        },
        redirectTo: 'docs.service'
      })
      .state('docs.guides', {
        url: '/guides/:guideId?section',
        templateUrl: 'app/guide/guide.html',
        controller: 'GuideCtrl',
        controllerAs: 'guide',
        resolve: { guideObject: getGuide }
      })
      .state('docs.service', {
        url: '/{serviceId:nonURIEncoded}?method',
        templateUrl: 'app/service/service.html',
        controller: 'ServiceCtrl',
        controllerAs: 'service',
        resolve: { serviceObject: getService },
        params: {
          serviceId: 'gcloud'
        }
      });

    $urlRouterProvider.when('/docs', goToGcloud);
  }

  /** @ngInject */
  function getLastBuiltDate($http, manifest) {
    var url = 'https://api.github.com/repos/GoogleCloudPlatform/gcloud-' +
      manifest.lang + '/commits?sha=gh-pages&per_page=1';

    return $http({
      method: 'get',
      url: url,
      cache: true
    })
    .then(function(resp) {
      return resp.data[0].commit.committer.date;
    })
    .then(null, angular.noop);
  }

  /** @ngInject */
  function getGuide($state, $stateParams, util, manifest) {
    var guideId = $stateParams.guideId.replace(/\-/g, ' ');
    var guide = util.findWhere(manifest.guides, { id: guideId });

    if (!guide) {
      return $state.go('docs.service');
    }

    return guide;
  }

  /** @ngInject */
  function getService($state, $stateParams, $interpolate, $http, manifest, util) {
    var ids = $stateParams.serviceId.split('/');
    var serviceId = ids[0];
    var pageId = ids[1];
    var service = util.findWhere(manifest.services, { id: serviceId });
    var pageTitle = service && service.title ? [service.title] : null;

    if (service && pageId) {
      service = util.findWhere(service.nav, { id: pageId });
      pageTitle.push(service.title);
    }

    if (!service) {
      return goToDefaultState();
    }

    var json = $interpolate('{{content}}/{{version}}/{{data}}')({
      content: manifest.content,
      version: $stateParams.version,
      data: service.contents
    });

    return $http.get(json)
      .then(function(response) {
        var data = response.data;
        data.metadata.title = pageTitle;
        return data;
      })
      .then(null, goToDefaultState);

    function goToDefaultState() {
      var params = { version: $stateParams.version };
      var options = { inherit: false };

      return $state.go('docs.service', params, options);
    }
  }

  /** @ngInject */
  function goToGcloud($state, $stateParams) {
    $state.go('docs.service', {
      version: $stateParams.version,
      serviceId: 'gcloud'
    });
  }

  function toString(val) {
    return val ? val.toString() : null;
  }

}());
