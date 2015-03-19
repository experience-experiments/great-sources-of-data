'use strict';

angular.module('datasourceApp')
  .controller('FormCtrl', function ($scope,$timeout, $modalInstance,$position) {
    
    $scope.item = {};
    $scope.inputForm = {};
    $scope.inputForm.tags=[];
    $scope.inputForm.image="";
    //$scope.outputReturn = ;
    
	$scope.tags = [ ];
	
	 Parse.initialize("p8GR4aBok0VQ4sXPWoEXSD2Y3xhqDRrqjv4fEjtn", "gR80DrqRpinCOrpNG6XzQPN6b8RspBMj2J8p7ANh");

	//FETCH TAGS 
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
	
	
	
	// FETCH CATEGORIES
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
	
    
    $scope.onChangeFile = function(){
	    console.log("change file");
	   
	    var fileUploadControl = $("#profilePhotoFileUpload")[0];
	     console.log(fileUploadControl.files);
		if (fileUploadControl.files.length > 0) {
		  var file = fileUploadControl.files[0];
		  //var name = "photo.jpg";
		 
		}
		
		  var fileReader = new FileReader();
	      fileReader.readAsDataURL(file);
	      fileReader.onload = function(e) {
	        $timeout(function() {
	          $scope.inputForm.fileDataURL = e.target.result;
	          console.log($scope.inputForm.fileDataURL);
	          $scope.$apply();
	        });
	      }
		
		
		
		$scope.inputForm.file = file;
    }
    
    
    $scope.onClickSubmit = function(){
	    
	    
	    //IF FORMS ARE FILLED
	    
	    
	    console.log("onclick submit");
	    
	    //SEND DATA
	    // Simple syntax to create a new subclass of Parse.Object.
		var NewDatasource = Parse.Object.extend("datasource");
		 
		 //DATA FORMAT
		 var dataFormatArray =[];
		 for(var entry in $scope.inputForm.dataFormat){
			 dataFormatArray.push(entry.toUpperCase());
		 }

		  var tagsArray =[];
		 for(var entry in $scope.inputForm.tags){
			 tagsArray.push($scope.inputForm.tags[entry].name);
			 console.log($scope.inputForm.tags[entry].name);
		 }

		var parseFile = new Parse.File('photo.png', $scope.inputForm.file);
		

		 console.log(dataFormatArray);
		 console.log(tagsArray);
		 
		// Create a new instance of that class.
		var datasourceEntry = new NewDatasource();
		 console.log(datasourceEntry);
		datasourceEntry.set("name",$scope.inputForm.name);
		datasourceEntry.set("description",$scope.inputForm.description);
		datasourceEntry.set("linkURL",$scope.inputForm.linkURL);
		datasourceEntry.set("exampleURL",$scope.inputForm.exampleURL);
		datasourceEntry.set("image",parseFile);
		datasourceEntry.set("tags",tagsArray);
		datasourceEntry.set("deliveryFormat",dataFormatArray);
		datasourceEntry.set("dataQuality",$scope.inputForm.dataQuality);
		datasourceEntry.set("dataQuantity",$scope.inputForm.dataQuantity);
	    
	    
	    /*null, {
		  success: function(result) {
			   $scope.outputReturn="Submitted! Cheers. We will check it to see if everything's good before publishing it.";
			    
		
		  },
		  error: function(result, error) {
		   $scope.outputReturn="Oups. there was an error in the submission process... Don't ask me why I'm just a computer";
		
		  }
		}*/
	    
	    
		datasourceEntry.save().then(function(){
			
			$modalInstance.dismiss('submitted');
			
			$scope.outputReturn="Submitted! Cheers. We will check it to see if everything's good before publishing it.";
		
		},function(error){
			
			 $scope.outputReturn="Oups. there was an error in the submission process... Don't ask me why I'm just a computer.<br>What I know is this:<br>"+error;
			 
			 $modalInstance.dismiss('cancel');
			 
		});
	    
    } // onClickSubmit
    
    
     $scope.onClickCancel = function(){
	      $modalInstance.dismiss('cancel');
	     
     }
    
        
    
  
    
    //$("#tags").select2({
    //	closeOnSelect:false
    //});
    
  });
  
  
  angular.module('datasourceApp').directive('onFileChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.onFileChange);
      element.bind('onchange', onChangeFunc);
    }
  };
});
