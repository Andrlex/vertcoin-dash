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

		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
		delete $httpProvider.defaults.headers.common["Access-Control-Request-Headers"];
		delete $httpProvider.defaults.headers.common["Access-Control-Request-Method"];
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


(function ()
{
	'use strict';

	api.$inject = ['$http', '$q'];
	angular
		.module('app.factories')
		.factory('api', api);

	/**
	 *
	 * @param $http
	 * @param $q
	 * @returns {{get: get}}
	 */
	function api($http, $q)
	{
		return {
			get: get
		};

		/**
		 * @param response
		 * @returns {string|CanvasPixelArray|Object[]|*|null}
		 */
		function success(response)
		{
			return response.data;
		}

		/**
		 * @param response
		 */
		function fail(response)
		{
			$q.reject(response);
		}

		/**
		 * @param url
		 * @param params
		 * @returns {Promise.<TResult>}
		 */
		function get(url, params)
		{
			let request = $http.get('https://explorer.vertcoin.org/ext/summary', {
				headers: {
					'Cache-Control': 'max-age=0',
					'Upgrade-Insecure-Requests': '1',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
					'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
					'If-None-Match': '1235809891'
				},
				method: 'GET'
			});

			return request.then(success, fail);
		}
	}
})();
(function ()
{
	'use strict';

	blockchain.$inject = ['api', 'config'];
	angular
		.module('app.factories')
		.factory('blockchain', blockchain);

	/**
	 *
	 * @param api
	 * @param config
	 * @returns {{getBlockchainData: getBlockchainData}}
	 */
	function blockchain(api, config)
	{
		let endpoint = config.apiEndpoints.explorer;

		return {
			getBlockchainData: getBlockchainData
		};

		function getBlockchainData()
		{
			return api.get(endpoint + 'getblockcount');
			// return api.get('https://api.coinmarketcap.com/v1/ticker/vertcoin/');
		}
	}
})();
(function ()
{
	'use strict';

	blockchainCtrl.$inject = ['$scope', 'config', 'blockchain'];
	angular
		.module('app.ctrls')
		.controller('blockchainCtrl', blockchainCtrl);

	angular
		.module('app.drtvs')
		.directive('blockchainPlugin', blockchainPlugin);

	/**
	 * @param $scope
	 * @param config
	 * @param blockchain
	 */
	function blockchainCtrl($scope, config, blockchain)
	{
		init();

		function init()
		{
			blockchain
				.getBlockchainData()
				.then(success, fail);

			function success(response)
			{
				$scope.blockHeight = response;
			}

			function fail()
			{

			}
		}

	}

	function blockchainPlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/blockchain/blockchain.html',
			controller: 'blockchainCtrl'
		};
	}
})();
(function ()
{
	'use strict';

	marketCtrl.$inject = ['$scope'];
	angular
		.module('app.ctrls')
		.controller('marketCtrl', marketCtrl);

	angular
		.module('app.drtvs')
		.directive('marketPlugin', marketPlugin);

	/**
	 * @param $scope
	 */
	function marketCtrl($scope)
	{

	}

	function marketPlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/market/market.html',
			controller: 'marketCtrl'
		};
	}
})();
(function ()
{
	'use strict';

	miningCtrl.$inject = ['$scope'];
	angular
		.module('app.ctrls')
		.controller('miningCtrl', miningCtrl);

	angular
		.module('app.drtvs')
		.directive('miningPlugin', miningPlugin);

	/**
	 * @param $scope
	 */
	function miningCtrl($scope)
	{

	}

	function miningPlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/mining/mining.html',
			controller: 'miningCtrl'
		};
	}
})();
angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div class=\"container ng-scope\"><div class=\"header clearfix\"><h3 class=text-muted>Vertcoin Dashboard</h3></div><div class=marketing><market-plugin></market-plugin><blockchain-plugin></blockchain-plugin><mining-plugin></mining-plugin><div class=legend>Information</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div></div><footer class=footer><p>VtAcqCUWarBYTXPFFXNBB1ikqjMsFeVaQH</p></footer></div>"
  );


  $templateCache.put('js/plugins/blockchain/blockchain.html',
    "<div class=legend>Blockchain</div><div class=row><div class=col-lg-4><div><div class=box><h4>Blockheight</h4><div class=inner><p>{{ blockHeight }}</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/market/market.html',
    "<div class=legend>Market</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/mining/mining.html',
    "<div class=legend>Mining</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );

}]);



(function ()
 {
	'use strict';
	
	angular.module('app.constants', [])

.constant('config', {server:{host:'192.168.0.5',port:3001},apiEndpoints:{explorer:'https://explorer.vertcoin.org/api/'}})

;
	
})();
