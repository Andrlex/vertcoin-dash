/* global angular */
(function ()
{
    'use strict';

    appConfig.$inject = ['$routeProvider', 'config'];
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
     */
    function appConfig($routeProvider, config)
    {
        $routeProvider
            .when('/', {
                controller: 'appCtrl',
                templateUrl: 'assets/tpl/app.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    /**
     * @param $log
     */
    function appRun($log)
    {
        $log.debug('running');
    }
})();