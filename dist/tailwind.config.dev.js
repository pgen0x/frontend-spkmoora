"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var plugin = require("tailwindcss/plugin");

var colors = require("tailwindcss/colors");

module.exports = {
  content: ["./**/*.html", "./*.html", "./**/*.js", "./*.js"],
  theme: {
    colors: _objectSpread({}, colors),
    extend: {
      minHeight: {
        "screen-75": "75vh"
      },
      fontSize: {
        55: "55rem"
      },
      opacity: {
        80: ".8"
      },
      zIndex: {
        2: 2,
        3: 3
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px"
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px"
      },
      maxHeight: {
        "860-px": "860px"
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px"
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem"
      },
      backgroundSize: {
        full: "100%"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), plugin(function (_ref) {
    var addComponents = _ref.addComponents,
        theme = _ref.theme;
    var screens = theme("screens", {});
    addComponents([{
      ".container": {
        width: "100%"
      }
    }, _defineProperty({}, "@media (min-width: ".concat(screens.sm, ")"), {
      ".container": {
        "max-width": "640px"
      }
    }), _defineProperty({}, "@media (min-width: ".concat(screens.md, ")"), {
      ".container": {
        "max-width": "768px"
      }
    }), _defineProperty({}, "@media (min-width: ".concat(screens.lg, ")"), {
      ".container": {
        "max-width": "1024px"
      }
    }), _defineProperty({}, "@media (min-width: ".concat(screens.xl, ")"), {
      ".container": {
        "max-width": "1280px"
      }
    }), _defineProperty({}, "@media (min-width: ".concat(screens["2xl"], ")"), {
      ".container": {
        "max-width": "1280px"
      }
    })]);
  })]
};