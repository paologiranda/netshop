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