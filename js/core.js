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
(function()
{
    'use strict';

    appCtrl.$inject = ['$scope'];
    angular
        .module('app.ctrls')
        .controller('appCtrl', appCtrl);

    angular
        .module('app.drtvs')
        .directive('preload', preload);

    /**
     * @param $scope
     */
    function appCtrl($scope)
    {
        $scope.$on('preload.ready', load);
        $scope.ready = false;

        /**
         */
        function load()
        {
            $scope.ready = true;
        }
    }

    /**
     * @returns {{restrict: string, link: link}}
     */
    function preload()
    {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope)
        {
            scope.$broadcast('preload.ready');
        }
    }
})();


angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div></div>"
  );

}]);



(function ()
 {
	'use strict';
	
	angular.module('app.constants', [])

.constant('config', {server:{host:'192.168.0.5',port:3001}})

;
	
})();
