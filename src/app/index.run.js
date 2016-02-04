(function() {
  'use strict';

  angular
    .module('whoamiFrontend')
    .run(marioFavicon);

  /** @ngInject */
  function marioFavicon(Favico, $interval) {
    var favicon = new Favico({
      animation:'slide',
      position: 'up'
    });
    var up = new Image();
    up.src = 'assets/images/mario-up.gif';

    var down = new Image();
    down.src = 'assets/images/mario-down.gif';

    var isDown = true;

    $interval(changeIcon, 10);

    function changeIcon() {
      isDown = !isDown;
      if (isDown) {
        favicon.image(down);
      } else {
        favicon.image(up);
      }
    }
  }
})();
