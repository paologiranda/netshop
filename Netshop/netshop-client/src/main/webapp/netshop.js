	'use strict';

/**
 * @ngdoc overview
 * @name bitBotApp
 * @description
 * # bitBotApp
 *
 * Main module of the application.
 */
angular.module('app', [
			    'ngAnimate',
			    'ngCookies',
			    'ngResource',
			    'ngRoute',
			    'ngSanitize',
			    'ngTouch',
			    'app.resources',	
			    'ngStorage',
			    'angular-loading-bar',
			    'app.httpRequestTracker',
			    'ui.bootstrap'
			  ])
  .config(['$routeProvider','$httpProvider',function ($routeProvider,$httpProvider) {
	  $routeProvider.when('/', {
        templateUrl: 'app/main/main.html',
      })
      .when('/about', {
        templateUrl: 'app/common/about.html',
      })
      .when('/contact', {
        templateUrl: 'app/common/contact.html',
      })
      .when('/areariservata', {
        templateUrl: 'app/common/areariservata.html',
      })
      .when('/footer', {
        templateUrl: 'app/common/footer.html',
      })
      .when('/descrizione', {
        templateUrl: 'app/prodotti/descrizione.html',
        controller: 'DescrizioneCtrl'
      })
      .when('/carrello', {
        templateUrl: 'app/acquisto/carrello.html',
        controller: 'CarrelloCtrl'
      })
      .when('/sceltaPagamento', {
        templateUrl: 'app/acquisto/sceltapagamento.html',
        controller: 'SceltapagamentoCtrl'
      })
      .when('/registrazione', {
        templateUrl: 'app/registrazione/registrazione.html',
        controller: 'RegistrazioneCtrl'
      })
      .when('/registrazionePrivato', {
        templateUrl: 'app/registrazione/registrazioneprivato.html',
        controller: 'RegistrazioneprivatoCtrl'
      })
      .when('/registrazioneAzienda', {
        templateUrl: 'app/registrazione/registrazioneazienda.html',
        controller: 'RegistrazioneaziendaCtrl'
      })
      .when('/categoria', {
        templateUrl: 'app/prodotti/categoria.html',
        controller: 'CategoriaCtrl'
      })
      .when('/header', {
        templateUrl: 'app/common/header.html',
        controller: 'HeaderCtrl'
      })
      .when('/sottoCategoria', {
        templateUrl: 'app/prodotti/sottocategoria.html',
        controller: 'SottocategoriaCtrl'
      })
      .when('/inserisciCodiceConferma', {
        templateUrl: 'app/registrazione/inserisciCodiceConferma.html',
        controller: 'codiceConfermaCtrl'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
      })
      .when('/logoutSuccess', {
        templateUrl: 'app/login/logoutSuccess.html',
      })
       .when('/inserisciProdotto', {
        templateUrl: 'app/admin/inserisciProdotto.html',
        controller: 'inserisciProdCtrl'
      })
      .when('/listaClienti', {
        templateUrl: 'app/admin/listaClienti.html',
        controller: 'listaClientiCtrl'
      })
        .when('/prodottiInMag', {
        templateUrl: 'app/admin/prodottiInMag.html',
        controller: 'prodottiInMagCtrl'
      })
      .when('/itemSubCategory', {
        templateUrl: 'app/prodotti/itemSubCategory.html',
        controller: 'itemSubCategoryCtrl'
      })
      .when('/descrizione1', {
        templateUrl: 'app/prodotti/descrizione1.html',
        controller: 'descrizione1Ctrl'
      })
      .when('/mainAdmin', {
        templateUrl: 'app/admin/mainAdmin.html',
        controller: 'mainAdminCtrl'
      })
      .when('/richiediPwd', {
        templateUrl: 'app/registrazione/richiediPwd.html',
        controller: 'richiediPwdCtrl'
      })
      .when('/myShopping', {
        templateUrl: 'app/clienti/myShopping.html',
        controller: 'myShopppingCtrl'
      })
      .when('/ordiniEffettuati', {
        templateUrl: 'app/admin/ordiniEffettuati.html',
        controller: 'ordiniEffettuatiCtrl'
      })
       .when('/attivazioneOK', {
        templateUrl: 'app/registrazione/attivazioneOK.html',
        controller: 'attivazioneOKCtrl'
      })
      
      .otherwise({
        templateUrl: 'assets/404.html',
      })

   $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
          return {
              'request': function (config) {
                  config.headers = config.headers || {};
                  if ($localStorage.token) {
                      config.headers.Authorization = 'Bearer ' + $localStorage.token;
                  }
                  return config;
              },
              'responseError': function(response) {
                  if(response.status === 401 || response.status === 403) {
                      $location.path('/signin');
                  }
                  return $q.reject(response);
              }
          };
      }])      
}]); 


