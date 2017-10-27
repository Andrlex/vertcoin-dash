(function()
{
    'use strict';

    appCtrl.$inject = ['$scope'];
    angular
        .module('app.ctrls')
        .controller('appCtrl', appCtrl);

    angular
        .module('app.drtvs')
        .directive('preload', preload);

    /**
     * @param $scope
     */
    function appCtrl($scope)
    {
        $scope.$on('preload.ready', load);
        $scope.ready = false;

        /**
         */
        function load()
        {
            $scope.ready = true;
        }
    }

    /**
     * @returns {{restrict: string, link: link}}
     */
    function preload()
    {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope)
        {
            scope.$broadcast('preload.ready');
        }
    }
})();

