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
  };
  var Bat = function () {
    this.batEl;
  };
  Bat.prototype.create = function () {
    var that = this;
    this.batEl = document.createElement("div");
    this.batEl.className = "pixel";
    fastdom.write(function() {
      context.appendChild(this.batEl);
    }, this);
  };
  Bat.prototype.draw = function () {
    TweenMax.set(this.batEl, {
      x: this.batEl.offsetWidth,
      y: randomY()
    });
    TweenMax.to (this.batEl, 3, {
      delay: Math.random(),
      x: windowWidth + this.batEl.offsetWidth,
      y: randomY(),
      ease: randomY() % 2 ? 'easeInSine' : 'easeOutSine',
      onComplete: function (bat) {
        bat.destroy();
      },
      onCompleteParams: [this]
    });
  }; 
  Bat.prototype.destroy = function () {
    fastdom.write(function () {
      context.removeChild(this.batEl);
      this.batEl = "";
    }, this);
  };

  var addBats = function (num) {
    var b;
    while(num-- > -1) {
      //batQ.push(new Bat());
      b = new Bat();
      b.create();
      b.draw();
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
