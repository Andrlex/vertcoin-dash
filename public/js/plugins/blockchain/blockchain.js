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