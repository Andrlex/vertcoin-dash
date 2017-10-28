(function ()
{
	'use strict';

	angular
		.module('app.factories')
		.factory('market', market);

	/**
	 * @param api
	 * @param config
	 */
	function market(api, config)
	{
		let endpoint = config.apiEndpoints.coinMarket;

		return {
			getMarketData: getMarketData
		};

		function getMarketData(currency)
		{
			let param = angular.isDefined(currency) ? currency : 'USD';

			return api.get(endpoint + '?convert=' + param);
		}
	}
})();