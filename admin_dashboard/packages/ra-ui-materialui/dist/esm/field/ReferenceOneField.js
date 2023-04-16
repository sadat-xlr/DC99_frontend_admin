import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useReferenceOneFieldController, useRecordContext, ResourceContextProvider, useCreatePath, useTranslate, } from 'ra-core';
import { fieldPropTypes } from './types';
import { ReferenceFieldView } from './ReferenceField';
/**
 * Render the related record in a one-to-one relationship
 *
 * Expects a single field as child
 *
 * @example // display the bio of the current author
 * <ReferenceOneField reference="bios" target="author_id">
 *     <TextField source="body" />
 * </ReferenceOneField>
 */
export var ReferenceOneField = function (props) {
    var children = props.children, reference = props.reference, source = props.source, target = props.target, emptyText = props.emptyText, sort = props.sort, filter = props.filter, _a = props.link, link = _a === void 0 ? false : _a, queryOptions = props.queryOptions;
    var record = useRecordContext(props);
    var createPath = useCreatePath();
    var translate = useTranslate();
    var _b = useReferenceOneFieldController({
        record: record,
        reference: reference,
        source: source,
        target: target,
        sort: sort,
        filter: filter,
        queryOptions: queryOptions,
    }), isLoading = _b.isLoading, isFetching = _b.isFetching, referenceRecord = _b.referenceRecord, error = _b.error, refetch = _b.refetch;
    var resourceLinkPath = link === false
        ? false
        : createPath({
            resource: reference,
            id: referenceRecord === null || referenceRecord === void 0 ? void 0 : referenceRecord.id,
            type: typeof link === 'function'
                ? link(record, reference)
                : link,
        });
    return !record || (!isLoading && referenceRecord == null) ? (emptyText ? (React.createElement(Typography, { component: "span", variant: "body2" }, emptyText && translate(emptyText, { _: emptyText }))) : null) : (React.createElement(ResourceContextProvider, { value: reference },
        React.createElement(ReferenceFieldView, { isLoading: isLoading, isFetching: isFetching, referenceRecord: referenceRecord, resourceLinkPath: resourceLinkPath, reference: reference, refetch: refetch, error: error }, children)));
};
ReferenceOneField.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    label: fieldPropTypes.label,
    record: PropTypes.any,
    reference: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    queryOptions: PropTypes.any,
};
ReferenceOneField.defaultProps = {
    source: 'id',
    // disable sorting on this field by default as its default source prop ('id')
    // will match the default sort ({ field: 'id', order: 'DESC'})
    // leading to an incorrect sort indicator in a datagrid header
    sortable: false,
};
//# sourceMappingURL=ReferenceOneField.js.map