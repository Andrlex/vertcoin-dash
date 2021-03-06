(function ()
{
	'use strict';

	blockchainCtrl.$inject = ['$scope', 'config', '$interval', 'blockchain'];
	angular
		.module('app.ctrls')
		.controller('blockchainCtrl', blockchainCtrl);

	angular
		.module('app.drtvs')
		.directive('blockchainPlugin', blockchainPlugin);

	/**
	 * @param $scope
	 * @param config
	 * @param $interval
	 * @param blockchain
	 */
	function blockchainCtrl($scope, config, $interval, blockchain)
	{
		$scope.loading = false;
		$scope.value = 10;
		$scope.snow = snow;
		$scope.animating = false;
		init();

		$interval(function ()
		{
			init();
		}, 15000);

		/**
		 *
		 */
		function init()
		{
			$scope.loading = true;

			blockchain
				.getBlockchainData()
				.then(success, fail)
				.finally(always);

			function success(response)
			{
				$scope.chainData = response;
				$scope.chainData.lastUpdated = moment.unix($scope.chainData.lastUpdated).local().format('DD-MM-YYYY HH:mm:ss');

				var currentEst = _.clone(blockchain.getEstHalveTime()),
					estHalveDate = moment().add(Math.round((($scope.chainData.timeTillHalve * 60) * 60) * 1000), 'milliseconds');

				blockchain.setEstHalveTime(estHalveDate);

				if (currentEst.time !== estHalveDate)
					$scope.$emit('blockchain.estTime');
			}

			function fail()
			{

			}


			function always()
			{
				$scope.loading = false;
			}
		}

		function snow() {

			//Configure below to change URL path to the snow image
			var snowsrc = "/assets/img/favicon.ico";
			// Configure below to change number of snow to render
			var no = 20;
			// Configure whether snow should disappear after x seconds (0=never):
			var hidesnowtime = 0;
			// Configure how much snow should drop down before fading ("windowheight" or "pageheight")
			var snowdistance = "pageheight";
			var snowtimer;

			///////////Stop Config//////////////////////////////////

			var ie4up = (document.all) ? 1 : 0;
			var ns6up = (document.getElementById && !document.all) ? 1 : 0;

			function iecompattest() {
				return (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body
			}

			var dx, xp, yp;    // coordinate and position variables
			var am, stx, sty;  // amplitude and step variables
			var i, doc_width = 800, doc_height = 600;

			if (ns6up) {
				doc_width = self.innerWidth;
				doc_height = self.innerHeight;
			} else if (ie4up) {
				doc_width = iecompattest().clientWidth;
				doc_height = iecompattest().clientHeight;
			}

			dx = new Array();
			xp = new Array();
			yp = new Array();
			am = new Array();
			stx = new Array();
			sty = new Array();
			var snow = document.getElementById("snow");

			for (i = 0; i < no; ++i) {
				dx[i] = 0;                        // set coordinate variables
				xp[i] = Math.random() * (doc_width - 50);  // set position variables
				yp[i] = Math.random() * doc_height;
				am[i] = Math.random() * 20;         // set amplitude variables
				stx[i] = 0.02 + Math.random() / 10; // set step variables
				sty[i] = 0.7 + Math.random();     // set step variables
				if (ie4up || ns6up) {

						var node = document.createElement("div");
						var a = document.createElement('img');

						a.src = snowsrc;

						node.id = "dot" + i;
						node.style.position = 'absolute';
						node.zIndex = i + 1000;
						node.visibility = 'visible';
						node.top = '15px';
						node.left = '15px';
						node.appendChild(a);

						snow.appendChild(node);
				}
			}

			function snowIE_NS6() {  // IE and NS6 main animation function
				doc_width = ns6up ? window.innerWidth - 10 : iecompattest().clientWidth - 10;
				doc_height = (window.innerHeight && snowdistance == "windowheight") ? window.innerHeight : (ie4up && snowdistance == "windowheight") ? iecompattest().clientHeight : (ie4up && !window.opera && snowdistance == "pageheight") ? iecompattest().scrollHeight : iecompattest().offsetHeight;
				for (i = 0; i < no; ++i) {  // iterate for every dot
					yp[i] += sty[i];
					if (yp[i] > doc_height - 50) {
						xp[i] = Math.random() * (doc_width - am[i] - 30);
						yp[i] = 0;
						stx[i] = 0.02 + Math.random() / 10;
						sty[i] = 0.7 + Math.random();
					}
					dx[i] += stx[i];
					document.getElementById("dot" + i).style.top = yp[i] + "px";
					document.getElementById("dot" + i).style.left = xp[i] + am[i] * Math.sin(dx[i]) + "px";
				}
				snowtimer = setTimeout(snowIE_NS6, 10);
			}

			function hidesnow() {
				if (window.snowtimer) clearTimeout(snowtimer);
				for (i = 0; i < no; i++) document.getElementById("dot" + i).style.visibility = "hidden"
			}


			if (ie4up || ns6up) {
				snowIE_NS6();
				if (hidesnowtime > 0)
					setTimeout("hidesnow()", hidesnowtime * 1000)
			}
		}

	}

	function blockchainPlugin()
	{
		return {
			restrict: 'E',
			templateUrl: 'js/plugins/blockchain/blockchain.html',
			controller: 'blockchainCtrl'
		};
	}
})();