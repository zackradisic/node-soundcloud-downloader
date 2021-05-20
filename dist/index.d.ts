/// <reference types="node" />
import { Readable } from 'stream';
import { AxiosInstance } from 'axios';
import { FilterPredicateObject } from './filter-media';
import FORMATS from './formats';
import { Transcoding, User } from './info';
import { GetLikesOptions, Like } from './likes';
import STREAMING_PROTOCOLS from './protocols';
import { SearchOptions } from './search';
import { DownloadOptions } from './types';
import { PaginatedQuery } from './util';
export interface SCDLOptions {
    clientID?: string;
    saveClientID?: boolean;
    filePath?: string;
    axiosInstance?: AxiosInstance;
    stripMobilePrefix?: boolean;
    convertFirebaseLinks?: boolean;
}
export declare class SCDL {
    STREAMING_PROTOCOLS: {
        [key: string]: STREAMING_PROTOCOLS;
    };
    FORMATS: {
        [key: string]: FORMATS;
    };
    private _clientID;
    private _filePath?;
    axios: AxiosInstance;
    saveClientID: boolean;
    stripMobilePrefix: boolean;
    convertFirebaseLinks: boolean;
    constructor(options?: SCDLOptions);
    /**
     * Returns a media Transcoding that matches the given predicate object
     * @param media - The Transcodings to filter
     * @param predicateObj - The desired Transcoding object to match
     * @returns An array of Transcodings that match the predicate object
     */
    filterMedia(media: Transcoding[], predicateObj: FilterPredicateObject): Transcoding[];
    /**
     * Get the audio of a given track. It returns the first format found.
     *
     * @param url - The URL of the Soundcloud track
     * @param useDirectLink - Whether or not to use the download link if the artist has set the track to be downloadable. This has erratic behaviour on some environments.
     * @returns A ReadableStream containing the audio data
     */
    download(url: string, options?: DownloadOptions): Promise<Readable>;
    /**
     *  Get the audio of a given track with the specified format
     * @param url - The URL of the Soundcloud track
     * @param format - The desired format
     */
    downloadFormat(url: string, format: FORMATS): Promise<Readable>;
    /**
     * Returns info about a given track.
     * @param url - URL of the Soundcloud track
     * @returns Info about the track
     */
    getInfo(url: string): Promise<import("./info").TrackInfo>;
    /**
     * Returns info about the given track(s) specified by ID.
     * @param ids - The ID(s) of the tracks
     * @returns Info about the track
     */
    getTrackInfoByID(ids: number[], playlistID?: number, playlistSecretToken?: string): Promise<import("./info").TrackInfo[]>;
    /**
     * Returns info about the given set
     * @param url - URL of the Soundcloud set
     * @returns Info about the set
     */
    getSetInfo(url: string): Promise<import("./info").SetInfo>;
    /**
     * Searches for tracks/playlists for the given query
     * @param options - The search option
     * @returns SearchResponse
     */
    search(options: SearchOptions): Promise<import("./search").SearchResponseAll>;
    /**
     * Finds related tracks to the given track specified by ID
     * @param id - The ID of the track
     * @param limit - The number of results to return
     * @param offset - Used for pagination, set to 0 if you will not use this feature.
     */
    related(id: number, limit: number, offset?: number): Promise<import("./search").RelatedResponse<import("./info").TrackInfo>>;
    /**
     * Returns the audio streams and titles of the tracks in the given playlist.
     * @param url - The url of the playlist
     */
    downloadPlaylist(url: string): Promise<[Readable[], string[]]>;
    /**
     * Returns track information for a user's likes
     * @param options - Can either be the profile URL of the user, or their ID
     * @returns - An array of tracks
     */
    getLikes(options: GetLikesOptions): Promise<PaginatedQuery<Like>>;
    /**
     * Returns information about a user
     * @param url - The profile URL of the user
     */
    getUser(url: string): Promise<User>;
    /**
     * Sets the instance of Axios to use to make requests to SoundCloud API
     * @param instance - An instance of Axios
     */
    setAxiosInstance(instance: AxiosInstance): void;
    /**
     * Returns whether or not the given URL is a valid Soundcloud URL
     * @param url - URL of the Soundcloud track
     */
    isValidUrl(url: string): boolean;
    /**
     * Returns whether or not the given URL is a valid playlist SoundCloud URL
     * @param url - The URL to check
     */
    isPlaylistURL(url: string): boolean;
    /**
     * Returns true if the given URL is a personalized track URL. (of the form https://soundcloud.com/discover/sets/personalized-tracks::user-sdlkfjsldfljs:847104873)
     * @param url - The URL to check
     */
    isPersonalizedTrackURL(url: string): boolean;
    /**
     * Returns true if the given URL is a Firebase URL (of the form https://soundcloud.app.goo.gl/XXXXXXXX)
     * @param url - The URL to check
     */
    isFirebaseURL(url: string): boolean;
    getClientID(): Promise<string>;
    /** @internal */
    setClientID(clientID?: string): Promise<string>;
    /** @internal */
    private _getClientIDFromFile;
    /**
     * Prepares the given URL by stripping its mobile prefix (if this.stripMobilePrefix is true)
     * and converting it to a regular URL (if this.convertFireBaseLinks is true.)
     * @param url
     */
    prepareURL(url: string): Promise<string>;
}
declare const scdl: SCDL;
declare const create: (options: SCDLOptions) => SCDL;
export { create };
export default scdl;
