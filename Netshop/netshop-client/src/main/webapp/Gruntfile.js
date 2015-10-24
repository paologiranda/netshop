module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
//    uglify: {
//      options: {
//        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//      }
//    },
//    less: {
//	     build: {
//	        files: {
//	        	"css/style.css": "less/less.less"
//	        },
//	     }
//     },
     serve: {
            options: {
                port: 9000
            }
     }
  });

  // Load the plugin that provides the "uglify" task.
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks("grunt-contrib");
  grunt.loadNpmTasks('grunt-serve');
//  grunt.loadNpmTasks('grunt-contrib-less');
//  grunt.loadNpmTasks('grunt-contrib-watch');
  

  // Default task(s).
  grunt.registerTask('default');

};