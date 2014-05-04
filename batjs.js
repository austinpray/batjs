/*! batjs v0.0.0 - MIT license */

;(function (global) { function moduleDefinition($) {

// ---------------------------------------------------------------------------

'use strict';

/**
 * @param {}
 * @return {}
 * @api public
 */

function batjs() {
  var myTimeline = new TimelineMax({ 
    autoRemoveChildren: true,
    paused: true, 
    stagger: 0.5
  });
  var bats = [];
  function batSource(amount) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var randomY = function () {
      return Math.floor(Math.random() * (windowHeight - 0) + 0);
    }
    var randomX;
    var elCache;
    var randomTime;
    for(var i = 0; i < amount; i++) {
      bats.push($('<div class="pixel"></div>'));
    }
    $.each(bats, function(i, el) {
      randomX = Math.random() * (windowHeight - 0) + 0;
      console.log(el.width());
      $('body').append(el);
    });
    $('.pixel').each(function () {
      elCache = $(this);
      randomTime = Math.random();
      TweenMax.set(elCache, { x: -elCache.width(), y: randomY() });
      myTimeline.insert(TweenMax.to (elCache, 3, {
        left: windowWidth + elCache.width(),
        top: randomY(),
        ease: randomY() % 2 ? 'easeInSine' : 'easeOutSine',
        onComplete: function () {
          $(this.target[0]).remove();
        }
      }), randomTime);
    });
    myTimeline.play();
  }
  return {
    batSource: batSource
  };
}

/**
 * Expose batjs
 */

return batjs;

// ---------------------------------------------------------------------------

} if (typeof exports === 'object') {
    // node export
    module.exports = moduleDefinition(/*require('dependency')*/);
} else if (typeof define === 'function' && define.amd) {
    // amd anonymous module registration
    define([/*'dependency'*/], moduleDefinition);
} else {
    // browser global
    global.batjs = moduleDefinition(jQuery);
}}(this));
