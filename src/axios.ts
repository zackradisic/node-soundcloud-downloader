/** @internal @packageDocumentation */

import axios, { AxiosInstance } from 'axios'

interface AxiosManager {
    instance: AxiosInstance
}

export const axiosManager: AxiosManager = {
  instance: axios
}
