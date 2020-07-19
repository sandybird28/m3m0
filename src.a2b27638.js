// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var face = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/face-with-stuck-out-tongue-and-winking-eye_1f61c.png';

var Card = /*#__PURE__*/function () {
  function Card(x, y, src) {
    _classCallCheck(this, Card);

    this.x = x;
    this.y = y;
    this.src = src;
    this.size = _index.default.sizeOfCard;
    this.width = this.size;
    this.choosen = false;
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.startFlip = false;
    this.flipped = false;
    this.slice = this.size / 7;
  }

  _createClass(Card, [{
    key: "drawFace",
    value: function drawFace(ctx) {
      var img = new Image();
      img.src = face;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.size);
      ctx.drawImage(img, this.x + 5, this.y + 5, this.width - 10, this.size - 10);

      if (this.startFlip) {
        this.width -= this.slice;
      }

      if (this.width <= this.slice) {
        this.startFlip = false;
        this.flipped = true;
      }
    }
  }, {
    key: "drawPic",
    value: function drawPic(ctx) {
      if (this.width < this.size) {
        this.width += this.slice;
      } else {
        this.width = this.size;
      }

      var img = new Image();
      img.src = this.src;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.drawImage(img, this.x + 5, this.y + 5, this.size - 10, this.size - 10);
    }
  }, {
    key: "is_selected",
    value: function is_selected(x, y) {
      var decision = x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size;

      if (decision) {
        this.startFlip = true;
      }

      return decision;
    }
  }]);

  return Card;
}();

exports.default = Card;
},{"./index":"src/index.js"}],"src/fruits.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShuffledArray = getShuffledArray;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var src = {
  grape: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/grapes_1f347.png',
  pineaple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/pineapple_1f34d.png',
  peach: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/peach_1f351.png',
  banana: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/banana_1f34c.png',
  lemon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/microsoft/209/lemon_1f34b.png',
  mango: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/mango_1f96d.png',
  redApple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/red-apple_1f34e.png',
  strawberry: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/strawberry_1f353.png',
  cherries: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/cherries_1f352.png',
  greenApple: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/green-apple_1f34f.png',
  melon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/melon_1f348.png',
  waterMelon: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/watermelon_1f349.png',
  pear: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/pear_1f350.png'
};

function getShuffledArray() {
  var array = [];
  var fruits = Object.values(src);

  for (var i = 0; i < _index.default.amountOfCards / 2; i++) {
    var index = Math.floor(Math.random() * fruits.length);
    array.push(fruits.splice(index, 1));
  }

  array = array.concat(array);

  for (var _i = array.length - 1; _i > 0; _i--) {
    var j = Math.floor(Math.random() * (_i + 1));
    var _ref = [array[j], array[_i]];
    array[_i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
}
},{"./index":"src/index.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _card = _interopRequireDefault(require("./card"));

var fruits = _interopRequireWildcard(require("./fruits"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var m3m0 = /*#__PURE__*/function () {
  function m3m0() {
    _classCallCheck(this, m3m0);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.cards = [];
    this.flippedCards = [];
    this.clickedTile = 0;
  }

  _createClass(m3m0, [{
    key: "initGame",
    value: function initGame() {
      var _this = this;

      this.addCards();
      this.addResetBtn();
      document.addEventListener("click", function (event) {
        return _this.clickHandler(event);
      });
      this.draw();
    }
  }, {
    key: "addCards",
    value: function addCards() {
      var shuffledSrcs = fruits.getShuffledArray();
      var size = m3m0.sizeOfCard + m3m0.gapBetwenCards;

      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 2; j++) {
          this.cards.push(new _card.default(i * size, j * size, shuffledSrcs.pop()));
        }
      }
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(event) {
      var rect = this.canvas.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;

      for (var i = 0; i < this.cards.length; i++) {
        if (this.clickedTile <= 1 && this.cards[i].is_selected(mouseX, mouseY) && this.cards[i].choosen !== true) {
          this.cards[i].choosen = true;
          this.flippedCards.push(i);
          this.clickedTile++;
        }
      }
    }
  }, {
    key: "addResetBtn",
    value: function addResetBtn() {
      this.btn = document.createElement('button');
      this.btn.addEventListener('click', this.reset.bind(this));
      this.btn.setAttribute('id', 'reset');
      this.btn.innerText = 'Reset';
      document.body.appendChild(this.btn);
    }
  }, {
    key: "draw",
    value: function draw() {
      //draws frame
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].flipped === false) {
          this.cards[i].drawFace(this.ctx);
        } else {
          this.cards[i].drawPic(this.ctx);
        }
      }

      this.check();
      this.requestId = requestAnimationFrame(this.draw.bind(this));
    }
  }, {
    key: "check",
    value: function check() {
      var _this2 = this;

      //checks if the chosen cards match
      if (this.flippedCards.length === 2) {
        var first = this.flippedCards[0];
        var second = this.flippedCards[1];

        if (this.cards[first].src === this.cards[second].src) {
          this.flippedCards = [];
          this.clickedTile = 0;
        } else {
          setTimeout(function () {
            _this2.cards[first].flipped = false;
            _this2.cards[second].flipped = false;
            _this2.cards[first].choosen = false;
            _this2.cards[second].choosen = false;
            _this2.clickedTile = 0;
          }, m3m0.flipDelay);
        }

        this.flippedCards = [];
      } //checks if all cards are flipped


      var amountOfFlippedCards = 0;
      this.cards.forEach(function (card) {
        amountOfFlippedCards += Number(card.flipped);
      });

      if (amountOfFlippedCards === m3m0.amountOfCards) {
        if (this.timer) return;
        this.timer = setTimeout(function () {
          _this2.reset();

          _this2.timer = null;
        }, m3m0.flipDelay);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      // set new cards
      this.cards = [];
      this.flippedCards = [];
      this.clickedTile = 0;
      this.addCards();
    }
  }]);

  return m3m0;
}();

exports.default = m3m0;

_defineProperty(m3m0, "sizeOfCard", 140);

_defineProperty(m3m0, "gapBetwenCards", 10);

_defineProperty(m3m0, "amountOfCards", 10);

_defineProperty(m3m0, "flipDelay", 1000);

new m3m0().initGame();
},{"./card":"src/card.js","./fruits":"src/fruits.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62212" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map