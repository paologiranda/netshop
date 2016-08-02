'use strict';


angular.module('app')
  .service('GetDatiGeograficiService', function () {

    var elem = [];

   
    return {
    	getValue: function(){
    		return elem;
    	},
    	setValue: function(elemento){
    		elem = elemento;
    	}
    }


  });
