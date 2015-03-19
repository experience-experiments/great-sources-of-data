'use strict';

angular.module('datasourceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('form', {
        url: '/form',
        templateUrl: 'app/form/form.html',
        controller: 'FormCtrl'
      });
  });