/* global angular */
(function ()
{
    'use strict';

    appRun.$inject = ['$log'];
    angular.module('app', [
		'angular-google-analytics',
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
	 * @param $httpProvider
	 * @param AnalyticsProvider
	 */
    function appConfig($routeProvider, config, $locationProvider, $httpProvider, AnalyticsProvider)
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

		AnalyticsProvider.setAccount(
			{
				set: {
					forceSSL: true,
				},
				tracker: 'UA-109125947-1',
				trackEvent: true
			}
		);
    }

    /**
     * @param $log
     */
    function appRun($log)
    {
        $log.debug('running');
    }
})();