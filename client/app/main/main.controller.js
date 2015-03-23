'use strict';

angular.module('datasourceApp')
  .controller('MainCtrl', function ($scope, $http,$state, $modal,$position) {
	  
	$scope.categoryFilter = '';
	
	//DATA SOURCES
    $scope.datasourceCollection = [];
    
    Parse.initialize("p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn", "gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh");
    


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
		
		//ADD AVERAGE RATING
		for(var entry in $scope.datasourceCollection){
			
			var currentDataSource = $scope.datasourceCollection[entry];
			
			currentDataSource.averageRating = Math.round(((currentDataSource.ratingQuantity + currentDataSource.ratingRecency+currentDataSource.ratingSimplicity+currentDataSource.ratingTrustworthy+currentDataSource.ratingConsistency)/5)/2);
			//DIVIDE RATINGS BY 2 TO MATCH 5 STAR RATINGS
			//LATER TO HAVE HALVES STAR RATINGS
			currentDataSource.ratingQuantity = Math.round(currentDataSource.ratingQuantity/2);
			currentDataSource.ratingRecency = Math.round(currentDataSource.ratingRecency/2);
			currentDataSource.ratingSimplicity = Math.round(currentDataSource.ratingSimplicity/2);
			currentDataSource.ratingTrustworthy = Math.round(currentDataSource.ratingTrustworthy/2);
			currentDataSource.ratingConsistency = Math.round(currentDataSource.ratingConsistency/2);

			console.log(currentDataSource.averageRating);
		}
		
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
	
	
	
	
	
		
	
	$scope.onClickCategory= function(category){
		
		if($scope.categoryFilter!=category){		
			$scope.categoryFilter =category;
		}else {
			$scope.categoryFilter = null;
		}
		
	};
	
	$scope.onClickAddBtn = function(){
		
		$state.go('main.form');
		
		
	};
	

	
  }).filter('filterHTTP',  function() {

  return function(input) {
	  if(input){
		  input = input.replace('http://','');
		  input = input.replace('https://','');
		
		  if(input.indexOf("/")!=-1){
			input = input.substring(0,input.indexOf("/"));
		  }
		
	  }
	  
    return input;
  };
});
