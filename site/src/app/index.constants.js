(function() {
  'use strict';

  angular
    .module('gcloud')
    .constant('langs', [{
      friendly: 'Java',
      key: 'java'
    }, {
      friendly: 'Node.js',
      key: 'node'
    }, {
      friendly: 'Python',
      key: 'python'
    }, {
      friendly: 'Ruby',
      key: 'ruby'
    }]);

}());
