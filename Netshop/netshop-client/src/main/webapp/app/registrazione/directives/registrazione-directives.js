'use strict';

angular.module('app')
.directive('selezionaResidenza',['$http','API_CONF',
                                 
     function ($http,apiConf) {
	  return {
		  restrict : 'E',		  
		  scope:{
			  stati: '@',
			  regioni: '=',
			  
			 
		  },    
		  templateUrl : "app/registrazione/directives/selezionaResidenza.html",
		  transclude : true,
		  link: function(scope){
			  //stati
			  var callServiceStati = apiConf.server + apiConf.base_url + '/local/stati';
			  $http.get(callServiceStati).success(function(data){
				   scope.stati =  {};
				   scope.stati = data;

			  });
			  
			  /* 
			   * regioni
			   * 
			   */
			  var callServiceRegioni = apiConf.server + apiConf.base_url + '/local/regioni';
			  $http.get(callServiceRegioni).success(function(data){
				  scope.regioni =  {};
				  scope.regioni = data;
			  });
			  			   
			   /*  provincie
			    * 
			   *   parametro:
			   *   	Id regione 
			   * */
			  scope.selProvince = function(){
				 scope.regioni.forEach(function(regione){
					if(regione.nome == scope.Privato.regioni){
						scope.idRegione = regione.id;
					    var url = apiConf.server + apiConf.base_url + '/local/province?idregione=';
						var callServiceProvince = url + scope.idRegione;
						$http.get(callServiceProvince).success(function(data){
								  scope.province = data;
						})
					 }
				 });
			   } 
			
			  
			  /*  comuni
			  * 
			  * Id regione
	          * id provincia
              * */
			  scope.selComuni = function(){
				  scope.province.forEach(function(provincia){
				  var provinciaIsTruth = false;
				  if(provincia.nomeprovincia == scope.Privato.provincia){
					 var idProvincia = provincia.idprovincia;
					 provinciaIsTruth = true;
					 if(provinciaIsTruth){
						 var url = apiConf.server + apiConf.base_url + '/local/comuni?idregione=' +  scope.idRegione + '&idprovincia=' + idProvincia;
						 $http.get(url).success(function(data){
						 if(data){
								 scope.citta = data;
						 }
                         });
					  }
				   }
				})
			 }	          
			  
			
		  }
	  }
}]);