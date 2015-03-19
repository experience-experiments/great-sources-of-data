'use strict';

angular.module('datasourceApp')
  .controller('FormCtrl', function ($scope) {
    
    $scope.item = {};
    $scope.inputForm = {};
    $scope.inputForm.tags=[];
    $scope.inputForm.image="";
    
	$scope.tags = [ {id:1,name:'Loading'}];
	
	 Parse.initialize("p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn", "gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh");

	
	var TagsData = Parse.Object.extend("tags");
    var query = new Parse.Query(TagsData);
    query.limit = 200;
    //query.descending('createdAt');
    var myTagsCollection = query.collection();
    
	myTagsCollection.fetch({
	  success: function(myTagsCollection) {
	    //console.log( myCollection.toJSON() );
	    
	    $scope.tags = eval(myTagsCollection.toJSON());
		 console.log( $scope.tags );
		
	    $scope.$apply();
	  }
	});
	
    
    
  
    
    //$("#tags").select2({
    //	closeOnSelect:false
    //});
    
  });
