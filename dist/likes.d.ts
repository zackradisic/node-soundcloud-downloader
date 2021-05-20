import { AxiosInstance } from 'axios';
import { TrackInfo } from './info';
import { PaginatedQuery } from './util';
export interface Like {
    created_at: string;
    kind: string;
    track: TrackInfo;
}
export interface GetLikesOptions {
    profileUrl?: string;
    id?: number;
    limit?: number;
    offset?: number;
    nextHref?: string;
}
/** @internal */
export declare const getLikes: (options: GetLikesOptions, clientID: string, axiosInstance: AxiosInstance) => Promise<PaginatedQuery<Like>>;
