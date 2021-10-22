"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _propTypes = require("prop-types");

var _admin = require("./redux/admin");

var _sleepFunction = require("./services/sleepFunction");

var _router = require("next/router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AdminDashboard(props) {
  AdminDashboard.prototype = {
    tables: _propTypes.PropTypes.array.isRequired,
    loadTable: _propTypes.PropTypes.func.isRequired,
    createButtonShowed: _propTypes.PropTypes.func.isRequired
  };
  var tables = props.tables,
      loadTable = props.loadTable,
      createButtonShowed = props.createButtonShowed,
      onPageChange = props.onPageChange,
      resetSearchString = props.resetSearchString,
      resetCurrentFilter = props.resetCurrentFilter,
      resetCurrentOption = props.resetCurrentOption;
  var router = (0, _router.useRouter)();
  (0, _react.useEffect)(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var tableName, tableIndex;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _sleepFunction.sleepTime)(100);

              case 2:
                tableName = window.location.pathname.replace("/admin/", "").replace("/", "");
                tableIndex = tables.findIndex(function (table) {
                  return table.data.name === tableName;
                });

                if (tableIndex !== -1) {
                  loadTable(tables[tableIndex]);
                } else {
                  loadTable(tables[tables.length - 1]);
                }

                createButtonShowed();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, [tables]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("nav", {
    className: "slideBar"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "slideBar__list"
  }, tables.map(function (table) {
    return /*#__PURE__*/_react.default.createElement("li", {
      key: table.data.name,
      className: "slideBar__item",
      onClick: function onClick(e) {
        // Selected Element Style
        e.currentTarget.parentElement.childNodes.forEach(function (element) {
          element.classList.remove("slideBar__item__selected");
        });
        e.currentTarget.classList.add("slideBar__item__selected"); // Get Table Data

        var currentTableName = "";
        tables.map(function (table) {
          if (e.currentTarget.innerHTML.includes(table.data.name)) currentTableName = table.data.name;
        });
        currentTableName = e.currentTarget.innerText ? e.currentTarget.innerText : currentTableName;
        var currentTableData = tables.find(function (table) {
          return table.data.name === currentTableName;
        });
        loadTable(currentTableData); // Handle Table Options

        createButtonShowed();
        onPageChange(1);
        resetSearchString("");
        resetCurrentFilter("Filters");
        resetCurrentOption("Options");
        router.push("/admin");
      }
    }, table.data.icon && /*#__PURE__*/_react.default.createElement("div", {
      className: "slideBar__icon"
    }, " ", table.data.icon), /*#__PURE__*/_react.default.createElement("p", {
      className: "slideBar__title"
    }, table.data.name));
  }))));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    tables: state.admin.tables
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  loadTable: _admin.loadTable,
  createButtonShowed: _admin.createButtonShowed
})(AdminDashboard);

exports.default = _default;