
module.exports = function(grunt){
      grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-connect');
	  grunt.loadNpmTasks('grunt-connect');
	  grunt.loadNpmTasks('grunt-contrib-watch');
	  grunt.loadNpmTasks('grunt-contrib-less');
	  

	  grunt.registerTask('default',['build']);
	  grunt.registerTask('build', ['concat:angular','concat:netshop']);
	  
	  grunt.registerTask('serve', function (target) {
		    grunt.task.run([
		      'build',
		      'connect:server'
		    ]);
	  });


	// Project configuration.
	  grunt.initConfig({

	    pkg: grunt.file.readJSON('package.json'),
	    banner: '/* Copyright (c) <%= grunt.template.today("yyyy") %> NetShop s.p.a.;\n',
	       
	      concat:{
	    	  angular: {
	    	        src:['src/vendor/angular/angular.js',
	    	            'src/vendor/jquery/dist/jquery.min.js',
	    	            'src/vendor/jquery/dist/jquery.js',
	    	            'src/vendor/angular-resource/angular-resource.js',
	    	            'src/vendor/bootstrap/dist/js/bootstrap.js',
	    	            'src/vendor/bootstrap/dist/js/bootstrap.min.js',
	    	            'src/vendor/angular-animate/angular-animate.js',
	    	            'src/vendor/angular-cookies/angular-cookies.js',
	    	            'src/vendor/angular-route/angular-route.js',
	    	            'src/vendor/angular-modal-service/dst/angular-modal-service.js',
	    	            'src/vendor/angular-modal-service/dst/angular-modal-service.min.js',
	    	            'src/vendor/angular-sanitize/angular-sanitize.js',
	    	            'src/vendor/angular-touch/angular-touch.js',
	    	            'src/vendor/angular-token/ngStorage.js',
	    	            'src/vendor/ui-bootstrap-tpls-0.14.2.min.js',
	    	            'src/vendor/angular-token/loading-bar.js'
	    	            ],
	    	        dest: 'src/angular.js'
	    	      },
	    	  netshop: {
	    		  dist:{
		    		  options: {
						banner: "<%= banner %>"
					  }
		    	  },
	    		  src:[ 'src/app/app.js',
	    		        'src/app/main/main.js',
	    		        'src/app/main/resources/esempioCallResoruce.js',
	    		        'src/app/main/directive/main-directives.js',
	    		        'src/app/admin/mainAdmin.js',
	    		        'src/app/clienti/myShopping.js',
	    	            'src/app/acquisto/acquisto.js',
	    	            'src/app/common/directive/common-directives.js',
	    	            'src/app/common/services/loginCommon.js',
	    	            'src/app/common/common.js"',
	    	            'src/app/login/login.js',
	    	            'src/app/login/services/services.js',
	    	            'src/app/services/addprod.js',
	    	            'src/app/services/data.js',
	    	            'src/app/services/subCatService.js',
	    	            'src/app/services/addToCarr.js',
	    	            'src/app/services/regPrivato.js',
	    	            'src/services/codConfermaService.js',
	    	            'src/app/registrazione/richiediPwd.js',
	    	            'src/app/registrazione/registrazione.js',
	    	            'src/app/registrazione/registrazioneprivato.js',
	    	            'src/app/registrazione/registrazioneazienda.js',
	    	            'src/app/registrazione/inserisciCodiceConferma.js',
	    	            'src/app/prodotti/prodotti.js',
	    	            'src/app/prodotti/service/descrizioneProdotto.js',
	    	            'src/app/prodotti/resource/categoriaService.js',
	    	            ],
	    	        dest: 'src/netshop.js'
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