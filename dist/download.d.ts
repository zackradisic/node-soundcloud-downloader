/** @internal @packageDocumentation */
import { Readable } from 'stream';
import { AxiosInstance } from 'axios';
import m3u8stream from 'm3u8stream';
import { Transcoding } from './info';
import { DownloadOptions } from './types';
export declare const getMediaURL: (url: string, clientID: string, axiosInstance: AxiosInstance) => Promise<string>;
export declare const getProgressive: (mediaUrl: string, axiosInstance: AxiosInstance) => Promise<any>;
export declare const getHLSStream: (mediaUrl: string) => m3u8stream.Stream;
export declare const fromURL: (url: string, clientID: string, axiosInstance: AxiosInstance) => Promise<any | m3u8stream.Stream>;
export declare const fromMediaObj: (media: Transcoding, clientID: string, axiosInstance: AxiosInstance) => Promise<any>;
export declare const fromDownloadLink: (id: number, clientID: string, axiosInstance: AxiosInstance) => Promise<Readable>;
/** @internal */
export declare const download: (url: string, options: DownloadOptions, clientID: string, axiosInstance: AxiosInstance) => Promise<Readable>;
