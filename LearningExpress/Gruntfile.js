module.exports = function(grunt){
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec',
  ].forEach(function(task){
    grunt.loadNpmTasks(task)
  })

  grunt.initConfig({
    cafemocha:{
      all: { src: 'qa/tests-*.js', options: { ui: 'tdd'} }
    },
    jshint: { 
      app: ['meadowlark.js', 'public/js/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
    },
    exec: {
      linkchecker: { cmd: 'linkchecker http://localhost:3000' }
    }
  })

  grunt.registerTask('default', ['cafemocha', 'jshint', 'exec'])
}
