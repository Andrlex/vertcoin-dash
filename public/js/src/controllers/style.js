(function()
{
	'use strict';

	styleCtrl.$inject = ['$scope', '$cookieStore', '$log', '$window'];
	angular
		.module('app.ctrls')
		.controller('styleCtrl', styleCtrl);

	angular
		.module('app.drtvs')
		.directive('stylePlugin', stylePlugin);

	/**
	 * @param $scope
	 * @param $cookieStore
	 * @param $log
	 * @param $window
	 */
	function styleCtrl($scope, $cookieStore, $log, $window)
	{
		$scope.toggleTheme = toggleTheme;

		$scope.darkTheme = false;
		$scope.themeStyle = null;

		var darkTheme = {
			color: '#A5A5A5',
			backgroundColor: '#101010'
		}, lightTheme = {
			color: 'black',
			backgroundColor: 'white'
		};

		init();

		function init()
		{
			try
			{
				var theme = $cookieStore.get('theme');

				if (theme === 'dark')
				{
					$scope.themeStyle = darkTheme;
					$scope.darkTheme = true;
				}
				else
				{

					$scope.themeStyle = lightTheme;
					$scope.darkTheme = false;
				}
			}
			catch (error)
			{
				$scope.themeStyle = lightTheme;

				$log.debug('Unable to load theme..');
			}
		}

		function toggleTheme(option)
		{
			$window.ga('send', 'event', 'style-swap', option);

			try
			{
				$cookieStore.put('theme', option ? 'dark' : 'light');

				$window.location.reload();
			}
			catch (error)
			{
				$log.debug('Unable to save theme..');
			}
		}
	}

	/**
	 * @returns {{restrict: string, template: string, controller: string}}
	 */
	function stylePlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'assets/tpl/style.html',
			controller: 'styleCtrl'
		};
	}
})();