'use strict';

angular.module('app')
 .controller('MainCtrl',['$scope','dataSc','$http','$location','$window','callItem',
                         'API_CONF','callLoggato','loginCommon','$rootScope','$timeout',
    function($scope,dataSc,$http,$location,$window,callItem,apiConf,callLoggato,loginCommon,$rootScope,$timeout) {
	 $scope.loading = true;
//	 $timeout(function(){
		 	callItem.query(function(data){
		 		  $scope.loading = false;// chiamata tutti prodotti presenti nel
		 		  $scope.prodotti = data;
		 	})
//	 },500);
	
	 var IamFromHome = self.location.href;
	 $rootScope.DoyouFromHome = IamFromHome;// recuper l url della home che mi servirà per la gestione del carrello/login
	 $rootScope.$broadcast("alertMsg");
	 var url = apiConf.server + apiConf.base_url + '/login/loggato';
	 $http.get(url).success(function(data){
 		if(data){
 				$rootScope.token = data.token;
 				var token = $rootScope.token;
 				if(token[0]=="U"){
 					$rootScope.isUser = token;
// 					console.log($rootScope.isUser);
 				}else if (token[0]=="A"){
 					$rootScope.isAdmin = token;
// 					console.log("Ciao admin");
 				}
 		}
	    $scope.userData = data;
	    $scope.isUser = false;
	    $scope.isAdmin = false;
	    $scope.loggato = false;
	    $scope.menuVetrina = true;
			if($scope.userData == null){
				 $scope.loggato = false;
			 }
			 else if($scope.userData != null){
				 	$scope.loggato = true;
				 	if($scope.userData.profilo == "Admin"){
//						 console.log('Benvenuto' + $scope.userData.profilo);
						 $scope.menuVetrina = false;
						 $scope.isAdmin = true;
						 $location.path('/mainAdmin');
				 	}
				 	else if($scope.userData.profilo == "Cliente"){
//					 console.log('Benvenuto Cliente');
					 $scope.isUser = true;
					 $scope.menuVetrina = true;
				 }
				 
			 }
	 	});
	    $scope.selected = function(num){
	        dataSc.setSelectedProd(num);
	    }
	   
   // servizio che distrugge la sessione
    $scope.logout = function(){
    	var logout = apiConf.server + apiConf.base_url + '/login/logout';
    	$http.get(logout).success(function(){
    		 $window.location.reload();		
    	})
    }   	 
 }]);

'use strict';

/**
 * @ngdoc factory
 * @name bitBotApp.addProd
 * @description
 * # callServiceResource
 * factory in the bitBotApp.
 */
angular.module('app.resources',['ngResource'])
  .factory('callItem',['$resource','API_CONF', 
    function($resource,apiConf) {	
	    	var callService = apiConf.server + apiConf.base_url + '/prodotti/elenco2';
	    	var result = $resource(callService,{
	    		save:{method:'GET'}
	    	});
	    	return result;
  }])
  .factory('callLoggato',['$resource','API_CONF', 
    function($resource,apiConf) {	
	    	var callService = apiConf.server + apiConf.base_url + '/login/loggato';
	    	var result =  $resource(callService,{
	    		save:{method:'GET'}
	    	});
	    	return result;
  }]);

'use strict';

angular.module('app')
  .directive('slideShow', function () {
	  return {
		    restrict : 'E',		   
		    templateUrl : "app/main/directive/slideShow.html",
		    transclude : true
		  }

});

'use strict';

