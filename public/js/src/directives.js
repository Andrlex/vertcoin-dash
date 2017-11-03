(function()
{
	timer.$inject = ['$interval'];
	angular.module('app.drtvs')
		.directive('timer', timer);

	/**
	 *
	 * @param $interval
	 * @returns {{link: link, scope: {time: string}, template: string, transclude: boolean}}
	 */
	function timer($interval)
	{
		return {
			link: link,
			scope: {
				time: '='
			},
			templateUrl: 'assets/tpl/countdown.html',
			replace: true
		};

		/**
		 *
		 * @param scope
		 */
		function link(scope)
		{
			var ms = scope.time,
				duration = moment.duration(ms, 'milliseconds'),
				interval = $interval(tick, 1000, 0 , true);

			scope.time = msToFormat(ms);

			function tick()
			{
				if (ms - 1000 < 0)
				{
					ms = 0;
					$interval.cancel(interval);
				}
				else
					ms -= 1000;

				duration = moment.duration(ms, 'milliseconds');

				if (scope.$parent === null)
				{
					$inteval.cancel(interval);
					return;
				}

				scope.time = msToFormat(ms);
			}

			function msToFormat(ms)
			{
				var duration = moment.duration(ms),
					formattedTime = {};

				formattedTime.day = 0;

				if (duration.months() > 0)
					formattedTime.day += 31;

				formattedTime.day += duration.days();
				formattedTime.hour = duration.hours();
				formattedTime.minute = duration.minutes();
				formattedTime.second = duration.seconds();

				return formattedTime;
			}
		}
	}

})();