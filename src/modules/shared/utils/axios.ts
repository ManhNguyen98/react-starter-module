import axios, { AxiosRequestConfig } from 'axios'
import { getTokenFromStorage } from './auth'

const createService = (
  config?: AxiosRequestConfig,
  skipInterceptorResponse = false,
) => {
  const instance = axios.create(config)

  instance.interceptors.request.use((requestConfig) => {
    const token = getTokenFromStorage()
    const { headers = {} } = requestConfig
    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }
    return { ...requestConfig, headers }
  })

  if (!skipInterceptorResponse) {
    instance.interceptors.response.use(
      (response) => response, // wrap response, error
      (error) => error,
    )
  }
  return instance
}

const axiosService = createService()
export default axiosService
