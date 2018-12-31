/* global angualr */
(function()
{
	'use strict';

	exchangeCtrl.$inject = ['$scope'];
	angular
		.module('app.ctrls')
		.controller('exchangeCtrl', exchangeCtrl);

	angular
		.module('app.drtvs')
		.directive('exchangePlugin', exchangePlugin);

	/**
	 * @param $scope
	 */
	function exchangeCtrl($scope)
	{

	}

	/**
	 * @returns {{restrict: string, templateUrl: string, controller: string}}
	 */
	function exchangePlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/exchange/exchange.html',
			controller: 'exchangeCtrl'
		};
	}
})();

