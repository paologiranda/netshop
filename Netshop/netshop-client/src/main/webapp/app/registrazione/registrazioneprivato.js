'use strict';

/**
 * @ngdoc function
 * @description
 * # RegistrazioneprivatoCtrl
 */
angular.module('app')
  .controller('RegistrazioneprivatoCtrl',['$scope','$http','$location','regPrivato','API_CONF','$rootScope',
                                          function ($scope,$http,$location,regPrivato,apiConf,$rootScope) {

	  //chiamata servizio tipovia
	  var endpoint = apiConf.server + apiConf.base_url + '/registrazione/tipovia';
	  $http.get(endpoint).success(function(data){
		  $scope.tipovia = data;
	  });
	 
	  
	  // mi sono creato due ascoltatori per passare i dati con la direttiva delle nazioni
	  $scope.$on("updateDataForRegistration", function(event,args){
			$scope.paeseSelezionato = args;
          
      })
	 
       $scope.$on("inserisciCapDinamicamente", function(res){
          $scope.cap= "10043";
          alert("sono passatp finalemnte");
      })
      
      
	  $scope.Privato ={}
	  $scope.showErrorReg = false;  
	  $scope.registrazionePrivato = function(elemento){
		  if($scope.datiPrivato == null){
			
			  // Dati anagrafici
			  var nome = 'NOME' + '=' + $scope.Privato.nome + '&'; 
			  var cognome = 'COGNOME' + '=' + $scope.Privato.cognome + '&';
			  var cf = 'CF' + '=' + $scope.Privato.cf + '&';
	          var telefono = 'TELEFONO' + '=' + $scope.Privato.telefono + '&';
		      
	          // indirizzo di residenza
	          var tipovia = 'TIPOVIA' + '=' + $scope.Privato.tipovia + '&';
			  var nomevia = 'NOMEVIA' + '=' + $scope.Privato.nomevia + '&';
			  var numerocivico = 'NUMEROCIVICO' + '=' + $scope.Privato.numerocivico + '&';
	          var scala = 'SCALA' + '=' + $scope.Privato.scala + '&';
	          var piano = 'PIANO' + '=' + $scope.Privato.piano + '&';
	          var citta = 'CITTA' + '=' + $scope.Privato.comune + '&';	 
	          var provincia = 'PROVINCIA' + '=' + $scope.siglaProvincia + '&';
	          var cap = 'CAP' + '=' + $scope.cap + '&';
	          var paese = 'PAESE' + '=' + $scope.Privato.stato + '&';
	          $scope.paeseSelezionato = paese;
	          
	          //mail
	          var mail = 'mail' + '=' + $scope.Privato.mail1 + '&';
	          var pwd = 'PASSWORD' + '=' + $scope.Privato.password1;
	
				  //secondo caso
		//		  var nome = 'NOME' + '=' + 'paolo' + '&'; 
		//		  var cognome = 'COGNOME' + '=' + 'Giranda' + '&';
		//		  var cf = 'CF' + '=' + $scope.Privato.cf + '&';
		//		  var telefono = 'TELEFONO' + '=' + '0123' + '&';
		//		  var tipovia = 'TIPOVIA' + '=' + $scope.Privato.tipovia + '&';
		//		  var nomevia = 'NOMEVIA' + '=' + 'A' + '&';
		//		  var numerocivico = 'NUMEROCIVICO' + '=' + '1' + '&';
		//		  var scala = 'SCALA' + '=' + '1' + '&';
		//		  var piano = 'PIANO' + '=' + '1' + '&';
		//		  var citta = 'CITTA' + '=' + 'Torino' + '&';
		//		  var provincia = 'PROVINCIA' + '=' + 'TO' + '&';
		//		  var cap = 'CAP' + '=' + '10100' + '&';
		//		  var paese = 'PAESE' + '=' + "IT" + '&';
		//		  var mail = 'mail' + '=' + $scope.Privato.mail1 + '&';
		//		  var pwd = 'PASSWORD' + '=' + $scope.Privato.password1;
		
          $scope.datiPrivatoTot = nome + cognome + cf + telefono + tipovia + nomevia + numerocivico + scala + piano 
		  					+ citta + provincia + cap + paese + mail + pwd;
		         
//				  console.log($scope.datiPrivatoTot);
				  /*if(($scope.Privato.mail1 != $scope.Privato.mail2)&&
					($scope.Privato.password1 != $scope.Privato.password2)){
					  console.log('Errore');
				  }*/
			       var regPrivService = apiConf.server + apiConf.base_url + '/registrazione/registraPrivato?' + $scope.datiPrivatoTot;
			  $http({
				  method: 'get',
				  url: regPrivService,
				  data: $.param($scope.Privato),
			  })
			  .success(function(data){			  
//				  console.log(data);
				  var callServiceError = apiConf.server + apiConf.base_url + '/errori/errore';
				  $http.get(callServiceError).
        		  success(function(IsErrore){
        		   		console.log(IsErrore); 
        		   				if(IsErrore[0]==null){
        		   					var callSeriveSendEmail = apiConf.server + 
    		   						apiConf.base_url + '/registrazione/sendEmailConfermaAttivazione?nome='+ $scope.Privato.nome + 
    		   						'&mail=' + $scope.Privato.mail1;
	        		   					$http.get(callSeriveSendEmail).
	        		   					success(function(response){
	        		   						if(response){
	        		   							console.log("Mail inviata");
	        		   						}
	        		   					})
//		        		   				$scope.dataUser = data;
										$location.path('/inserisciCodiceConferma');
										regPrivato.setElemSelect(elemento);
        		   				}
        		   				else
        		   				{	
        		   					$scope.errore = IsErrore;
//    		   						console.log($scope.errore);
        		   					$scope.showErrorReg = true;
        		   				}
         		   		})
			  })
			}
		   }	
  }]);
