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