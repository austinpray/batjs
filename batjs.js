/*! batjs v0.0.0 - MIT license */

;(function (global) { function moduleDefinition($, async, _) {

// ---------------------------------------------------------------------------

'use strict';

/**
 * @param {}
 * @return {}
 * @api public
 */

function batjs() {
  var context = document.getElementById("batContext");
  var batCache = [];
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var randomY = function () {
    return Math.floor(Math.random() * (windowHeight - 0) + 0);
  }
  var batQ = async.queue(function (bat, callback) {
    async.series([
      function(callback){
        callback(null, bat.create());
      },
      function(callback){
        callback(null, bat.draw());
      }
    ],
    function () {
      if(_.isFunction(callback)) {
        callback();
      }
    });
  }, 100);
  var Bat = function () {
    var batEl;
    return {
      create: function () {
        batEl = document.createElement("div");
        batEl.className = "pixel";
        fastdom.write(function() {
          context.appendChild(batEl);
        });
      },
      draw: function () {
        TweenMax.to (batEl, 3, {
          delay: Math.random(),
          x: windowWidth + batEl.offsetWidth,
          y: randomY(),
          ease: randomY() % 2 ? 'easeInSine' : 'easeOutSine',
          onComplete: function (bat) {
            bat.destroy();
          },
          onCompleteParams: [this]
        });
      },
      destroy: function () {
        context.removeChild(batEl);
      }
    };
  };

  var addBats = function (num) {
    if(num < 1) {
      return;
    } else {
      batQ.push(new Bat());
      addBats(num - 1);
    }
  };
  
  return {
    addBats: addBats
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
    global.batjs = moduleDefinition(jQuery, async, _);
}}(this));