angular.module('app')
  .controller('mainAdminCtrl',['$scope','$http','API_CONF','$rootScope',
                function ($scope,$http,apiConf,$rootScope) {
	  
	    
	  var token = $rootScope.token;
	  $scope.isUser=false;
	  if(token){
		  if(token[0]=="U"){
				 $scope.isUser=true; 
		  }
	  }
	  
	   // se c'è il token dell user
	  $scope.isNull = false;// se data==null
	  $scope.isAdmin=false;// se c'e il token dell admin
	  var url =  apiConf.server + apiConf.base_url + '/login/loggato';
	    $http.get(url)
	    .success(function(data){
	    	if(!data){
	    		$scope.isNull=true;
	    	}
	    	if(data){
	    		 if(data.token){
	    			 if(data.token[0]=="A"){
	    				 $scope.isAdmin=true;
	    			 }
	    		 }	
	    	}
	    	
	    	$scope.admin = data;
	    })  
	    
	   
	    
	    
	    
  }])
  
 .controller('inserisciProdCtrl',['$scope','$http','$window','API_CONF',
    		function ($scope,$http,$window,apiConf) {
    	
 $scope.numbers = [1,2,3,4,5,6,7,8,9,10];
	  
	  $scope.Item = {
		 category: "",	
		 subCategory: "",
		 name: "",
		 code: "",
		 price: "",
		 qta: "",
		 descrizione: "",
	  }
	 
	  $scope.send = function(){
		  var cat = 'categoria' + '=' + $scope.Item.category + '&';
		  var subcat = 'sottocategoria' + '=' + $scope.Item.subCategory + '&';
		  var tipoProd = 'tipoprodotto' + '=' + 'ProdottoServizio' + '&';
		  var codProd = 'codprod' + '=' + $scope.Item.code + '&';
		  var name = 'nome' + '=' + $scope.Item.name + '&';
		  var descrizione = 'descrizione' + '=' + $scope.Item.descrizione + '&';
		  var riservato = 'riservato' + '=' + 'si' + '&';
		  var qta = 'qta' + '=' + $scope.Item.qta;
		  
		  $scope.ItemToUpload = cat + subcat + tipoProd + codProd + name + descrizione 
		  						+  riservato + qta;
		  		 		  
		  var callServAddProd =  apiConf.server + apiConf.base_url + '/magazzino/inserisceProdotto?' + $scope.ItemToUpload;
		  $http.get(callServAddProd)
		  .success(function(data){
			  console.log(data);
			  alert('Il prodotto è stato inserito correttamente');
			  $window.location.reload();
		  });		  
	  }	  
}])
 .controller('listaClientiCtrl',['$scope','$http','categoriaService','$window','API_CONF',
		 function ($scope,$http,categoriaService,$window,apiConf) {
	 

	  var callServListClienti = apiConf.server + apiConf.base_url + '/registrazione/listaClienti';
	  $http.get(callServListClienti)
	  .success(function(data){
		  $scope.users = data;
		  
	  }) 
	  $scope.cancellaUtente = function(elemento){
		  categoriaService.setSelectedProd(elemento);
		  var x = elemento;
		  var y = 'mail' + '=' + x.mail;
		  var callService = apiConf.server + apiConf.base_url + '/registrazione/eliminaCliente?' + y;
		  $http.get(callService)
		  .success(function(data){
			  $window.location.reload()
		 });
	  }
 }])
  .controller('prodottiInMagCtrl',['$scope','$http','API_CONF',
                                   function ($scope,$http,apiConf) {
	 
	  var prodottoInMagazzino = apiConf.server + apiConf.base_url + '/prodotti/elenco2';
	  $http.get(prodottoInMagazzino)
	  .success(function(data){
		  $scope.items = data;
	  });
	  
  }])
  .controller('ordiniEffettuatiCtrl', ['$scope','$http','API_CONF',
                                       function ($scope,$http,apiConf) {
	 
	  var ordiniEffettuati =  apiConf.server + apiConf.base_url + '/ordini/acquisti';
	  $http.get(ordiniEffettuati)
	  .success(function(data){
		  $scope.items = data;
	  })
	  
  }]);
'use strict';

angular.module('app')
  .controller('myShopppingCtrl',['$scope','$http','API_CONF','$rootScope',
                                 function ($scope,$http,apiConf,$rootScope) {
	  
	  var server =  apiConf.server + apiConf.base_url;
	  var myProdcut = server + '/ordini/acquistiCliente?codCliente=24';
		  $http.get(myProdcut)
		  .success(function(data){
			  $scope.myProducts = data;
		  })
	
	   $scope.NoToken=false;
	   $scope.SiToken=true;
	   var tokenUser = $rootScope.isUser;// token per l'user proveniente dal mail principale// token per l'admin proveniente dal mail principale
	   var tokenAdmin = $rootScope.tokenAdmin;// token per l'admin proveniente dal main Admin
	  var token = $rootScope.token;
	   if(token=="undefined"){
			  $scope.NoToken=true;
			  $scope.SiToken=false;	 
	   }
	   if(tokenUser){
		   $scope.SiToken=true;
		   $scope.NoToken=true;
	   }
	   
  }]);

