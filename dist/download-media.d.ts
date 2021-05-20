/** @internal @packageDocumentation */
import { AxiosInstance } from 'axios';
import m3u8stream from 'm3u8stream';
import { Transcoding } from './info';
declare const fromMedia: (media: Transcoding, clientID: string, axiosInstance: AxiosInstance) => Promise<any | m3u8stream.Stream>;
export default fromMedia;
