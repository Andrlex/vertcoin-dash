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
		var endpoint = config.apiEndpoints.coinMarket;

		return {
			getMarketData: getMarketData
		};

		function getMarketData(currency)
		{
			var param = angular.isDefined(currency) ? currency : 'USD';

			return api.get(endpoint + '?convert=' + param);
		}
	}
})();