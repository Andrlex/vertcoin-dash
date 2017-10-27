(function ()
{
	'use strict';

	blockchain.$inject = ['api', 'config'];
	angular
		.module('app.factories')
		.factory('blockchain', blockchain);

	/**
	 *
	 * @param api
	 * @param config
	 * @returns {{getBlockchainData: getBlockchainData}}
	 */
	function blockchain(api, config)
	{
		let endpoint = config.apiEndpoints.explorer;

		return {
			getBlockchainData: getBlockchainData
		};

		function getBlockchainData()
		{
			return api.get(endpoint + 'getblockcount');
			// return api.get('https://api.coinmarketcap.com/v1/ticker/vertcoin/');
		}
	}
})();