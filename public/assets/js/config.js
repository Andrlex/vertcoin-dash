

(function ()
 {
	'use strict';
	
	angular.module('app.constants', [])

.constant('config', {server:{host:'192.168.0.5',port:3001},apiEndpoints:{explorer:'http://192.168.0.5:3001',coinMarket:'https://api.coinmarketcap.com/v1/ticker/vertcoin/'}})

;
	
})();
