/* global hljs: true */
(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('markdown', markdown);

  /** @ngInject */
  function markdown(markdownConverter) {
    return {
      restrict: 'E',
      link: function(scope, elem) {
        var html = markdownConverter.makeHtml(elem.text());
        var node = angular.element(html);

        [].slice.call(node.find('code')).filter(function(code) {
          return code.parentNode.tagName.toLowerCase() === 'pre';
        }).forEach(function(code) {
          hljs.highlightBlock(code);
        });

        elem.html('').append(node);
      }
    };
  }

}());
