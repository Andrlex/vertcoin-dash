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