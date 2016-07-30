'use strict';

angular.module('app')
  .directive('menuUtente', function () {
	  return {
		  restrict : 'E',		  
		  scope:{
			 menuCliente: '=', 
		  },    
		  templateUrl : "app/common/directive/menuUtente.html",
		    transclude : true,
		  };
  })
  .directive('menuGenerico',function(){
	return {
		templateUrl:function(elem,attr){
			return 'app/common/directive/'+attr.type+'.html';
		},
		trasclude : true
	};
})
//  .directive('menuAdmin', function () {
//	  return {
//		    restrict : 'E',		   
//		    templateUrl : "app/common/directive/menuAdmin.html",
//		    transclude : true
//		  };
//  })
//.directive('areaRiservata', function () {
//	  return {
//		    restrict : 'E',		   
//		    templateUrl : "app/common/directive/areaRiservata.html",
//		    transclude : true
//		  };
//})
//.directive('dashBoard', function () {
//	  return {
//		    restrict : 'E',		   
//		    templateUrl : "app/common/directive/dashBoard.html",
//		    transclude : true
//		  };
//})
.directive('heaDer', function () {
	  return {
		    restrict : 'E',		   
		    templateUrl : "app/common/directive/header.html",
		    transclude : true
		  };
})

.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })