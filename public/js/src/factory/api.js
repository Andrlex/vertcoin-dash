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
			let request = $http.get(url);

			return request.then(success, fail);
		}
	}
})();