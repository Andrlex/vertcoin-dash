(function ()
{
	'use strict';

	api.$inject = ['$http', '$q'];
	angular
		.module('app.factories')
		.factory('api', api);

	/**
	 *
	 * @param $http
	 * @param $q
	 * @returns {{get: get}}
	 */
	function api($http, $q)
	{
		return {
			get: get
		};

		/**
		 * @param response
		 * @returns {string|CanvasPixelArray|Object[]|*|null}
		 */
		function success(response)
		{
			return response.data;
		}

		/**
		 * @param response
		 */
		function fail(response)
		{
			$q.reject(response);
		}

		/**
		 * @param url
		 * @param params
		 * @returns {Promise.<TResult>}
		 */
		function get(url, params)
		{
			let request = $http.get('https://explorer.vertcoin.org/ext/summary', {
				headers: {
					'Cache-Control': 'max-age=0',
					'Upgrade-Insecure-Requests': '1',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
					'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
					'If-None-Match': '1235809891'
				},
				method: 'GET'
			});

			return request.then(success, fail);
		}
	}
})();