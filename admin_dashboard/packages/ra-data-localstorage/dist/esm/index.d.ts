import { DataProvider } from 'ra-core';
/**
 * Respond to react-admin data queries using a local database persisted in localStorage
 *
 * Useful for local-first web apps. The storage is shared between tabs.
 *
 * @example // initialize with no data
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider();
 *
 * @example // initialize with default data (will be ignored if data has been modified by user)
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider({
 *   defaultData: {
 *     posts: [
 *       { id: 0, title: 'Hello, world!' },
 *       { id: 1, title: 'FooBar' },
 *     ],
 *     comments: [
 *       { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *       { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *     ],
 *   }
 * });
 */
declare const _default: (params?: LocalStorageDataProviderParams) => DataProvider;
export default _default;
export interface LocalStorageDataProviderParams {
    defaultData?: any;
    localStorageKey?: string;
    loggingEnabled?: boolean;
    localStorageUpdateDelay?: number;
}
//# sourceMappingURL=index.d.ts.map