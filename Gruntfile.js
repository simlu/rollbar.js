module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        globals: {
          console: true,
          window: true
        }
      },
      files: ['Gruntfile.js', 'src/stacktrace.js', 'src/notifier.js', 'src/util.js', 'src/xhr.js', 'src/json.js', 'src/init.js']
    },
    concat: {
      options: {
        separator: ';',
        banner: '(function(window, document){\n',
        footer: '})(window, document);'
      },
      dist: {
        src: ['src/notifier.js', 'src/stacktrace.js', 'src/util.js', 'src/xhr.js', 'src/json.js', 'src/init.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: function(path) {
            return path.replace(/.js$/, ".map");
          },
          sourceMappingURL: function(path) {
            var prefix = 'https://d37gvrvc0wt4s1.cloudfront.net/static/js/';
            return prefix + path.replace(/dist\//, '').replace(/.js$/, ".map");
          }
        },
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js',
          'dist/snippet.min.js': 'src/snippet.js',
          'dist/plugins/jquery.min.js': 'src/plugins/jquery.js'
        }
      }
    },
    mocha: {
      test: {
        src: ['test/**/*.html'],
        options: {
          run: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'mocha']);
};
