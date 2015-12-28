'use strict';

/**
 * @ngdoc function
 * @name bitBotApp.controller:RegistrazioneeffettuataCtrl
 * @description
 * # RegistrazioneeffettuataCtrl
 * Controller of the bitBotApp
 */
angular.module('app')
  .controller('codiceConfermaCtrl',['$scope','$http','regPrivato','$location','API_CONF',
                                    function($scope,$http,regPrivato,$location,apiConf){
  		
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
 		  		.success(function(){
 		  			if(data){
 		  				$location.path('/');
 		  			}
 		  		})
	  }
 }]);
