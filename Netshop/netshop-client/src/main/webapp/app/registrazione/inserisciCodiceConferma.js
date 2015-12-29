'use strict';

/**
 * @ngdoc function
 * @name bitBotApp.controller:RegistrazioneeffettuataCtrl
 * @description
 * # RegistrazioneeffettuataCtrl
 * Controller of the bitBotApp
 */
angular.module('app')
  .controller('codiceConfermaCtrl',['$scope','$http','regPrivato','$location','API_CONF','$window',
                                    function($scope,$http,regPrivato,$location,apiConf,$window){
  		
	  $scope.privatoRegistrato = {}
	  $scope.privatoRegistrato = regPrivato.getElemSelect();
	  $scope.showMessagge = false;
//	  $scope.email = 'mail' + '=' + privatoRegistrato.mail1;
	  
	// schiantone per inserire codice conferma--
//	  var callServCodConf = 'http://localhost:8081/rest/registrazione/mostraCodiceConferma?' + $scope.email;
//	   $http.get(callServCodConf)
// 	  .success(function(data){
// 		  $scope.cConferma = data;
	  
	  	//send codice via email
	  
	  
 	      $scope.codConferma = function(){
 	    	 $scope.mailUtente = 'mail' + '=' +  $scope.privatoRegistrato.mail1 + '&';
 	    	 $scope.codice = 'conferma' + '=' + $scope.codiceConferma;
 	    	 $scope.dataToSend = $scope.mailUtente + $scope.codice;	
 		     var callServattivazione = apiConf.server + apiConf.base_url +  '/registrazione/attivazione?' + $scope.dataToSend;	
 		  		$http.get(callServattivazione)
 		  		.success(function(data){
 		  			if(data){
 		  				var callServLogin= apiConf.server + apiConf.base_url +  '/login/loggin?email=' + $scope.privatoRegistrato.mail1 +'&password=' 
 		  				+ $scope.privatoRegistrato.password1;
 		  				$http.get(callServLogin)
 		 		  			.success(function(data){
 		 		  				console.log("Benvenutof");
 		 		  			})
 		 		  		$window.location.reload();
 		  				$location.path('/attivazioneOK');
 		  			}
 		  		})
	  }
 }]);
