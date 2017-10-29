module.exports = function (grunt) {
    'use strict';

    let libs = [
        'bower_components/lodash/dist/lodash.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-translate/angular-translate.min.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/moment/min/moment.min.js'
    ];
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            files: {
                expand: true,
                src: [
                    'public/js/src/main.js',
                    'public/js/src/**/*.js',
                    'public/js/src/factory/*.js',
                    'public/js/plugins/**/*.js',
                    'public/assets/js/templates.js',
                    'public/assets/js/config.js'
                ]
            }
        },
        concat: {
            dev: {
                files: {
                    'public/assets/js/libs.js': libs,
                    'public/assets/js/core.js': '<%= ngAnnotate.files.src %>'
                }
            }
        },
        ngconstant: {
            options: {
                name: 'app.constants',
                dest: 'public/assets/js/config.js',
                wrap: '\n\n(function ()\n {\n\t\'use strict\';\n\t\n\t{%= __ngModule %}\n\t\n})();\n'
            },
            default: {
                constants: {
                    config: grunt.file.readJSON('config/config.json')
                }
            }
        },
        ngtemplates: {
            options: {
                htmlmin :{
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                module: 'app.tpl',
                standalone: true,
                quote: '\'',
                strict: true
            },
            all: {
                cwd: 'public',
                src: [
                    'assets/tpl/*.html',
                    'js/plugins/**/*.html'
                ],
                dest: 'public/assets/js/templates.js'
            }
        },
        uglify: {
            libs: {
                options: {
                    compress: true,
                    mangle: false,
                    sourceMap: false
                },
                files: {
                    'public/assets/js/libs.js': 'public/assets/js/libs.js'
                }
            },
            core: {
                options: {
                    compress: true,
                    mangle: true,
                    sourceMap: false
                },
                files: {
                    'public/assets/js/core.js': 'public/assets/js/core.js'
                }
            }
        },
        less: {
            default: {
                options: {
                    compress: true,
                    yuicompress: true,
                    plugins: [
                        (new (require('less-plugin-clean-css'))({
                            advanced: true,
                            compatibility: 'ie9'
                        }))
                    ]
                },
                files: {
                    'public/assets/css/styles.css': 'public/assets/less/styles.less'
                }
            }
        },
        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/assets',
                        src: ['**', '!**/*.svg', '!**/less/**', '!default/**', 'img']
                    }
                ]
            },
            links: {
                expand: true,
                cwd: 'public',
                src: [
                    'assets/css/*.css',
                    'assets/js/core.js',
                    'index.html',
                    'assets/img/*.png'
                ],
                dest: 'public'
            }
        },
        'merge-json': {
            default: {
                files: {
                    'public/assets/language/en.json': 'public/assets/language/en.json'
                }
            }
        },
        'json-minify': {
            languages: {
                files: 'public/assets/**/language/*.json'
            }
        },
        gruntfile: {
          src: 'gruntfile.js'
        },
        bower: {
            default: {
                options: {
                    copy: false,
                    production: false,
                    verbose: true
                }
            }
        }
    });

    // Default task
    grunt.registerTask('default', [
            'bower:default',
            'less:default',
            'ngconstant',
            'ngtemplates',
            'ngAnnotate',
            'concat:dev',
            'merge-json:default',
            'copy:assets',
            'copy:links',
        ]);

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-ng-constant');

};

