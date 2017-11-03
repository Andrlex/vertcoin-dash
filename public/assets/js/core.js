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


(function()
{
	timer.$inject = ['$interval'];
	angular.module('app.drtvs')
		.directive('timer', timer);

	/**
	 *
	 * @param $interval
	 * @returns {{link: link, scope: {time: string}, template: string, transclude: boolean}}
	 */
	function timer($interval)
	{
		return {
			link: link,
			scope: {
				time: '='
			},
			templateUrl: 'assets/tpl/countdown.html',
			replace: true
		};

		/**
		 *
		 * @param scope
		 */
		function link(scope)
		{
			let ms = scope.time,
				duration = moment.duration(ms, 'milliseconds'),
				interval = $interval(tick, 1000, 0 , true);

			scope.time = msToFormat(ms);

			function tick()
			{
				if (ms - 1000 < 0)
				{
					ms = 0;
					$interval.cancel(interval);
				}
				else
					ms -= 1000;

				duration = moment.duration(ms, 'milliseconds');

				if (scope.$parent === null)
				{
					$inteval.cancel(interval);
					return;
				}

				scope.time = msToFormat(ms);
			}

			function msToFormat(ms)
			{
				let duration = moment.duration(ms),
					formattedTime = {};

				formattedTime.day = 0;

				if (duration.months() > 0)
					formattedTime.day += 31;

				formattedTime.day += duration.days();
				formattedTime.hour = duration.hours();
				formattedTime.minute = duration.minutes();
				formattedTime.second = duration.seconds();

				return formattedTime;
			}
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
			let request = $http.get(url);

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
		let endpoint = config.apiEndpoints.explorer,
			estTimeTillHalve = {};

		return {
			getBlockchainData: getBlockchainData,
			getEstHalveTime: getEstHalveTime,
			setEstHalveTime: setEstHalveTime
		};

		/**
		 * @returns {Promise}
		 */
		function getBlockchainData()
		{
			return api.get(endpoint + '/api/chain');
		}

		/**
		 * @returns {{}}
		 */
		function getEstHalveTime()
		{
			return estTimeTillHalve;
		}

		/**
		 * @param time
		 */
		function setEstHalveTime(time)
		{
			estTimeTillHalve.time = time;
		}
	}
})();
(function ()
{
	'use strict';

	market.$inject = ['api', 'config'];
	angular
		.module('app.factories')
		.factory('market', market);

	/**
	 * @param api
	 * @param config
	 */
	function market(api, config)
	{
		let endpoint = config.apiEndpoints.coinMarket;

		return {
			getMarketData: getMarketData
		};

		function getMarketData(currency)
		{
			let param = angular.isDefined(currency) ? currency : 'USD';

			return api.get(endpoint + '?convert=' + param);
		}
	}
})();
(function ()
{
	'use strict';

	blockchainCtrl.$inject = ['$scope', 'config', '$interval', 'blockchain'];
	angular
		.module('app.ctrls')
		.controller('blockchainCtrl', blockchainCtrl);

	angular
		.module('app.drtvs')
		.directive('blockchainPlugin', blockchainPlugin);

	/**
	 * @param $scope
	 * @param config
	 * @param $interval
	 * @param blockchain
	 */
	function blockchainCtrl($scope, config, $interval, blockchain)
	{
		$scope.loading = false;
		$scope.value = 10;
		init();

		$interval(function ()
		{
			init();
		}, 15000);

		/**
		 *
		 */
		function init()
		{
			$scope.loading = true;

			blockchain
				.getBlockchainData()
				.then(success, fail)
				.finally(always);

			function success(response)
			{
				$scope.chainData = response;
				$scope.chainData.lastUpdated = moment.unix($scope.chainData.lastUpdated).local().format('DD-MM-YYYY HH:mm:ss');

				let currentEst = _.clone(blockchain.getEstHalveTime()),
					estHalveDate = moment().add(Math.round((($scope.chainData.timeTillHalve * 60) * 60) * 1000), 'milliseconds');

				blockchain.setEstHalveTime(estHalveDate);

				if (currentEst.time !== estHalveDate)
					$scope.$emit('blockchain.estTime');
			}

			function fail()
			{

			}

			function always()
			{
				$scope.loading = false;
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

	marketCtrl.$inject = ['$scope', 'market', '$interval'];
	angular
		.module('app.ctrls')
		.controller('marketCtrl', marketCtrl);

	angular
		.module('app.drtvs')
		.directive('marketPlugin', marketPlugin);

	/**
	 * @param $scope
	 * @param market
	 * @param $interval
	 */
	function marketCtrl($scope, market, $interval)
	{
		$scope.currency = 'USD';
		$scope.currencys = {
			USD: {
				token: '$',
				marketCap: 'market_cap_usd',
				price: 'price_usd',
				volume: '24h_volume_usd'
			},
			GBP: {
				token: '£',
				marketCap: 'market_cap_gbp',
				price: 'price_gbp',
				volume: '24h_volume_gbp'
			},
			EUR: {
				token: '€',
				marketCap: 'market_cap_eur',
				price: 'price_eur',
				volume: '24h_volume_eur'
			}
		};
		$scope.init = init;

		init();

		$interval(function ()
		{
			init();
		}, 15000);

		/**
		 *
		 */
		function init()
		{
			market
				.getMarketData($scope.currency)
				.then(success, fail)
				.finally(always);

			function success(response)
			{
				$scope.marketData = response[0];
				$scope.marketData.hourChange = parseFloat($scope.marketData['percent_change_1h']);
				$scope.marketData.dayChange = parseFloat($scope.marketData['percent_change_24h']);
				$scope.marketData.weekChange = parseFloat($scope.marketData['percent_change_7d']);
				$scope.marketData.lastUpdated = moment.unix(response[0].last_updated).format('DD-MM-YYYY HH:mm:ss');
			}

			function fail()
			{

			}

			function always()
			{

			}
		}
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

	miningCtrl.$inject = ['$scope', 'blockchain'];
	angular
		.module('app.ctrls')
		.controller('miningCtrl', miningCtrl);

	angular
		.module('app.drtvs')
		.directive('miningPlugin', miningPlugin);

	/**
	 * @param $scope
	 * @param blockchain
	 */
	function miningCtrl($scope, blockchain)
	{
		$scope.$on('blockchain.estTime', updateTime);

		function updateTime()
		{
			let estHalveTime = blockchain.getEstHalveTime();

			$scope.time = moment.duration(estHalveTime.time.diff(moment()))._milliseconds;
			$scope.estHalveDate = estHalveTime.time.format('DD-MM-YYYY HH:mm:ss');
		}

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
(function ()
{
	'use strict';

	walletCtrl.$inject = ['$scope'];
	angular
		.module('app.ctrls')
		.controller('walletCtrl', walletCtrl);

	angular
		.module('app.drtvs')
		.directive('walletPlugin', walletPlugin);

	/**
	 * @param $scope
	 */
	function walletCtrl($scope)
	{

	}

	function walletPlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/wallet/wallet.html',
			controller: 'walletCtrl'
		};
	}
})();
angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div class=\"container ng-scope\"><div class=\"header clearfix\"><h2 class=text-muted>Vertcoin Dashboard</h2></div><div class=marketing><market-plugin></market-plugin><blockchain-plugin></blockchain-plugin><div class=row><div class=\"col-md-6 col-sm-6 col-lg-6\"><wallet-plugin></wallet-plugin></div><div class=\"col-md-6 col-sm-6 col-lg-6\"><mining-plugin></mining-plugin></div></div></div><footer class=footer ng-class=\"{'dark': darkTheme}\"><p class=pull-right style=\"width: 255px\">This is a community driven & funded project.</p><p>VTC VjwAP2w2tkoCJUhBhBMKMa9te4WzkUjkej</p><p>BTC 37EjaY53GwvxsfcxVshcjZEBcWEZukZqi5</p></footer></div>"
  );


  $templateCache.put('assets/tpl/countdown.html',
    "<div class=timer><h4>Reward Halving Countdown</h4><div class=wrapper><div class=time-holder>{{ time.day }} <span class=\"hidden-xs hidden-sm time-post\">{{ (time.day > 1 || time.day === 0) ? 'days' : 'day' }} </span><span class=\"visible-xs visible-sm pull-right time-post\">{{ (time.day > 1 || time.day === 0) ? 'days' : 'day'}}</span></div><div class=time-holder>{{ time.hour }} <span class=\"hidden-xs hidden-sm time-post\">{{ (time.hour > 1 || time.hour === 0) ? 'hours' : 'hour'}} </span><span class=\"visible-xs visible-sm pull-right time-post\">{{ (time.hour > 1 || time.day === 0) ? 'hrs' : 'hr'}}</span></div><div class=time-holder>{{ time.minute }} <span class=\"hidden-xs hidden-sm time-post\">{{ (time.minute > 1 || time.minute === 0) ? 'minutes' : 'minute'}} </span><span class=\"visible-xs visible-sm pull-right time-post\">{{ (time.minute > 1 || time.minute === 0) ? 'mins' : 'min'}}</span></div><div class=time-holder>{{ time.second }} <span class=\"hidden-xs hidden-sm time-post\">{{ (time.second > 1 || time.second === 0) ? 'seconds' : 'second'}} </span><span class=\"visible-xs visible-sm pull-right time-post\">{{ (time.second > 1 || time.second === 0) ? 'secs' : 'sec'}}</span></div></div></div>"
  );


  $templateCache.put('js/plugins/blockchain/blockchain.html',
    "<div class=wrapper-top><div class=legend ng-class=\"{'dark': darkTheme}\">Blockchain <span class=pull-right>{{ chainData.lastUpdated }}</span></div></div><div class=row><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box ng-class=\"{'dark': darkTheme}\"><h4>Blockheight</h4><div class=inner><p>{{ chainData.recent.blockHeight }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box ng-class=\"{'dark': darkTheme}\"><h4>Difficulty</h4><div class=inner><p>{{ chainData.recent.difficulty | number:7 }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box ng-class=\"{'dark': darkTheme}\"><h4>Network</h4><div class=inner><p><b>GH</b> &nbsp; {{ chainData.recent.hashPerSec | number:4}}</p><span>{{ chainData.recent.hashPerSec * 1000000000 | number: 2 }} &nbsp; P/S</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/market/market.html',
    "<div class=wrapper-top><div class=legend><div><div class=pull-left>Market</div><select class=form-control ng-options=\"key as key for (key, value) in currencys\" ng-model=currency ng-change=init()></select><span class=pull-right>{{ marketData.lastUpdated }}</span></div></div></div><div class=row><div class=col-lg-4><div class=box><h4>1 Vertcoin</h4><div class=inner><p class=\"pull-right corner\" ng-class=\"{'up': marketData.hourChange > 0, 'down': marketData.hourChange < 0}\">{{ marketData['percent_change_1h'] }} % <span class=changes><span ng-class=\"{'up': marketData.dayChange > 0, 'down': marketData.dayChange  < 0}\">D {{ marketData['percent_change_24h'] }} %&nbsp;&nbsp; </span><span ng-class=\"{'up': marketData.weekChange  > 0, 'down': marketData.weekChange < 0}\">W {{ marketData['percent_change_7d'] }} %</span></span></p>&nbsp;<p class=pull-right>{{ currencys[currency].token }} {{ marketData[currencys[currency].price] | number: 2 }}</p></div></div></div><div class=col-lg-4><div class=box><h4><span class=pull-left>Rank {{ marketData.rank}}</span> Market Cap</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].marketCap] | number: 0 }}</p></div></div></div><div class=col-lg-4><div class=box><h4>Volume (24hr)</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].volume] | number: 0 }}</p></div></div></div></div>"
  );


  $templateCache.put('js/plugins/mining/mining.html',
    "<div class=wrapper-top><div class=legend ng-class=\"{'dark': darkTheme}\">Mining</div></div><div class=\"row timer-container\"><div class=\"col-lg-12 col-md-12 col-sm-12\"><div ng-if=time><timer time=time></timer></div><div class=est-time>{{ estHalveDate }}</div></div></div><div class=row><div class=\"col-lg-12 col-md-12 col-sm-12\"><div class=\"box height-override\" ng-class=\"{'dark': darkTheme}\"><div><h4>One Click Miner</h4><div class=inner><div><a class=pull-left href=https://github.com/vertcoin/One-Click-Miner/releases>https://github.com/vertcoin/One-Click-Miner/releases</a> <a href=http://alwayshashing.com/ocmhowto.pdf>Guide & Setup</a></div></div></div><div><h4>CC Miner</h4><div class=inner><div><a class=pull-left href=https://github.com/tpruvot/ccminer/releases>https://github.com/tpruvot/ccminer/releases</a> <a href=https://www.cryptocurrencyfreak.com/2017/08/05/vertcoin-mining-with-ccminer-on-windows-10/ >Guide & Setup</a></div><div><a class=pull-left href=https://github.com/KlausT/ccminer/releases>https://github.com/KlausT/ccminer/releases</a> <a href=https://www.cryptocurrencyfreak.com/2017/08/05/vertcoin-mining-with-ccminer-on-windows-10/ >Guide & Setup</a></div></div></div><div class=separator></div><div><h4>Mining Pools</h4><div class=inner><h5>Net1 Pools (Recommended for 100+ MH/S)</h5><div><a href=https://scanner.vtconline.org/ >https://scanner.vtconline.org</a></div><div><a href=http://vertscan1.errantshed.co.uk/ >http://vertscan1.errantshed.co.uk/</a></div><div><a href=http://scanner1.alwayshashing.com/ >http://scanner1.alwayshashing.com/</a></div><h5>Net2 Pools (Recommended for less than 100 MH/s)</h5><div><a href=http://vertscan2.errantshed.co.uk/ >http://vertscan2.errantshed.co.uk/</a></div><div><a href=http://scanner2.alwayshashing.com/ >http://scanner2.alwayshashing.com/</a></div></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/wallet/wallet.html',
    "<div class=wrapper-top><div class=legend>Wallets</div></div><div class=row><div class=\"col-lg-12 col-md-12 col-sm-12\"><div class=\"box height-override\"><div><h4>Hot Wallet</h4><div class=inner><div><a class=pull-left href=https://github.com/vertcoin/vertcoin/releases>https://github.com/vertcoin/vertcoin/releases</a><h5>Vertcoin Wallet</h5></div></div><div class=inner><div><a class=pull-left href=https://github.com/vertcoin/electrum-vtc/releases/ >https://github.com/vertcoin/electrum-vtc/releases/</a><h5>Electrum VTC</h5></div></div></div><div class=separator></div><div><h4>Cold Storage</h4><div class=inner><div><a class=pull-left href=https://github.com/vertcoin/paperwallet>https://github.com/vertcoin/paperwallet</a><h5>Paper Wallet</h5></div></div><div class=inner><div><a class=pull-left href=https://github.com/transcoder/printpaperwallet>https://github.com/transcoder/printpaperwallet</a><h5>Print Paper Wallet</h5></div></div><div class=inner><div><a class=pull-left href=\"https://walletgenerator.net/?currency=Vertcoin#\">https://walletgenerator.net/?currency=Vertcoin#</a><h5>Paper Wallet Generator</h5></div></div><div class=inner><div><a class=pull-left href=https://www.ledgerwallet.com/products/ledger-nano-s>https://www.ledgerwallet.com/products/ledger-nano-s</a><h5>Ledger Nano S</h5></div></div></div></div></div></div>"
  );

}]);



(function ()
 {
	'use strict';
	
	angular.module('app.constants', [])

.constant('config', {apiEndpoints:{explorer:'http://vertcoin-test-dashboard.com',coinMarket:'https://api.coinmarketcap.com/v1/ticker/vertcoin/'}})

;
	
})();
