"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _adminFormDefault = _interopRequireDefault(require("./adminFormDefault"));

var _adminFormAlternative = _interopRequireDefault(require("./adminFormAlternative"));

var _router = require("next/router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AdminForm(props) {
  var router = (0, _router.useRouter)();
  var currentId = isNaN(props.params[1]) ? props.params[1] : Number(props.params[1]);
  var tableName = props.params[0];
  var url = router.asPath;

  var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showDefaultPage = _useState2[0],
      setShowDefaultPage = _useState2[1];

  return /*#__PURE__*/_react.default.createElement("div", null, showDefaultPage ? /*#__PURE__*/_react.default.createElement(_adminFormDefault.default, {
    currentId: currentId,
    tableName: tableName,
    url: url,
    handleShow: setShowDefaultPage
  }) : /*#__PURE__*/_react.default.createElement(_adminFormAlternative.default, {
    currentId: currentId,
    tableName: tableName,
    url: url,
    handleShow: setShowDefaultPage
  }));
}

var _default = AdminForm;
exports.default = _default;