'use strict';

angular.module('datasourceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.form', {
        url: '/form',
         onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
	        $modal.open({
	            templateUrl: "app/form/form.html",   
	            controller: 'FormCtrl'
	        }).result.finally(function() {
	            $state.go('^');
	        });
	    }]
        
        
        //templateUrl: 'app/form/form.html',
        //controller: 'FormCtrl'
      });
  });