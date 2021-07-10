import qs from 'qs';
export declare const getQueryParams: () => qs.ParsedQs;
export declare const getQueryParam: (key: string) => string | string[] | qs.ParsedQs | qs.ParsedQs[];
