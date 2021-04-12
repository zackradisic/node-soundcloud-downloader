export type DownloadType = 'stream' | 'arraybuffer'
export type DownloadOptions<ResponseType extends DownloadType> = {
  responseType?: ResponseType
  useDirectLink?: boolean
}