'use strict';

angular.module('app')
.controller('CarrelloCtrl',['$scope', 'addProd', '$http', '$location','$window','API_CONF','$rootScope','$routeParams','$modal','$log', 
                            function($scope, addProd, $http, $location,$window,apiConf,$rootScope,$routeParams,$modal,$log) {

	$scope.elemAggiunto = addProd.getElemSelect();
	$scope.isEmpty = true;
	$scope.UserNotLoggato = false;
	var carrelloCallService =  apiConf.server + apiConf.base_url + '/ordini/visualizzaCarrello?codCliente=24';
	$http.get(carrelloCallService)
	.success(function(data){
		if(data){
			$scope.isEmpty=false;
			$scope.carrello = data;
		}
	})	
	$scope.remove = function() {
			var carrelloTemp = {};
			carrelloTemp = $scope.carrello;
			var codiceProdotto = carrelloTemp[0].codiceProdotto;
			var item = 'codProd' + '=' + codiceProdotto;
			var callService =  apiConf.server + apiConf.base_url + '/ordini/eliminaProdottoCarrello?'+item;
			$http.get(callService)
			.success(function(data){
//				console.log(data);
				alert("Hai eliminato con successo il prodotto");
				$window.location.reload();	
			})			
		}	
	$scope.empty = function(){
		var logout =   apiConf.server + apiConf.base_url + '/login/logout';
    	$http.get(logout)
    	.success(function(){
    		//console.log('Ti sei disconnesso con successo!');
    		//$location.path('/');
    		//location.reload(); ricaricare una pagina in javascript
    		 $window.location.reload();
    		
    	})
	}
	$scope.showModalNow=false;
	$scope.confermaOrdine = function() {
		$scope.showModalNow=true;
		var loggato =  apiConf.server + apiConf.base_url + '/login/loggato';
		$http.get(loggato)
		.success(function(data) {
			$scope.loggato = data;
			if ($scope.loggato == null) {
				$rootScope.$broadcast("alertMsg");
				var IamFromCarrello = self.location.href;// recupera l'url della pagina
				$rootScope.DoYouFromCarrello = IamFromCarrello;
				$rootScope.you_must_do_login = "Accedi prima e/o registrati";
				var modalInstance = $modal.open({
					templateUrl: 'app/acquisto/partial/do_log.html',
					controller: function() {
						resolve: {
								 $rootScope.close = function ($modal,$modalInstance) {
									 modalInstance.close();
									 $log.info('Modal dismissed at: ' + new Date());
								 }
						}
					}
				})
				
//				$rootScope.userNonLoggato="Effettua il login prima di procedere con l'acquisto";// variabile che uso se non è loggato e lo reindizzo al login
				$location.path('/login');
			}else{
				$location.path('/sceltaPagamento');
			}
		})
	}
}]);
 angular.module('app')
 .controller('SceltapagamentoCtrl',['$scope','$http','API_CONF',
                                    function ($scope,$http,apiConf) {
	 
   var callService = apiConf.server + apiConf.base_url + '/ordini/confermaOrdine';	
	  $http.get(callService)  
	  .success(function(data){
		  console.log(data);
	  })  
	  
 }]);
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
'use strict';


angular.module('app').service('loginCommon',[ function(){

	  var utente = {};	
	  
	  return{
		  getUser: function(){
			  return utente;
		  },
		  setUser: function(userLoggato){
			  utente = userLoggato;
		  }
	  }
	  
	  
}]);

angular.module('app.httpRequestTracker', []);
angular.module('app.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

  var httpRequestTracker = {};
  httpRequestTracker.hasPendingRequests = function() {
    return $http.pendingRequests.length > 0;
  };

  return httpRequestTracker;
}]);
'use strict';


