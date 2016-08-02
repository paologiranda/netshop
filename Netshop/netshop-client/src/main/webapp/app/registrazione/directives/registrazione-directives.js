'use strict';

angular.module('app')
.directive('selezionaResidenza',['$http','API_CONF','$rootScope',
                                 
     function ($http,apiConf,$rootScope) {
	  return {
		  restrict : 'E',		  
		  scope:{
			  statoDiResidenza: '=',
			  regioneDiResidenza: '=',
			  siglaProvinciaDiResidenza: '=',
			  comuneDiResidenza: '=',
			  cap:'=',
		  },    
		  templateUrl : "app/registrazione/directives/selezionaResidenza.html",
		  transclude : true,
		  link: function(scope,element,attr){

			  /*
			   * lista di tutti gli stati europei
			   * 
			   */
			  
			  var callServiceStati = apiConf.server + apiConf.base_url + '/local/stati';
			  $http.get(callServiceStati).success(function(data){
				   scope.elencoStati = data;

			  });
			  
			  
			  /* 
			   * lista di tutte le regioni
			   * 
			   */
			  var callServiceRegioni = apiConf.server + apiConf.base_url + '/local/regioni';
			  $http.get(callServiceRegioni).success(function(data){
				  scope.elencoRegioni = data;
			  });
			  			  
			  
			  scope.datiDaInviareAlContoller = {};
			  scope.datiDaInviareAlContoller.dati= [];
			  
			  scope.selezionaStato = function() {
				  //mi salvo lo stato selezionato nell array
				  scope.datiDaInviareAlContoller.dati.push(scope.Privato.stato);
			  }
			  
			  
			   /*  
			    * lista delle provincie in base alla regione selezionata
			    * 
			    *   parametri:
			    *   	Id regione 
			    * */
			  scope.selProvince = function(){
				 scope.elencoRegioni.forEach(function(regione){
					if(regione.nome == scope.Privato.regioni){
						//alert(regione.nome);
						scope.idRegione = regione.id;
						scope.datiDaInviareAlContoller.dati.push(regione);
					    var url = apiConf.server + apiConf.base_url + '/local/province?idregione=';
						var callServiceProvince = url + scope.idRegione;
						$http.get(callServiceProvince).success(function(data){
								  scope.elencoProvince = data;
						})
					 }
				 });
			  } 
			
			  
			  /*  
			   * lista dei comuni in base alla regione e provincia scelta
			   * 
			   * Parametri in input al servizio:
			   * Id regione
	           * id provincia
               * */
			  scope.selComuni = function(){
				  scope.elencoProvince.forEach(function(provincia){
				  var provinciaIsTruth = false;
				  if(provincia.nomeprovincia == scope.Privato.provincia){
					  //alert(provincia.nomeprovincia);
					 scope.provincia = provincia;
					 
					 if (scope.datiDaInviareAlContoller.dati.provincia==undefined){
						 scope.datiDaInviareAlContoller.dati.push(scope.provincia);
					 }
					 
					 scope.provincia.idProvincia = provincia.idprovincia;
					 provinciaIsTruth = true;
					 if(provinciaIsTruth){
						 var url = apiConf.server + apiConf.base_url + '/local/comuni?idregione=' +  scope.idRegione + '&idprovincia=' + scope.provincia.idProvincia;
						 $http.get(url).success(function(data){
							 if(data){
								 scope.elencoComuni = data;
							 }
                         });
					  }
				   }
				})
			 }
			 scope.getValueComune = function(){
				 scope.datiDaInviareAlContoller.dati.push(scope.Privato.comune);
				 scope.$emit("inserisciCapDinamicamente",scope.datiDaInviareAlContoller);
			 } 
		  }
	  }
}]);