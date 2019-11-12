module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    });


    grunt.config( 'webpack', require('./grunt/webpack.js') );
    grunt.registerTask('run',function(){
    console.log("running");
  });
     grunt.registerTask('dev', ['webpack:dev']);
}	