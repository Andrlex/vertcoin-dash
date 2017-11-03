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