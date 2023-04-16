import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { UseQueryOptions } from 'react-query';
import { LinkToType, SortPayload, RaRecord } from 'ra-core';
import { PublicFieldProps, InjectedFieldProps } from './types';
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
export declare const ReferenceOneField: {
    <RecordType extends RaRecord = any>(props: ReferenceOneFieldProps<RecordType>): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<NonNullable<string | boolean | PropTypes.ReactElementLike>>;
        record: PropTypes.Requireable<any>;
        reference: PropTypes.Validator<string>;
        source: PropTypes.Validator<string>;
        target: PropTypes.Validator<string>;
        queryOptions: PropTypes.Requireable<any>;
    };
    defaultProps: {
        source: string;
        sortable: boolean;
    };
};
export interface ReferenceOneFieldProps<RecordType extends RaRecord = any> extends PublicFieldProps, InjectedFieldProps {
    children?: ReactNode;
    reference: string;
    target: string;
    sort?: SortPayload;
    filter?: any;
    link?: LinkToType;
    queryOptions?: UseQueryOptions<{
        data: RecordType[];
        total: number;
    }> & {
        meta?: any;
    };
}
//# sourceMappingURL=ReferenceOneField.d.ts.map