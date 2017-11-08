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