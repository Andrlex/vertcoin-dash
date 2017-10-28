/* global angular */
(function ()
{
    'use strict';

    appConfig.$inject = ['$routeProvider', 'config', '$locationProvider', '$httpProvider'];
    appRun.$inject = ['$log'];
    angular.module('app', [
        'app.ctrls',
        'app.tpl',
        'ngRoute'
    ])
        .config(appConfig)
        .run(appRun);

    angular.module('app.ctrls', [
        'app.drtvs',
        'app.factories'
    ]);

    angular.module('app.factories', [
        'app.constants'
    ]);

    angular.module('app.drtvs', []);

	/**
	 * @param $routeProvider
	 * @param config
	 * @param $locationProvider
	 * @param $httpProvider
	 */
    function appConfig($routeProvider, config, $locationProvider, $httpProvider)
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
     * @param $log
     */
    function appRun($log)
    {
        $log.debug('running');
    }
})();