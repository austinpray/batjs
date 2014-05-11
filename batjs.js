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
  Bat.prototype.create = function (callback) {
    var self = this;
    var addEl = function (callback) {
      self.batEl = document.createElement("div");
      self.batEl.style.left = "-100px";
      self.batEl.className = "pixel";
      fastdom.write(function() {
        context.appendChild(self.batEl);
        callback(null);
      });
    }
    var setEl = function (callback) {
      TweenMax.set(self.batEl, {
        x: self.batEl.offsetWidth,
        y: randomY()
      });
      callback(null);
    }
    async.series([
      addEl
    ], 
    function () {
      if(_.isFunction(callback)) {
        callback();
      }
    });
  };
  Bat.prototype.draw = function (callback) {
    TweenMax.to (this.batEl, 3, {
      delay: Math.random(),
      x: windowWidth + 100,
      y: randomY(),
      ease: randomY() % 2 ? 'easeInSine' : 'easeOutSine',
      onComplete: function (bat) {
        bat.destroy();
      },
      onCompleteParams: [this]
    });
    if(_.isFunction(callback)) {
      callback();
    }
  }; 
  Bat.prototype.destroy = function () {
    fastdom.write(function () {
      context.removeChild(this.batEl);
      this.batEl = "";
    }, this);
  };

  var addBats = function (num) {
    if(num < 0) {
      return;
    } else {
      var b = new Bat();
      b.create();
      b.draw();
      num -= 1;
      addBats(num);
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
