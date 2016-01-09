'use strict';

/**
 * @ngdoc function
 * @description
 * # RegistrazioneprivatoCtrl
 */
angular.module('app')
  .controller('RegistrazioneprivatoCtrl',['$scope','$http','$location','regPrivato','API_CONF',
                                          function ($scope,$http,$location,regPrivato,apiConf) {

	  //chiamata servizio tipovia
	  var endpoint = apiConf.server + apiConf.base_url + '/registrazione/tipovia';
	  $http.get(endpoint).success(function(data){
		  $scope.tipovia = data;
	  });
	  
	  
	  // serie di chiamate che restiuiscono la REGIONE/PROVINCIA/PAESE DI RESIDENZA CHE POI IINVIERò AL SERVIZIO DI REGISTRAZIONE;
	  
	  //PRIMA CHIAMATA-_>REGIONI
	  var callServiceRegioni = apiConf.server + apiConf.base_url + '/local/regioni';
	  $http.get(callServiceRegioni).success(function(data){
		  $scope.regioni =  {};
		  $scope.regioni = data;
//		  console.log($scope.regioni);
	  });
		  // SECONDA CHIAMATA --> PROVINCIE(GLI PASSO L ID DELLA REGIONE CHE HO SELEZIONATO)
		  /*
		   * Id regione 
		   * */
		  $scope.selProvince = function(){
			 $scope.regioni.forEach(function(regione){
				 if(regione.nome == $scope.Privato.regioni){
					 var idRegione = regione.id;
					 var url = apiConf.server + apiConf.base_url + '/local/province?idregione=';
					 var callServiceProvince = url + idRegione;
					 $http.get(callServiceProvince).success(function(data){
						  $scope.province = data;
					  })
						   // TERZA CHIAMATA --> CITTA(GLI PASSO ???)
					 /*Id regione
					  * id provincia
					  * */
					 $scope.selComuni = function(){
						 $scope.province.forEach(function(provincia){
						 var provinciaIsTruth = false;
						 if(provincia.nomeprovincia == $scope.Privato.provincia){
						    var idProvincia = provincia.idprovincia;
						    provinciaIsTruth = true;
						 	if(provinciaIsTruth){
							    var url = apiConf.server + apiConf.base_url + '/local/comuni?idregione=' + idRegione + '&idprovincia=' + idProvincia;
							    $http.get(url).success(function(data){
							    	if(data){
							    		$scope.citta = data;
							    	}
							    });
						 	}
						 }
					 })
					 }
		        }
	        });
	     } 
		  $scope.Privato ={}
		  $scope.showErrorReg = false;  
		  $scope.registrazionePrivato = function(elemento){
		  	   
			  $scope.province.forEach(function(provincia){
				    if(provincia && provincia.nomeprovincia == $scope.Privato.provincia){
					    var siglaProvincia = provincia.siglaprovincia;
					    if($scope.datiPrivato == null){
				          // primo caso
						  var nome = 'NOME' + '=' + $scope.Privato.nome + '&'; 
						  var cognome = 'COGNOME' + '=' + $scope.Privato.cognome + '&';
						  var cf = 'CF' + '=' + $scope.Privato.cf + '&';
						  var telefono = 'TELEFONO' + '=' + $scope.Privato.telefono + '&';
						  var tipovia = 'TIPOVIA' + '=' + $scope.Privato.tipovia + '&';
						  var nomevia = 'NOMEVIA' + '=' + $scope.Privato.nomevia + '&';
						  var numerocivico = 'NUMEROCIVICO' + '=' + $scope.Privato.numerocivico + '&';
						  var scala = 'SCALA' + '=' + $scope.Privato.scala + '&';
						  var piano = 'PIANO' + '=' + $scope.Privato.piano + '&';
						  var citta = 'CITTA' + '=' + $scope.Privato.citta + '&';	 
						  var provincia = 'PROVINCIA' + '=' + siglaProvincia + '&';
						  var cap = 'CAP' + '=' + $scope.Privato.cap + '&';
						  var paese = 'PAESE' + '=' + $scope.Privato.paese + '&';
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
		})
	  }	
  }]);
