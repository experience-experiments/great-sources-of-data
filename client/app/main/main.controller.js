'use strict';

angular.module('datasourceApp')
  .controller('MainCtrl', function ($scope, $http,$state, $modal,$position) {
	  
    
    Parse.initialize("p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn", "gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh");
    
    //DATA SOURCES
    $scope.datasourceCollection = [];

    var DataSource = Parse.Object.extend("datasource");
    var query = new Parse.Query(DataSource);
    query.limit = 200;
    query.equalTo("approved", true);
    query.ascending('name');
    var myCollection = query.collection();
    
	myCollection.fetch({
	  success: function(myCollection) {
	    //console.log( myCollection.toJSON() );
	    
	    $scope.datasourceCollection = eval(myCollection.toJSON());
		 //console.log( $scope.datasourceCollection );
		
	    $scope.$apply();
	  }
	});
	
	$scope.categories = [];
	
	// CATEGORIES
	var Category = Parse.Object.extend("category");
    var query = new Parse.Query(Category);
    query.limit = 200;
    query.ascending('name');
    var myCategoryCollection = query.collection();
    
	myCategoryCollection.fetch({
	  success: function(myCategoryCollection) {
	    //console.log( myCollection.toJSON() );
	    
	    $scope.categories = eval(myCategoryCollection.toJSON());
		 //console.log( $scope.datasourceCollection );
		
	    $scope.$apply();
	  }
	});
	
	
	
	
	$scope.onClickAddBtn = function(){
		
		$state.go('main.form');
		
		
	};
	

	
  });
