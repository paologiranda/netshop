/**
 * @ngdoc function
 * @description
 * # richiediPwdCtrl
 *
 */
angular.module('app')
  .controller('richiediPwdCtrl',['$scope','$http','API_CONF', 
  function ($scope,$http,apiConf) {
	  
	  $scope.newPwd = "";
	  $scope.showNewPwd = false;
	  
	  $scope.send = function(){
		  
		  $scope.dataToSend = 'email' + '=' + $scope.newPwd;
		  
		  var endpoint = apiConf.server + apiConf.base_url + '/registrazione/recuperaPwd?' + $scope.dataToSend;
//		      console.log(endpoint);
		  $http.get(endpoint)
		  .success(function(data){
			 console.log(data);
			 $scope.nuovaPwd = data;
			 $scope.showNewPwd = true;
		  })
		  
	  }
	  
  }]);
