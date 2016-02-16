'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _structure = require('./structure');

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screenshot = function (_SimpleNode$class) {
  _inherits(Screenshot, _SimpleNode$class);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Screenshot).apply(this, arguments));
  }

  _createClass(Screenshot, [{
    key: 'onInvoke',
    value: function onInvoke(columns) {
      var text = columns.text;
      var isHTML = columns.isHTML;
      var width = columns.width;
      var height = columns.height;

      console.log('Screenshotting ' + text + ' with ' + width + 'x' + height + ' resolution.');

      var options = {
        windowSize: {
          width: width,
          height: height
        },
        siteType: isHTML ? 'html' : 'url'
      };

      return new Promise(function (resolve, reject) {
        var stream = (0, _webshot2.default)(text, options);
        var list = [];

        stream.on('data', function (data) {
          list.push(data);
        });

        stream.on('end', function () {
          console.log('Screenshotted ' + text + ' successfully.');
          resolve({
            png: Buffer.concat(list)
          });
        });
      });
    }
  }]);

  return Screenshot;
}(_dslink.SimpleNode.class);

var link = new _dslink.LinkProvider(process.argv.slice(2), 'screenshot-', {
  defaultNodes: _structure.defaultNodes,
  profiles: {
    screenshot: function screenshot(path, provider) {
      return new Screenshot(path, provider);
    }
  }
});

link.connect();