angular.module('app').controller('LoginCtrl',['$scope','$http','$location','$window','API_CONF','$rootScope','loginFactory',
                                              '$localStorage','erroriProvenientiDalServer','$timeout','$modal','$log',
		function ($scope,$http,$location,$window,apiConf,$rootScope,loginFactory,$localStorage,erroriProvenientiDalServer,$timeout,$modal,$log) {
    

    $rootScope.userNotExit = false;
    var IamFromCarrello = $rootScope.DoYouFrom;
    $scope.submitForm = function(){  
    	 var FormData = {
           email: $scope.email,
           password: $scope.password,
         }
    	loginFactory.send(FormData,
        	function(res){
    		   if (res == "") {     		 			
    		 		erroriProvenientiDalServer.query(function(data){
    	 			$rootScope.credenziali_errate="Credenziali errate"; 
    	 			$rootScope.userNotExit = true;
    	 			var modalInstance = $modal.open({
    	 				templateUrl: 'app/login/partial/cred_err.html',
    					controller: function() {
    						resolve: {
    								 $rootScope.close = function ($modal,$modalInstance) {
    									 modalInstance.close();
    									 $log.info('Modal dismissed at: ' + new Date());
    								 }
    						}
    					}
    				})
    		      })
    		    }
    		 	else
    		 	{
//				   $localStorage.token = res.data.token;
    			 if(IamFromCarrello){
    				  $window.location.reload();
    				  $location.path('/carrello');
    			  }else{
    				  $rootScope.token = res.token;
    				  $window.location.reload();
    				  $window.location = '/attivazioneOK';  
    			 }
			  } 		 
    		})
    	 }
        // gestione della navigazione per mostrare o meno i messaggi di accesso all area risevata per proseguire con l'acquisto
    	var IamFromCarrello = $rootScope.DoYouFromCarrello;
    	$scope.isAuthentic = false;
    	if(IamFromCarrello){
    		$rootScope.$watch("alertMsg", function (event, args) {
			$scope.isAuthentic = true;
    	  })
    	}
       	//se vengo dalla home invece nascondo i mex per l acquisto
    	var IamFromHome = $rootScope.DoyouFromHome;
 	    if(IamFromHome){
 	    	$scope.$watch("alertMsg", function (event, args) {
 	    		if(IamFromHome == "http://localhost:9000/#/"){
 	    			$scope.isAuthentic = false;
 	    		}
 	    	})
 	    }
}]);

	


           

'use strict';

angular.module('app')
    .factory('loginFactory', ['$http', '$localStorage','API_CONF',
                             function($http, $localStorage,apiConf){
   
         return {
        	send: function(data, success, error) {
                $http.get(apiConf.server + apiConf.base_url + '/login/loggin?email=' + data.email +'&password=' + data.password)
                .success(success)
//                .error(error)
            },
            logout: function(success) {
                success();
            },               		
            	     
        }     
}])
.factory('erroriProvenientiDalServer', ['$http','API_CONF','$resource',
                    function($http,apiConf,$resource){
	

		 var url = apiConf.server + apiConf.base_url + '/errori/errore';
		 var result = $resource(url,{
			save:{method:'GET'}
		 });
		 return result;
	
}]);
'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.addProd
 * @description
 * # addProd
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('addProd', function () {

    var elem = [];

   
    return {
    	getElemSelect: function(){
    		return elem;
    	},
    	setElemSelect: function(elemento){
    		elem = elemento;
    	}
    }


  });

'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.data
 * @description
 * # data
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('dataSc', function () {
   
  var prod="";
  
  	return {
  		getSelectedProd: function(){
  			return prod;
  		},
  		setSelectedProd: function(num){
  			prod = num;
  		}
  	};
});

'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.data
 * @description
 * # data
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('subCatService', function () {
   
    var item=[];
  
  	return {
  		getSelectedProd: function(){
  			return item;
  		},
  		setSelectedProd: function(prod){
  			item = prod;
  		}
  	};
});
'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.addProd
 * @description
 * # addTocarr
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('addToCarr', function () {

    var x = [];

   
    return {
    	getProd: function(){
    		return x;
    	},
    	setProd: function(product){
    		x = product;
    	}
    }


  });

'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.addProd
 * @description
 * # addProd
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('regPrivato', function () {

    var elem = [];

   
    return {
    	getElemSelect: function(){
    		return elem;
    	},
    	setElemSelect: function(elemento){
    		elem = elemento;
    	}
    }


  });

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

