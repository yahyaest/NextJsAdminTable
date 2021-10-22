"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _reactBootstrap = require("react-bootstrap");

var _admin = require("../redux/admin");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Selector(props) {
  Selector.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired,
    filterSelectorShowed: _propTypes.PropTypes.func.isRequired,
    filterSelectorHided: _propTypes.PropTypes.func.isRequired
  };
  var currentTable = props.currentTable,
      filterSelectorShowed = props.filterSelectorShowed,
      filterSelectorHided = props.filterSelectorHided,
      filters = props.filters,
      currentFilter = props.currentFilter,
      filterType = props.filterType,
      handleFilter = props.handleFilter,
      currentOption = props.currentOption,
      handleOption = props.handleOption,
      filterOptions = props.filterOptions,
      resetCurrentOption = props.resetCurrentOption;

  var _useState = (0, _react.useState)(filters),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    var getOption = function getOption() {
      if (filterType === "filterList") setOptions(filters);
      if (filterType === "filterOptions") setOptions(filterOptions(currentFilter));
    };

    getOption();
    if (!(currentTable !== null && currentTable !== void 0 && currentTable.filters)) filterSelectorHided();
  }, [filters, currentFilter]);
  return /*#__PURE__*/_react.default.createElement("div", null, filters && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Toggle, {
    variant: "light",
    id: "dropdown-basic",
    size: "sm"
  }, currentFilter === "Filters" && /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-filter"
  }), filterType === "filterList" ? currentFilter : currentOption === true ? "true" : currentOption === false ? "false" : currentOption), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Menu, null, options === null || options === void 0 ? void 0 : options.map(function (filter) {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Dropdown.Item, {
      key: filterType + filter,
      onClick: function onClick() {
        filterSelectorShowed();

        if (filterType === "filterList") {
          handleFilter(filter);
          resetCurrentOption("Options");
        }

        if (filterType === "filterOptions") {
          handleOption(filter);
        }
      }
    }, filter === true ? "true" : filter === false ? "false" : filter);
  }))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  filterSelectorShowed: _admin.filterSelectorShowed,
  filterSelectorHided: _admin.filterSelectorHided
})(Selector);

exports.default = _default;