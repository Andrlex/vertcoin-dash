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