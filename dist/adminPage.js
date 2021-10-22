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

var _lodash = _interopRequireDefault(require("lodash"));

var _adminNavbar = _interopRequireDefault(require("./adminNavbar"));

var _adminDashboard = _interopRequireDefault(require("./adminDashboard"));

var _adminMenu = _interopRequireDefault(require("./adminMenu"));

var _adminTable = _interopRequireDefault(require("./adminTable"));

var _pagination = _interopRequireDefault(require("./common/pagination"));

var _reactToastify = require("react-toastify");

var _dataModeling = require("./services/dataModeling");

var _admin = require("./redux/admin");

var _urlQuery = require("./services/urlQuery");

var _router = require("next/router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AdminPage(props) {
  AdminPage.prototype = {
    currentTable: _propTypes.PropTypes.object.isRequired
  };
  var router = (0, _router.useRouter)();
  var urlSearch = router.asPath.includes("undefined=&") ? "?" + router.asPath.split("?")[1].replace("undefined=&", "") : "?" + router.asPath.split("?")[1];
  var urlPathname = router.pathname;
  var queryParams = new URLSearchParams(urlSearch);
  var pageQuery = queryParams.get("page");
  var pageSizeQuery = queryParams.get("pageSize");
  var filterQuery = queryParams.get("filter");
  var optionQuery = queryParams.get("filterOption");
  var searchQuery = queryParams.get("search");
  var sortByQuery = queryParams.get("sortBy");
  var sortOrderQuery = queryParams.get("sortOrder");
  var currentTable = props.currentTable,
      filterSelectorShowed = props.filterSelectorShowed;

  var _useState = (0, _react.useState)(sortByQuery ? sortByQuery : "id"),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      sortBy = _useState2[0],
      setSortBy = _useState2[1];

  var _useState3 = (0, _react.useState)(sortOrderQuery ? sortOrderQuery : "asc"),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      sortOrder = _useState4[0],
      setSortOrder = _useState4[1];

  var _useState5 = (0, _react.useState)(searchQuery ? searchQuery : ""),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      searchString = _useState6[0],
      setSearchString = _useState6[1];

  var _useState7 = (0, _react.useState)(pageQuery ? parseInt(pageQuery) : 1),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      currentPage = _useState8[0],
      setCurrentPage = _useState8[1];

  var _useState9 = (0, _react.useState)(filterQuery ? filterQuery : "Filters"),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      currentFilter = _useState10[0],
      setCurrentFilter = _useState10[1];

  var _useState11 = (0, _react.useState)(optionQuery ? optionQuery : "Options"),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      currentOption = _useState12[0],
      setCurrentOption = _useState12[1];

  var _useState13 = (0, _react.useState)(pageSizeQuery ? parseInt(pageSizeQuery) : 10),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      pageSize = _useState14[0],
      setPageSize = _useState14[1]; //const pageSize = 10;


  if (filterQuery) filterSelectorShowed();

  var handlePageSize = function handlePageSize(pageSize) {
    setPageSize(pageSize);
    setCurrentPage(1);
    (0, _urlQuery.handleUrlQueries)(queryParams, searchString, currentFilter, currentOption, 1, pageSize, sortBy, sortOrder);
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var handleSearch = function handleSearch(e) {
    setCurrentPage(1);
    setSearchString(e.currentTarget.value);
    setCurrentFilter("Filters");
    setCurrentOption("Options");
    (0, _urlQuery.handleUrlQueries)(queryParams, e.currentTarget.value, "Filters", "Options", 1, pageSize, sortBy, sortOrder);
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var handleFilter = function handleFilter(filter) {
    setCurrentFilter(filter);
    setCurrentPage(1);
    (0, _urlQuery.handleUrlQueries)(queryParams, searchString, filter, "Options", 1, pageSize, sortBy, sortOrder);
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var handleOption = function handleOption(option) {
    setCurrentOption(option);
    setCurrentPage(1);
    (0, _urlQuery.handleUrlQueries)(queryParams, searchString, currentFilter, option, 1, pageSize, sortBy, sortOrder);
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var getFilterOptions = function getFilterOptions(currentFilter) {
    var _currentTable$data;

    var filterOptions = ["Options"];
    var result = [];

    if (currentTable !== null && currentTable !== void 0 && (_currentTable$data = currentTable.data) !== null && _currentTable$data !== void 0 && _currentTable$data.table) {
      result = (0, _dataModeling.getTableData)(currentTable);
    }

    result.map(function (element) {
      if (currentFilter !== "Filters") {
        var value = (0, _dataModeling.handleNestedProperty)(element, currentFilter);
        var index = filterOptions.indexOf(value);
        if (index === -1) filterOptions.push(value);
      }
    });
    return filterOptions;
  };

  var renderSortIcon = function renderSortIcon(sortType) {
    if (sortType !== sortBy) return null;
    if (sortOrder === "asc") return /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-sort-asc",
      style: {
        margin: "0 10px"
      }
    });
    return /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-sort-desc",
      style: {
        margin: "0 10px"
      }
    });
  };

  var onSort = function onSort(sortType) {
    setSortBy(sortType);
    sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
    setCurrentPage(1);
    (0, _urlQuery.handleUrlQueries)(queryParams, searchString, currentFilter, currentOption, 1, pageSize, sortType, sortOrder === "desc" ? "asc" : "desc");
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var paginate = function paginate(items, pageNumber, pageSize) {
    var startIndex = (pageNumber - 1) * pageSize;
    return (0, _lodash.default)(items).slice(startIndex).take(pageSize).value();
  };

  var handlePageChange = function handlePageChange(page) {
    setCurrentPage(page);
    (0, _urlQuery.handleUrlQueries)(queryParams, searchString, currentFilter, currentOption, page, pageSize, sortBy, sortOrder);
    window.history.replaceState({}, "", "".concat(urlPathname, "?").concat(queryParams));
  };

  var getCurrentTableData = function getCurrentTableData(sortType) {
    var _currentTable$data2;

    if (currentTable !== null && currentTable !== void 0 && (_currentTable$data2 = currentTable.data) !== null && _currentTable$data2 !== void 0 && _currentTable$data2.table) {
      var result = (0, _dataModeling.getTableData)(currentTable); // 1-filter

      var data = [];
      if (searchString && currentTable !== null && currentTable !== void 0 && currentTable.search) data = result.filter(function (element) {
        var _element$;

        return (_element$ = element["".concat(currentTable === null || currentTable === void 0 ? void 0 : currentTable.search)]) === null || _element$ === void 0 ? void 0 : _element$.toLowerCase().startsWith(searchString.toLowerCase());
      });else if (currentOption === "Options" || !(currentTable !== null && currentTable !== void 0 && currentTable.filters)) data = result;else data = result.filter( // (element) => element[`${currentFilter}`] === currentOption
      function (element) {
        return (0, _dataModeling.handleNestedProperty)(element, currentFilter) === currentOption;
      }); // 2-sort

      var sorted = _lodash.default.orderBy(data, sortType, sortOrder); // 3-paginate


      var _count = currentOption === "Options" && !searchString ? result.length : data.length;

      var pagesCount = Math.ceil(_count / pageSize);
      var activePage = currentPage > pagesCount ? 1 : currentPage;

      var _modelData = paginate(sorted, activePage, pageSize);

      return {
        modelData: _modelData,
        count: _count
      };
    } else return [];
  };

  var _getCurrentTableData = getCurrentTableData(sortBy),
      modelData = _getCurrentTableData.modelData,
      count = _getCurrentTableData.count;

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
  }), /*#__PURE__*/_react.default.createElement(_adminNavbar.default, {
    handleSearch: handleSearch,
    search: searchString
  }), /*#__PURE__*/_react.default.createElement(_adminDashboard.default, {
    onPageChange: handlePageChange,
    resetCurrentFilter: setCurrentFilter,
    resetCurrentOption: setCurrentOption,
    resetSearchString: setSearchString
  }), /*#__PURE__*/_react.default.createElement(_adminMenu.default, {
    filters: currentTable === null || currentTable === void 0 ? void 0 : currentTable.filters,
    currentFilter: currentFilter,
    handleFilter: handleFilter,
    currentOption: currentOption,
    handleOption: handleOption,
    filterOptions: getFilterOptions,
    resetCurrentOption: setCurrentOption
  }), /*#__PURE__*/_react.default.createElement(_adminTable.default, {
    onSort: onSort,
    renderSortIcon: renderSortIcon,
    onPageChange: handlePageChange,
    modelData: modelData
  }), /*#__PURE__*/_react.default.createElement(_pagination.default, {
    itemsCounts: count,
    pageSize: pageSize,
    currentPage: currentPage,
    onPageChange: handlePageChange,
    handlePageSize: handlePageSize
  }));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentTable: state.admin.currentTable
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  filterSelectorShowed: _admin.filterSelectorShowed
})(AdminPage);

exports.default = _default;