'use strict';

/**
 * @ngdoc function
 * @name bitBotApp.controller:RegistrazioneCtrl
 * @description
 * # RegistrazioneCtrl
 * Controller of the bitBotApp
 */
angular.module('app')
  .controller('RegistrazioneCtrl', function ($scope) {

  });

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
	  
	  $scope.Privato ={}
	  $scope.showErrorReg = false;  
	  $scope.registrazionePrivato = function(elemento){
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name netshop
 * @description
 * # RegistrazioneCtrl
 * Controller of the netshop
 */
angular.module('app')
  .controller('attivazioneOKCtrl', function ($scope) {

  });

'use strict';

/**
 * @ngdoc function
 * @name bitBotApp.controller:RegistrazioneaziendaCtrl
 * @description # RegistrazioneaziendaCtrl Controller of the bitBotApp
 */
angular.module('app')
  .controller('RegistrazioneaziendaCtrl',['$scope','$http','$location','regPrivato','API_CONF',
               function ($scope,$http,$location,regPrivato,apiConf) {
	 
	  // chiamata servizio tipovia
	  var callServiceTipovia = apiConf.server + apiConf.base_url + '/registrazione/tipovia';
	  $http.get(callServiceTipovia)
	  .success(function(data){
		  $scope.tipovia = data;
	  })
	  
	  
	  $scope.Azienda ={
			  piva: "",
			  ragionesociale: "",
	  		  telefono: "",
	  		  tipovia: "",
	  		  nomevia: "",
	  		  numerocivico: "",
	  		  scala: "",
	  		  piano:"",
	  		  citta:"",
	  		  provincia:"",
	  		  cap:"",
	  		  paese:"",
	  		  mail1:"",
	  		  mail2:"",
	  		  password1:"",
	  		  password2:"",
	  }
	  
	  $scope.registrazioneAzienda = function(elemento){
		  var piva = 'PIVA' + '=' + $scope.Azienda.piva + '&'; 
		  var ragionesociale = 'RAGIONESOCIALE' + '=' + $scope.Azienda.ragionesociale + '&';
		  var telefono = 'TELEFONO' + '=' + $scope.Azienda.telefono + '&';
		  var tipovia = 'TIPOVIA' + '=' + $scope.Azienda.tipovia + '&';
		  var nomevia = 'NOMEVIA' + '=' + $scope.Azienda.nomevia + '&';
		  var numerocivico = 'NUMEROCIVICO' + '=' + $scope.Azienda.numerocivico + '&';
		  var scala = 'SCALA' + '=' + $scope.Azienda.scala + '&';
		  var piano = 'PIANO' + '=' + $scope.Azienda.piano + '&';
		  var citta = 'CITTA' + '=' + $scope.Azienda.citta + '&';
		  var provincia = 'PROVINCIA' + '=' + $scope.Azienda.provincia + '&';
		  var cap = 'CAP' + '=' + $scope.Azienda.cap + '&';
		  var paese = 'PAESE' + '=' + $scope.Azienda.paese + '&';
		  var mail = 'mail' + '=' + $scope.Azienda.mail1 + '&';
		  var pwd = 'PASSWORD' + '=' + $scope.Azienda.password1;
		  
		  $scope.dataUser = piva + ragionesociale + telefono + tipovia + nomevia + 
		  numerocivico + scala + piano + citta + provincia + cap + paese + mail + pwd;
		  
	      console.log($scope.dataUser);
		  
		 
		  var callSerRegAz = apiConf.server + apiConf.base_url +  '/registrazione/registraAzienda?' + $scope.dataUser;
		  $http({
			  method:'get',
			  url: callSerRegAz,
			  data: $.param($scope.Azienda),
			  })
		  .success(function(data){
			 
				  $location.path('/inserisciCodiceConferma');
				  regPrivato.setElemSelect(elemento);
				  console.log(elemento);
				 
		 }) 		  
	  }
	  
	  
  }]);

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

'use strict';

angular.module('app')
   	.controller('CategoriaCtrl',['$scope','$http','categoriaService','API_CONF','addToShop','showCategory','showSubCategory',
   	           function ($scope,$http,categoriaService,apiConf,addToShop,showCategory,showSubCategory) {
   		
   		showCategory.query(function(data){// chiamata a servizio che ritorna l enum delle categorie presente nel database
   			$scope.categorie = data;
   		})
		$scope.mostraSottoCat = function(categ){// setto la scelta dell utente su quale categoria lui clicca
 			var categorie = {};
 			categorie= categ;
   			categoriaService.setSelectedProd(categorie);
 				showSubCategory.send(categorie,function(res){
// 					console.log('Ciao');
 				})
   		}
   		
   		
  }])
   .controller('SottocategoriaCtrl',['$scope','$http','categoriaService', 'subCatService','API_CONF','showSubCategory',
		  function ($scope,$http,categoriaService,subCatService,apiConf,showSubCategory) {
	   var sottocategoria = {};
  	   sottocategoria = categoriaService.getSelectedProd();// recupero la scelta fatta dall utente
	   $scope.showEmpty = false;
	  
	    if(sottocategoria == false){
	  		$scope.showEmpty = true;
	  	}
	  	else{
//	  		showSubCategory.query(function(data){
//	  			 $scope.items = data;
//	  		})
//	  	}
	  		
		if(sottocategoria.categoria  == "Informatica"){
			var callCateg = apiConf.server + apiConf.base_url + '/prodotti/sottocategory?categoria=Informatica';
	   		$http.get(callCateg)
			.success(function(data){
				$scope.items = data;
	   		});
	  	}
	    else if(sottocategoria.categoria == "Elettronica"){
	    	var callCategElet = apiConf.server + apiConf.base_url + '/prodotti/sottocategory?categoria=Elettronica';
	   		$http.get(callCategElet)
			.success(function(data){
	   			$scope.items = data;
	   		});
	  	}
	  	}
		
		 $scope.selected = function(prod){// setto la sottocategoria scelta dall utente 
			subCatService.setSelectedProd(prod);
				//console.log(categ);				
		}
   }])
    .controller('DescrizioneCtrl',['$scope','dataSc','addProd','$http','addToShop','$location','$modal','$rootScope',
                                 function ($scope,dataSc,addProd,$http,addToShop,$location,$modal,$rootScope) {
     	
      $scope.selectProd = dataSc.getSelectedProd();
      $scope.quantita=[1,2,3,4,5,6,7,8,9,10];
      
      $scope.add = function(elemento){
    	  if(!$scope.qta || !$scope.selectProd){
        		// se la quantità non c'è apro la modale settando prima il messaggio di errore 
        		$rootScope.ins_qta = "Inserisci la quantità oppure torna indietro per selezionare" +
        							"il prodotto";
        		var modalInstance = $modal.open({
        			templateUrl: 'app/prodotti/partial/ins_qta.html',
					controller: function() {
						resolve: {
									 $rootScope.close = function ($modal,$modalInstance) {
										 modalInstance.close();
									 }
						}
					}
				})
          }
    	  else
    	  {
	            addProd.setElemSelect(elemento);
	            var itemSelected = {
	            	codProd: $scope.selectProd.codice,
	            	qta: $scope.qta,           	
	            }
	            addToShop.buy(itemSelected,
	            		function(res){
	            	console.log(res);
	            		
	            })
            }
       } 
  }])
.controller('descrizione1Ctrl',['$scope','addToCarr','$http','addToShop',
          function ($scope,addToCarr,$http,addToShop) {
               $scope.prodotti = addToCarr.getProd();  
               $scope.add = function(product){
                 	addToCarr.setProd(product);
                    var itemSelected = {
                        	codProd: $scope.prodotti.codice,
                        	qta: 1,
                        }
                        addToShop.buy(itemSelected,
                        		function(res){
                        })
                 	}           
}])
.controller('itemSubCategoryCtrl',['$scope','$http','subCatService','addToCarr','API_CONF',
		  function ($scope,$http,subCatService,addToCarr,apiConf) {
	  	  
		  $scope.prod = subCatService.getSelectedProd();
		  $scope.CatIsEmpty = false;
		 
		  if($scope.prod == false){
			  $scope.CatIsEmpty = true;
		  }
		  $scope.send = function(product){
				addToCarr.setProd(product);
		    }
		  
		  var completedUrlInfo = '/prodotti/prodottisottocategoria?categoria=Informatica&sottocategoria=';
		  var completedUrlElet = '/prodotti/prodottisottocategoria?categoria=Elettronica&sottocategoria=';
		  switch($scope.prod.sottocategoria){
		  	case "Education":
				  var servEduc =  apiConf.server + apiConf.base_url + completedUrlElet + 'Education';
				  $http.get(servEduc)
				  .success(function(data){
					  if(data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;
					  }
					  
				  });
				  return $scope.items;
		  		break;
		  		
		    case "Hardware":
					  var servEduc = apiConf.server + apiConf.base_url + completedUrlElet + 'Elettronica&sottocategoria=Hardware';
					  $http.get(servEduc)
					  .success(function(data){
						  if(data == false){
							  $scope.CatIsEmpty = true;
						  }else{
						  	$scope.items = data;
						  }
					  });
					  return $scope.items;
			break;
			
		    case "Software":
				  var servEduc = apiConf.server + apiConf.base_url + '/prodotti/prodottisottocategoria?categoria=informatica&sottocategoria=software';
				  $http.get(servEduc)
				  .success(function(data){
					  if(data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;
					  }
			});
				  
				  return $scope.items;
			break;
			
		    case "Sicurezza":
				  var servEduc = apiConf.server + apiConf.base_url + '/prodotti/prodottisottocategoria?categoria=informatica&sottocategoria=sicurezza';
				  $http.get(servEduc)
				  .success(function(data){
					  if(data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;	
					  }  
				});
				  return $scope.items;
			break;
			
		    case "Sorveglianza":
				  var servEduc = apiConf.server + apiConf.base_url + '/prodotti/prodottisottocategoria?categoria=elettronica&sottocategoria=sorveglianza';
				  $http.get(servEduc)
				  .success(function(data){
					  if (data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;	
					  }
				  });
				  return $scope.items;
			break;
			
		    case "Domotica":
				  var servEduc = apiConf.server + apiConf.base_url + '/prodotti/prodottisottocategoria?categoria=elettronica&sottocategoria=domotica';
				  $http.get(servEduc)
				  .success(function(data){
					  if (data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;	
					  }
				  });
				  return $scope.items;
			break;
			
		    case "Automation":
				  var servEduc =apiConf.server + apiConf.base_url + '/prodotti/prodottisottocategoria?categoria=elettronica&sottocategoria=automation';
				  $http.get(servEduc)
				  .success(function(data){
					  if (data == false){
						  $scope.CatIsEmpty = true;
					  }else{
					  $scope.items = data;	
					  }	 
				  });
				  return $scope.items;
			break;
			
		    case "default":
		    	console.log("ciao");
  		}
		  
		
  }]);


'use strict';

angular.module('app')
.factory('addToShop',['$http','API_CONF','$resource','$window','$location',
                      function($http,apiConf,$resource,$window,$location){
	return{
		buy: function(data,success){
			var url = apiConf.server + apiConf.base_url + '/ordini/inserisciCarrello?codProd=' + data.codProd + '&qta=' + data.qta;
			var response = $resource(url,{},{
				query:{
					isArray: true,
					method: 'GET',
					transfomrResponse: function (data){
						return angular.fromJson(data).body;
					}
				}
			})
			response.query();
			$location.path('/carrello');
			$window.location.reload();
		},
	}
}])
.factory('showCategory',['$http','API_CONF','$resource','$window',
              function($http,apiConf,$resource,$window){
                        
		    var url = apiConf.server + apiConf.base_url + '/prodotti/categoria';
			var response = $resource(url,{},{
				get:{
					isArray: true,
					method: 'GET',
				}
			})
			response.query();
			return response;
}])
.factory('showSubCategory',['$http','API_CONF','$resource',
              function($http,apiConf,$resource){
          
	     return{  
        	   send: function(data){
        		   var url = apiConf.server + apiConf.base_url + '/prodotti/sottocategory?categoria=' + data.categoria;
//        		   console.log(url);
        		   var response = $resource(url,{},{
					    query:{method: 'GET',}    		   
				  })
				  return response;
        		 },       	  
           }     
}]);
'use strict';

/**
 * @ngdoc service
 * @name bitBotApp.categoria
 * @description
 * # categoria
 * Service in the bitBotApp.
 */
angular.module('app')
  .service('categoriaService', function () {
    
    var cat=[];
  
  	return {
  		getSelectedProd: function(){
  			return cat;
  		},
  		setSelectedProd: function(categ){
  			cat = categ;
  		}
  	};
  });

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