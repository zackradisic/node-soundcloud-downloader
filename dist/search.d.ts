import { AxiosInstance } from 'axios';
import { SetInfo, TrackInfo, User } from './info';
import { PaginatedQuery } from './util';
export interface RelatedResponse<T> extends PaginatedQuery<T> {
    variant: string;
}
export interface SearchOptions {
    limit?: number;
    offset?: number;
    resourceType?: SoundcloudResource | 'all';
    query?: string;
    nextHref?: string;
}
export declare type SearchResponseAll = PaginatedQuery<User | SetInfo | TrackInfo>;
export declare type SoundcloudResource = 'tracks' | 'users' | 'albums' | 'playlists';
/** @internal */
export declare const search: (options: SearchOptions, axiosInstance: AxiosInstance, clientID: string) => Promise<SearchResponseAll>;
/** @internal */
export declare const related: <T extends TrackInfo>(id: number, limit: number | undefined, offset: number | undefined, axiosInstance: AxiosInstance, clientID: string) => Promise<RelatedResponse<T>>;
