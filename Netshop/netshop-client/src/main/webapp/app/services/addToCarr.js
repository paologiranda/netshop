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
