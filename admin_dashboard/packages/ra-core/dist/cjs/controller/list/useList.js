"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useList = void 0;
var react_1 = require("react");
var get_1 = __importDefault(require("lodash/get"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var util_1 = require("../../util");
var core_1 = require("../../core");
var usePaginationState_1 = __importDefault(require("../usePaginationState"));
var useSortState_1 = __importDefault(require("../useSortState"));
var useRecordSelection_1 = require("./useRecordSelection");
var fetch_1 = require("../../dataProvider/fetch");
var refetch = function () {
    throw new Error('refetch is not available for a ListContext built from useList based on local data');
};
/**
 * Handle filtering, sorting and pagination on local data.
 *
 * Returns the data and callbacks expected by <ListContext>.
 *
 * @example
 * const data = [
 *     { id: 1, name: 'Arnold' },
 *     { id: 2, name: 'Sylvester' },
 *     { id: 3, name: 'Jean-Claude' },
 * ]
 *
 * const MyComponent = () => {
 *     const listContext = useList({ data });
 *     return (
 *         <ListContextProvider value={listContext}>
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="name" />
 *             </Datagrid>
 *         </ListContextProvider>
 *     );
 * };
 *
 * @param {UseListOptions} props
 * @param {RaRecord[]} props.data An array of records
 * @param {Boolean} props.isFetching: Optional. A boolean indicating whether the data is being loaded
 * @param {Boolean} props.isLoading: Optional. A boolean indicating whether the data has been loaded at least once
 * @param {Error | String} props.error: Optional. The error if any occurred while loading the data
 * @param {Object} props.filter: Optional. An object containing the filters applied on the data
 * @param {Number} props.page: Optional. The initial page index
 * @param {Number} props.perPage: Optional. The initial page size
 * @param {SortPayload} props.sort: Optional. The initial sort (field and order)
 * @param {filterCallback} prop.filterCallback Optional. A function that allows you to make a custom filter
 */
var useList = function (props) {
    var data = props.data, error = props.error, _a = props.filter, filter = _a === void 0 ? defaultFilter : _a, _b = props.isFetching, isFetching = _b === void 0 ? false : _b, _c = props.isLoading, isLoading = _c === void 0 ? false : _c, _d = props.page, initialPage = _d === void 0 ? 1 : _d, _e = props.perPage, initialPerPage = _e === void 0 ? 1000 : _e, initialSort = props.sort, _f = props.filterCallback, filterCallback = _f === void 0 ? function (record) { return Boolean(record); } : _f;
    var resource = (0, core_1.useResourceContext)(props);
    var _g = (0, util_1.useSafeSetState)(isFetching), fetchingState = _g[0], setFetchingState = _g[1];
    var _h = (0, util_1.useSafeSetState)(isLoading), loadingState = _h[0], setLoadingState = _h[1];
    var _j = (0, util_1.useSafeSetState)(function () { return ({
        data: data,
        total: data ? data.length : undefined,
    }); }), finalItems = _j[0], setFinalItems = _j[1];
    // pagination logic
    var _k = (0, usePaginationState_1.default)({
        page: initialPage,
        perPage: initialPerPage,
    }), page = _k.page, setPage = _k.setPage, perPage = _k.perPage, setPerPage = _k.setPerPage;
    // sort logic
    var _l = (0, useSortState_1.default)(initialSort), sort = _l.sort, setSortState = _l.setSort;
    var setSort = (0, react_1.useCallback)(function (sort) {
        setSortState(sort);
        setPage(1);
    }, [setPage, setSortState]);
    // selection logic
    var _m = (0, useRecordSelection_1.useRecordSelection)(resource), selectedIds = _m[0], selectionModifiers = _m[1];
    // filter logic
    var filterRef = (0, react_1.useRef)(filter);
    var _o = (0, util_1.useSafeSetState)({}), displayedFilters = _o[0], setDisplayedFilters = _o[1];
    var _p = (0, util_1.useSafeSetState)(filter), filterValues = _p[0], setFilterValues = _p[1];
    var hideFilter = (0, react_1.useCallback)(function (filterName) {
        setDisplayedFilters(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
        setFilterValues(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
    }, [setDisplayedFilters, setFilterValues]);
    var showFilter = (0, react_1.useCallback)(function (filterName, defaultValue) {
        setDisplayedFilters(function (previousState) {
            var _a;
            return (__assign(__assign({}, previousState), (_a = {}, _a[filterName] = true, _a)));
        });
        setFilterValues(function (previousState) {
            var _a;
            return (0, util_1.removeEmpty)(__assign(__assign({}, previousState), (_a = {}, _a[filterName] = defaultValue, _a)));
        });
    }, [setDisplayedFilters, setFilterValues]);
    var setFilters = (0, react_1.useCallback)(function (filters, displayedFilters) {
        setFilterValues((0, util_1.removeEmpty)(filters));
        if (displayedFilters) {
            setDisplayedFilters(displayedFilters);
        }
        setPage(1);
    }, [setDisplayedFilters, setFilterValues, setPage]);
    // handle filter prop change
    (0, react_1.useEffect)(function () {
        if (!(0, isEqual_1.default)(filter, filterRef.current)) {
            filterRef.current = filter;
            setFilterValues(filter);
        }
    });
    // We do all the data processing (filtering, sorting, paginating) client-side
    (0, react_1.useEffect)(function () {
        if (isLoading || !data)
            return;
        var tempData = data;
        // 1. filter
        if (filterValues) {
            var flattenFilterValues_1 = (0, fetch_1.flattenObject)(filterValues);
            tempData = data
                .filter(function (record) {
                return Object.entries(flattenFilterValues_1).every(function (_a) {
                    var filterName = _a[0], filterValue = _a[1];
                    var recordValue = (0, get_1.default)(record, filterName);
                    var result = Array.isArray(recordValue)
                        ? Array.isArray(filterValue)
                            ? recordValue.some(function (item) {
                                return filterValue.includes(item);
                            })
                            : recordValue.includes(filterValue)
                        : Array.isArray(filterValue)
                            ? filterValue.includes(recordValue)
                            : filterValue == recordValue; // eslint-disable-line eqeqeq
                    return result;
                });
            })
                .filter(filterCallback);
        }
        var filteredLength = tempData.length;
        // 2. sort
        if (sort.field) {
            tempData = tempData.sort(function (a, b) {
                if ((0, get_1.default)(a, sort.field) > (0, get_1.default)(b, sort.field)) {
                    return sort.order === 'ASC' ? 1 : -1;
                }
                if ((0, get_1.default)(a, sort.field) < (0, get_1.default)(b, sort.field)) {
                    return sort.order === 'ASC' ? -1 : 1;
                }
                return 0;
            });
        }
        // 3. paginate
        tempData = tempData.slice((page - 1) * perPage, page * perPage);
        setFinalItems({
            data: tempData,
            total: filteredLength,
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(data),
        filterValues,
        isLoading,
        page,
        perPage,
        setFinalItems,
        sort.field,
        sort.order,
    ]);
    (0, react_1.useEffect)(function () {
        if (isFetching !== fetchingState) {
            setFetchingState(isFetching);
        }
    }, [isFetching, fetchingState, setFetchingState]);
    (0, react_1.useEffect)(function () {
        if (isLoading !== loadingState) {
            setLoadingState(isLoading);
        }
    }, [isLoading, loadingState, setLoadingState]);
    return {
        sort: sort,
        data: finalItems === null || finalItems === void 0 ? void 0 : finalItems.data,
        defaultTitle: '',
        error: error,
        displayedFilters: displayedFilters,
        filterValues: filterValues,
        hasNextPage: (finalItems === null || finalItems === void 0 ? void 0 : finalItems.total) == null
            ? false
            : page * perPage < finalItems.total,
        hasPreviousPage: page > 1,
        hideFilter: hideFilter,
        isFetching: fetchingState,
        isLoading: loadingState,
        onSelect: selectionModifiers.select,
        onToggleItem: selectionModifiers.toggle,
        onUnselectItems: selectionModifiers.clearSelection,
        page: page,
        perPage: perPage,
        resource: undefined,
        refetch: refetch,
        selectedIds: selectedIds,
        setFilters: setFilters,
        setPage: setPage,
        setPerPage: setPerPage,
        setSort: setSort,
        showFilter: showFilter,
        total: finalItems === null || finalItems === void 0 ? void 0 : finalItems.total,
    };
};
exports.useList = useList;
var defaultFilter = {};
//# sourceMappingURL=useList.js.map