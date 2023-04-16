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
import { useCallback, useEffect, useRef } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { useSafeSetState, removeEmpty } from '../../util';
import { useGetManyReference } from '../../dataProvider';
import { useNotify } from '../../notification';
import usePaginationState from '../usePaginationState';
import { useRecordSelection } from '../list/useRecordSelection';
import useSortState from '../useSortState';
import { useResourceContext } from '../../core';
var defaultFilter = {};
/**
 * Fetch reference records, and return them when available
 *
 * Uses dataProvider.getManyReference() internally.
 *
 * @example // fetch the comments related to the current post
 * const { isLoading, data } = useReferenceManyFieldController({
 *     reference: 'comments',
 *     target: 'post_id',
 *     record: { id: 123, title: 'hello, world' },
 *     resource: 'posts',
 * });
 *
 * @param {Object} props
 * @param {string} props.reference The linked resource name. Required.
 * @param {string} props.target The target resource key. Required.
 * @param {Object} props.filter The filter applied on the recorded records list
 * @param {number} props.page the page number
 * @param {number} props.perPage the number of item per page
 * @param {Object} props.record The current resource record
 * @param {string} props.resource The current resource name
 * @param {Object} props.sort the sort to apply to the referenced records
 * @param {string} props.source The key of the linked resource identifier
 *
 * @returns {ListControllerResult} The reference many props
 */
export var useReferenceManyFieldController = function (props) {
    var reference = props.reference, record = props.record, target = props.target, _a = props.filter, filter = _a === void 0 ? defaultFilter : _a, source = props.source, initialPage = props.page, initialPerPage = props.perPage, _b = props.sort, initialSort = _b === void 0 ? { field: 'id', order: 'DESC' } : _b;
    var notify = useNotify();
    var resource = useResourceContext(props);
    // pagination logic
    var _c = usePaginationState({
        page: initialPage,
        perPage: initialPerPage,
    }), page = _c.page, setPage = _c.setPage, perPage = _c.perPage, setPerPage = _c.setPerPage;
    // sort logic
    var _d = useSortState(initialSort), sort = _d.sort, setSortState = _d.setSort;
    var setSort = useCallback(function (sort) {
        setSortState(sort);
        setPage(1);
    }, [setPage, setSortState]);
    // selection logic
    var _e = useRecordSelection("".concat(resource, ".").concat(record === null || record === void 0 ? void 0 : record.id, ".").concat(reference)), selectedIds = _e[0], selectionModifiers = _e[1];
    // filter logic
    var filterRef = useRef(filter);
    var _f = useSafeSetState({}), displayedFilters = _f[0], setDisplayedFilters = _f[1];
    var _g = useSafeSetState(filter), filterValues = _g[0], setFilterValues = _g[1];
    var hideFilter = useCallback(function (filterName) {
        setDisplayedFilters(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
        setFilterValues(function (previousState) {
            var _a = previousState, _b = filterName, _ = _a[_b], newState = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return newState;
        });
    }, [setDisplayedFilters, setFilterValues]);
    var showFilter = useCallback(function (filterName, defaultValue) {
        setDisplayedFilters(function (previousState) {
            var _a;
            return (__assign(__assign({}, previousState), (_a = {}, _a[filterName] = true, _a)));
        });
        setFilterValues(function (previousState) {
            var _a;
            return (__assign(__assign({}, previousState), (_a = {}, _a[filterName] = defaultValue, _a)));
        });
    }, [setDisplayedFilters, setFilterValues]);
    var setFilters = useCallback(function (filters, displayedFilters) {
        setFilterValues(removeEmpty(filters));
        setDisplayedFilters(displayedFilters);
        setPage(1);
    }, [setDisplayedFilters, setFilterValues, setPage]);
    // handle filter prop change
    useEffect(function () {
        if (!isEqual(filter, filterRef.current)) {
            filterRef.current = filter;
            setFilterValues(filter);
        }
    });
    var _h = useGetManyReference(reference, {
        target: target,
        id: get(record, source),
        pagination: { page: page, perPage: perPage },
        sort: sort,
        filter: filterValues,
    }, {
        keepPreviousData: true,
        onError: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', {
                type: 'error',
                messageArgs: {
                    _: typeof error === 'string'
                        ? error
                        : error && error.message
                            ? error.message
                            : undefined,
                },
            });
        },
    }), data = _h.data, total = _h.total, pageInfo = _h.pageInfo, error = _h.error, isFetching = _h.isFetching, isLoading = _h.isLoading, refetch = _h.refetch;
    return {
        sort: sort,
        data: data,
        defaultTitle: null,
        displayedFilters: displayedFilters,
        error: error,
        filterValues: filterValues,
        hideFilter: hideFilter,
        isFetching: isFetching,
        isLoading: isLoading,
        onSelect: selectionModifiers.select,
        onToggleItem: selectionModifiers.toggle,
        onUnselectItems: selectionModifiers.clearSelection,
        page: page,
        perPage: perPage,
        refetch: refetch,
        resource: reference,
        selectedIds: selectedIds,
        setFilters: setFilters,
        setPage: setPage,
        setPerPage: setPerPage,
        hasNextPage: pageInfo
            ? pageInfo.hasNextPage
            : total != null
                ? page * perPage < total
                : undefined,
        hasPreviousPage: pageInfo ? pageInfo.hasPreviousPage : page > 1,
        setSort: setSort,
        showFilter: showFilter,
        total: total,
    };
};
//# sourceMappingURL=useReferenceManyFieldController.js.map