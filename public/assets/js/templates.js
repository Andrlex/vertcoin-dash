angular.module('app.tpl', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/tpl/app.html',
    "<div class=\"container ng-scope\"><div class=\"header clearfix\"><h3 class=text-muted>Vertcoin Dashboard</h3></div><div class=marketing><market-plugin></market-plugin><blockchain-plugin></blockchain-plugin><mining-plugin></mining-plugin><div class=legend>Information</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div></div><footer class=footer><p>VtAcqCUWarBYTXPFFXNBB1ikqjMsFeVaQH</p></footer></div>"
  );


  $templateCache.put('js/plugins/blockchain/blockchain.html',
    "<div class=legend>Blockchain</div><div class=row><div class=col-lg-4><div><div class=box><h4>Blockheight</h4><div class=inner><p>{{ blockHeight }}</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/market/market.html',
    "<div class=legend>Market</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );


  $templateCache.put('js/plugins/mining/mining.html',
    "<div class=legend>Mining</div><div class=row><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div><div class=col-lg-4><div><div class=box><h4>Widget</h4><div class=inner><p>$3.40</p><span>^ 5.54%</span></div></div></div></div></div>"
  );

}]);
