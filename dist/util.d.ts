import { AxiosError } from 'axios';
export interface PaginatedQuery<T> {
    collection: T[];
    total_results?: number;
    next_href: string;
    query_urn: string;
}
export declare const resolveURL = "https://api-v2.soundcloud.com/resolve";
export declare const handleRequestErrs: (err: AxiosError) => AxiosError<any>;
export declare const appendURL: (url: string, ...params: string[]) => string;
export declare const extractIDFromPersonalizedTrackURL: (url: string) => string;
export declare const kindMismatchError: (expected: string, received: string) => Error;
