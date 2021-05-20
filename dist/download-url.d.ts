/** @internal @packageDocumentation */
import { AxiosInstance } from 'axios';
import m3u8stream from 'm3u8stream';
declare const fromURL: (url: string, clientID: string, axiosInstance: AxiosInstance) => Promise<any | m3u8stream.Stream>;
export default fromURL;
