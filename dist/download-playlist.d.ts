import { Readable } from 'stream';
import { AxiosInstance } from 'axios';
export declare const downloadPlaylist: (url: string, clientID: string, axiosInstance: AxiosInstance) => Promise<[Readable[], string[]]>;
