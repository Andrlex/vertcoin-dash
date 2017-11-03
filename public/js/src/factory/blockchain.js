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
		let endpoint = config.apiEndpoints.explorer,
			estTimeTillHalve = {};

		return {
			getBlockchainData: getBlockchainData,
			getEstHalveTime: getEstHalveTime,
			setEstHalveTime: setEstHalveTime
		};

		/**
		 * @returns {Promise}
		 */
		function getBlockchainData()
		{
			return api.get(endpoint + '/api/chain');
		}

		/**
		 * @returns {{}}
		 */
		function getEstHalveTime()
		{
			return estTimeTillHalve;
		}

		/**
		 * @param time
		 */
		function setEstHalveTime(time)
		{
			estTimeTillHalve.time = time;
		}
	}
})();