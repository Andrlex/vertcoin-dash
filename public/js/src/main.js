/* global angular */
(function ()
{
    'use strict';

    appConfig.$inject = ['$routeProvider', 'config', '$locationProvider'];
    appRun.$inject = ['$rootScope', '$window', '$location'];
    angular.module('app', [
		'app.ctrls',
        'app.tpl',
        'ngRoute'
    ])
        .config(appConfig)
        .run(appRun);

    angular.module('app.ctrls', [
        'app.drtvs',
        'app.factories',
		'ngCookies'
    ]);

    angular.module('app.factories', [
        'app.constants'
    ]);

    angular.module('app.drtvs', []);

	/**
	 * @param $routeProvider
	 * @param config
	 * @param $locationProvider
	 */
    function appConfig($routeProvider, config, $locationProvider)
    {
		$routeProvider
            .when('/', {
                controller: 'appCtrl',
                templateUrl: 'assets/tpl/app.html'
            })
            .otherwise({
                redirectTo: '/'
            });

		$locationProvider
			.html5Mode(true)
			.hashPrefix('/');
    }

    /**
     * @param $rootScope
	 * @param $window
	 * @param $location
     */
    function appRun($rootScope, $window, $location)
    {
		$window.ga('create', 'UA-109125947-1', 'auto');

		$window.ga('send', 'pageview', $location.path());
    }
})();