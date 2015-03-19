'use strict';

angular.module('datasourceApp')
  .controller('MainCtrl', function ($scope, $http,$state) {
	  
    $scope.datasourceCollection = [];
    
    Parse.initialize("p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn", "gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh");
    
    var DataSource = Parse.Object.extend("datasource");
    var query = new Parse.Query(DataSource);
    query.limit = 200;
    query.descending('createdAt');
    var myCollection = query.collection();
    
	myCollection.fetch({
	  success: function(myCollection) {
	    //console.log( myCollection.toJSON() );
	    
	    $scope.datasourceCollection = eval(myCollection.toJSON());
		 //console.log( $scope.datasourceCollection );
		
	    $scope.$apply();
	  }
	});
	
	
	
	$scope.onClickAddBtn = function(){
		
		$state.go('form');
		
	}
	
	
    /*query.find({
	  success: function(results) {
		  
	    //Success callback
	    console.log(results[0].get("name"));
	    console.log(results[0].name);
	  },
	  error: function(object,error) {
	    //Error Callback
	  }
	});*/
    
	/*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  });
