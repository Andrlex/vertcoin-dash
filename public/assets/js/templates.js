angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div class=\"container ng-scope\"><div class=\"header clearfix\"><h2 class=text-muted>Vertcoin Dashboard</h2></div><div class=marketing><market-plugin></market-plugin><blockchain-plugin></blockchain-plugin><mining-plugin></mining-plugin><div class=legend>Information</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div></div><footer class=footer><p>VtAcqCUWarBYTXPFFXNBB1ikqjMsFeVaQH</p></footer></div>"
  );


  $templateCache.put('js/plugins/blockchain/blockchain.html',
    "<div class=legend>Blockchain <span class=pull-right>{{ chainData.lastUpdated }}</span></div><div class=row><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Blockheight</h4><div class=inner><p>{{ chainData.recent.blockHeight }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Difficulty</h4><div class=inner><p>{{ chainData.recent.difficulty | number:7 }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Network</h4><div class=inner><p><b>GH</b> &nbsp; {{ chainData.recent.hashPerSec | number:4}}</p><span>{{ chainData.recent.hashPerSec * 1000000000 | number: 2 }} &nbsp; P/S</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/market/market.html',
    "<div class=legend><div><div class=pull-left>Market</div><select class=form-control ng-options=\"key as key for (key, value) in currencys\" ng-model=currency ng-change=init()></select><span class=pull-right>{{ marketData.lastUpdated }}</span></div></div><div class=row><div class=col-lg-4><div class=box><h4>1 Vertcoin</h4><div class=inner><p class=\"pull-right corner\" ng-class=\"{'up': marketData.hourChange > 0, 'down': marketData.hourChange < 0}\">{{ marketData['percent_change_1h'] }} % <span class=changes><span ng-class=\"{'up': marketData.dayChange > 0, 'down': marketData.dayChange  < 0}\">D {{ marketData['percent_change_24h'] }} %&nbsp;&nbsp; </span><span ng-class=\"{'up': marketData.weekChange  > 0, 'down': marketData.weekChange < 0}\">W {{ marketData['percent_change_7d'] }} %</span></span></p>&nbsp;<p class=pull-right>{{ currencys[currency].token }} {{ marketData[currencys[currency].price] | number: 2 }}</p></div></div></div><div class=col-lg-4><div class=box><h4><span class=pull-left>Rank {{ marketData.rank}}</span> Market Cap</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].marketCap] | number: 0 }}</p></div></div></div><div class=col-lg-4><div class=box><h4>Volume (24hr)</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].volume] | number: 0 }}</p></div></div></div></div>"
  );


  $templateCache.put('js/plugins/mining/mining.html',
    "<div class=legend>Mining</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );

}]);
