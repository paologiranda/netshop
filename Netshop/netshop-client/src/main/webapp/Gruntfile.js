module.exports = function(grunt){
 
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-connect');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-contrib-less');
	  

	 // Default task(s).
	  grunt.registerTask('default',['release']);
	  grunt.registerTask('build', ['concat:angular','concat:netshop']);
	  grunt.registerTask('release',['concat:angular','concat:netshop']);
	 
	  
 
	  grunt.registerTask('serve', function (target) {
		    grunt.task.run([
		      'build',
		      'connect:server',
 
		    ]);
	  });
 

	// Project configuration.
	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    banner:
	        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
	        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
	        ' * Copyright (c) <%= grunt.template.today("yyyy") %> NetShop s.p.a.;\n' +
	        ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
	       
	      concat:{
	    	  angular: {
	    	        src:['vendor/angular/angular.js',
	    	            'vendor/jquery/dist/jquery.min.js',
	    	            'vendor/jquery/dist/jquery.js',
	    	            'vendor/angular-resource/angular-resource.js',
	    	            'vendor/bootstrap/dist/js/bootstrap.js',
	    	            'vendor/bootstrap/dist/js/bootstrap.min.js',
	    	            'vendor/angular-animate/angular-animate.js',
	    	            'vendor/angular-cookies/angular-cookies.js',
	    	            'vendor/angular-route/angular-route.js',
	    	            'vendor/angular-modal-service/dst/angular-modal-service.js',
	    	            'vendor/angular-modal-service/dst/angular-modal-service.min.js',
	    	            'vendor/angular-sanitize/angular-sanitize.js',
	    	            'vendor/angular-touch/angular-touch.js',
	    	            'vendor/angular-token/ngStorage.js',
	    	            'vendor/ui-bootstrap-tpls-0.14.2.min.js',
	    	            'vendor/angular-token/loading-bar.js'
	    	            ],
	    	        dest: 'angular.js'
	    	      },
	    	  netshop: {
	    		  src:[ 
	    		        'app/app.js',
	    		        'app/main/main.js',
	    		        'app/main/resources/esempioCallResoruce.js',
	    		        'app/main/directive/main-directives.js',
	    		        'app/admin/mainAdmin.js',
	    		        'app/clienti/myShopping.js',
	    	            'app/acquisto/acquisto.js',
	    	            'app/common/directive/common-directives.js',
	    	            'app/common/services/loginCommon.js',
	    	            'app/common/common.js"',
	    	            'app/login/login.js',
	    	            'app/login/services/services.js',
	    	            'app/services/addprod.js',
	    	            'app/services/data.js',
	    	            'app/services/subCatService.js',
	    	            'app/services/addToCarr.js',
	    	            'app/services/regPrivato.js',
	    	            'services/codConfermaService.js',
	    	            'app/registrazione/richiediPwd.js',
	    	            'app/registrazione/registrazione.js',
	    	            'app/registrazione/registrazioneprivato.js',
	    	            'app/registrazione/registrazioneazienda.js',
	    	            'app/registrazione/inserisciCodiceConferma.js',
	    	            'app/prodotti/prodotti.js',
	    	            'app/prodotti/service/descrizioneProdotto.js',
	    	            'app/prodotti/resource/categoriaService.js',
	    	            ],
	    	        dest: 'netshop.js'
	    	  },
	    	  uglify: {
	    	      angular: {
	    	            src:['<%= concat.angular.src %>'],
	    	            dest: '<%= distdir %>/angular.js'
	    	       },
	    	  	  netshop: {
	    	  		    src:['<%= concat.netshop.src %>'],
	    	            dest: '<%= distdir %>/netshop.js'
	    	  		 }
	    	   },	    	     
	      },
	   // The actual grunt server settings
	      connect: {
		        server: {
		        	options: {
			            port: 9000,
			        	hostname: 'localhost',
						livereload: 35729
			            }
		        	}
		        },
	});
}