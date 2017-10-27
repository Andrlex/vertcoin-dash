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