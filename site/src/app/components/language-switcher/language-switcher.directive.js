(function() {
  'use strict';

  angular
    .module('gcloud')
    .directive('languageSwitcher', languageSwitcher);

  /** @ngInject */
  function languageSwitcher() {
    return {
      restrict: 'A',
      templateUrl: 'app/components/language-switcher/language-switcher.html',
      controller: LanguageSwitcherCtrl,
      controllerAs: 'switcher',
      bindToController: true
    };
  }

  /** @ngInject */
  function LanguageSwitcherCtrl(langs) {
    var switcher = this;

    switcher.langs = langs;
  }
}());
