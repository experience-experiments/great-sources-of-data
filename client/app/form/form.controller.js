'use strict';

angular.module('datasourceApp')
  .controller('FormCtrl', function ($scope,$timeout, $modalInstance,$position) {
    
    $scope.item = {};
    $scope.inputForm = {};
    $scope.inputForm.tags=[];
    $scope.inputForm.image="";
    $scope.inputForm.spiderGraphLabels = ['source trustworthiness','data consistency & quality','data quantity','recency','ease of use'];
	
	$scope.isError = false;
	
	
	
	///////////////// SPIDER GRAPH STUFF ////////////////
	// TO FIX //
	
    $scope.updateData = function () {
        
            $('#spidergraphcontainer').spidergraph('updateActiveData', [
                $scope.inputForm.trustworthy,
                $scope.inputForm.consistency,
                $scope.inputForm.quantity,
                $scope.inputForm.recency,
                $scope.inputForm.simplicity]);
       
    };

   	
	$scope.loadSpiderGraph = function () {
		
		
        //$scope.setLayerVars(5);  // sets the default amount for the circles
        
        $('#spidergraphcontainer').spidergraph({
            'fields':$scope.inputForm.spiderGraphLabels,
            'gridcolor': 'rgba(20,20,20,1)'
        });
        
        $('#spidergraphcontainer').spidergraph('resetdata');
       $('#spidergraphcontainer').spidergraph('addlayer', {
            'name':'layer1',
            'strokecolor':'rgba(40,150,255,0.9)',
            'fillcolor':'rgba(44,160,254,0.6)',
            'data':[5,5,5,5,5]
        });
       
        
       $('#spidergraphcontainer').spidergraph('applyActiveData', 'layer1');
       /**/
	     $('#spidergraphcontainer').bind('spiderdatachange', function (event, data) {
			console.log('Change data');
            $scope.inputForm.trustworthy = data[0];
            $scope.inputForm.consistency = data[1];
            $scope.inputForm.quantity = data[2];
            $scope.inputForm.recency = data[3];
            $scope.inputForm.simplicity = data[4];
      
			$scope.$apply();
    	});
		
    };
    
    
    
    $scope.setLayerVars = function (defaultAmount) {

        $scope.inputForm.trustworthy = defaultAmount;
        $scope.inputForm.consistency = defaultAmount;
        $scope.inputForm.quantity = defaultAmount;
        $scope.inputForm.recency = defaultAmount;
        $scope.inputForm.simplicity = defaultAmount;
       

        $scope.layer1Data = [];
        for (var i = 0; i < $scope.inputForm.spiderGraphLabels.length; i++) {
            $scope.layer1Data.push(defaultAmount);
        }
    };
    
    

     $(document).ready(function () {
	    
	    $('#spidergraphcontainer').ready(function () {

	       	        //HACK TO WAIT FOR THE SPIDER GRAPH TO BE READY 
	       setTimeout($scope.loadSpiderGraph, 100);
	       
	       
	       //$scope.dataForm.$setPristine();
        });
    });
    	
       
    
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
	    $scope.categoriesCollection = myCategoryCollection;
	    $scope.categories = eval(myCategoryCollection.toJSON());
		
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
	    $scope.isError=false;
	    
			
		 if (!$scope.inputForm.name) 
		 { 
			  $scope.isError=true;
			  return; 
		}
	    
	    
	    //SEND DATA
	    // Simple syntax to create a new subclass of Parse.Object.
		var NewDatasource = Parse.Object.extend("datasource");
		 
		 // FORMAT
		 var dataFormatArray =[];
		 for(var entry in $scope.inputForm.dataFormat){
			 dataFormatArray.push(entry.toUpperCase());
		 }
		 
		 // TAGS
		  var tagsArray =[];
		 for(var entry in $scope.inputForm.tags){
			 tagsArray.push($scope.inputForm.tags[entry].name);
			 console.log($scope.inputForm.tags[entry].name);
		 }
		 
		 
		 // FILE
		var parseFile = new Parse.File('photo.png', $scope.inputForm.file);
		
		
		//FROM CATEGORY ANGULAR OBJECT TO PARSE OBJECT
		console.log($scope.categoriesCollection.get($scope.inputForm.category));
		
		 
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
		datasourceEntry.set("category",$scope.categoriesCollection.get($scope.inputForm.category));
		datasourceEntry.set("ratingTrustworthy",$scope.inputForm.trustworthy);
		datasourceEntry.set("ratingConsistency",$scope.inputForm.consistency);
		datasourceEntry.set("ratingRecency",$scope.inputForm.recency);
		datasourceEntry.set("ratingSimplicity",$scope.inputForm.simplicity);
		datasourceEntry.set("ratingQuantity",$scope.inputForm.quantity);
	    
	   	    
		datasourceEntry.save().then(function(){
			
		
			
			$modalInstance.dismiss('submitted');
			
			$scope.outputReturn="Submitted!\nCheers. We will check it to see if everything's good before publishing it.\nHave an awesome day";
			
			setTimeout(function(){alert("Cheers!!\nWe will check it to see if everything's good before publishing it.\nHave an awesome day ;-)")},500);
		
		},function(error){
			
			 $scope.outputReturn="Oups. there was an error in the submission process... Don't ask me why I'm just a computer.<br>What I know is this:<br>"+error;
			 
			 $modalInstance.dismiss('cancel');
			 
		});
	    
    } // onClickSubmit
    
    
     $scope.onClickCancel = function(){
	      $modalInstance.dismiss('cancel');
	     
     }
    
        
    

  

    
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


angular.module('datasourceApp').directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  }
});
