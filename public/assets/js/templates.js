angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div class=\"container ng-scope\"><div class=\"header clearfix\"><h2 class=text-muted>Vertcoin Dashboard</h2></div><div class=marketing><market-plugin></market-plugin><blockchain-plugin></blockchain-plugin><mining-plugin></mining-plugin></div><footer class=footer><p>VtAcqCUWarBYTXPFFXNBB1ikqjMsFeVaQH</p></footer></div>"
  );


  $templateCache.put('js/plugins/blockchain/blockchain.html',
    "<div class=wrapper-top><div class=legend>Blockchain <span class=pull-right>{{ chainData.lastUpdated }}</span></div></div><div class=row><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Blockheight</h4><div class=inner><p>{{ chainData.recent.blockHeight }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Difficulty</h4><div class=inner><p>{{ chainData.recent.difficulty | number:7 }}</p></div></div></div></div><div class=\"col-lg-4 col-md-4 col-sm-4\"><div><div class=box><h4>Network</h4><div class=inner><p><b>GH</b> &nbsp; {{ chainData.recent.hashPerSec | number:4}}</p><span>{{ chainData.recent.hashPerSec * 1000000000 | number: 2 }} &nbsp; P/S</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/market/market.html',
    "<div class=wrapper-top><div class=legend><div><div class=pull-left>Market</div><select class=form-control ng-options=\"key as key for (key, value) in currencys\" ng-model=currency ng-change=init()></select><span class=pull-right>{{ marketData.lastUpdated }}</span></div></div></div><div class=row><div class=col-lg-4><div class=box><h4>1 Vertcoin</h4><div class=inner><p class=\"pull-right corner\" ng-class=\"{'up': marketData.hourChange > 0, 'down': marketData.hourChange < 0}\">{{ marketData['percent_change_1h'] }} % <span class=changes><span ng-class=\"{'up': marketData.dayChange > 0, 'down': marketData.dayChange  < 0}\">D {{ marketData['percent_change_24h'] }} %&nbsp;&nbsp; </span><span ng-class=\"{'up': marketData.weekChange  > 0, 'down': marketData.weekChange < 0}\">W {{ marketData['percent_change_7d'] }} %</span></span></p>&nbsp;<p class=pull-right>{{ currencys[currency].token }} {{ marketData[currencys[currency].price] | number: 2 }}</p></div></div></div><div class=col-lg-4><div class=box><h4><span class=pull-left>Rank {{ marketData.rank}}</span> Market Cap</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].marketCap] | number: 0 }}</p></div></div></div><div class=col-lg-4><div class=box><h4>Volume (24hr)</h4><div class=inner><p>{{ currencys[currency].token }} {{ marketData[currencys[currency].volume] | number: 0 }}</p></div></div></div></div>"
  );


  $templateCache.put('js/plugins/mining/mining.html',
    "<div class=wrapper-top><div class=legend>Mining</div></div><div class=row><div class=\"col-lg-6 col-md-6 col-sm-6\"><div><div class=\"box height-override\"><div><h4>One Click Miner</h4><div class=inner><div><a class=pull-left href=https://github.com/vertcoin/One-Click-Miner/releases>https://github.com/vertcoin/One-Click-Miner/releases</a> <a href=http://alwayshashing.com/ocmhowto.pdf>Guide & Setup</a></div></div></div><div><h4>CC Miner</h4><div class=inner><div><a class=pull-left href=https://github.com/tpruvot/ccminer/releases>https://github.com/tpruvot/ccminer/releases</a> <a href=https://www.cryptocurrencyfreak.com/2017/08/05/vertcoin-mining-with-ccminer-on-windows-10/ >Guide & Setup</a></div><div><a class=pull-left href=https://github.com/KlausT/ccminer/releases>https://github.com/KlausT/ccminer/releases</a> <a href=https://www.cryptocurrencyfreak.com/2017/08/05/vertcoin-mining-with-ccminer-on-windows-10/ >Guide & Setup</a></div></div></div><div class=separator></div><div><h4>Mining Pools</h4><div class=inner><h5>Net1 Pools (Recommended for 100+ MHP/S)</h5><div><a href=https://scanner.vtconline.org/ >https://scanner.vtconline.org</a></div><div><a href=http://vertscan1.errantshed.co.uk/ >http://vertscan1.errantshed.co.uk/</a></div><div><a href=http://scanner1.alwayshashing.com/ >http://scanner1.alwayshashing.com/</a></div><h5>Net2 Pools (Recommended for lower hash rate)</h5><div><a href=http://vertscan2.errantshed.co.uk/ >http://vertscan2.errantshed.co.uk/</a></div><div><a href=http://scanner2.alwayshashing.com/ >http://scanner2.alwayshashing.com/</a></div></div></div></div></div></div></div>"
  );

}]);
