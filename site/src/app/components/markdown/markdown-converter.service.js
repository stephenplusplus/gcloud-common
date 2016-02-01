/* global showdown:true */
(function() {
  'use strict';

  angular
    .module('gcloud')
    .factory('markdownConverter', markdownConverter);

  /** @ngInject */
  function markdownConverter($interpolate, $state) {
    var link = $interpolate('<a href="{{href}}">{{text}}</a>');

    function fixLinks(match, text, href) {
      var isDeeplink = /^\#/.test(href);
      var url = isDeeplink ? createDeeplink(href) : createAbsLink(href);

      return link({
        text: text,
        href: url
      });
    }

    function createDeeplink(href) {
      return getStateUrl({
        section: href.replace('#', '')
      });
    }

    function createAbsLink(href) {
      return getStateUrl({
        guideId: href.replace(/\//g, '').replace('readme.md', '')
      });
    }

    function getStateUrl(params) {
      var stateParams = angular.extend({}, $state.params, params);

      return $state.href('docs.guides', stateParams);
    }

    return new showdown.Converter({
      extensions: [function() {
        return [{
          type: 'lang',
          regex: '\\[([^\\]]+)\\]\\(([\\/|\\#][^)]+)\\)',
          replace: fixLinks
        }];
      }]
    });
  }

}());
