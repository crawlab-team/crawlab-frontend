import axios, {AxiosRequestConfig} from 'axios';

const useRequest = () => {
  // implementation
  const baseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000';

  const request = async <T = any>(opts: AxiosRequestConfig): Promise<T> => {
    const baseURL = baseUrl;

    return await axios.request({
      ...opts,
      baseURL,
    });
  };

  const get = async <P = any, T = any>(url: string, params?: P, opts?: AxiosRequestConfig): Promise<T> => {
    opts = {
      ...opts,
      method: 'GET',
      url,
      params,
    };
    return await request<T>(opts);
  };

  const post = async <P = any, T = any, PM = any>(url: string, data?: P, params?: PM, opts?: AxiosRequestConfig): Promise<T> => {
    opts = {
      ...opts,
      method: 'POST',
      url,
      data,
      params,
    };
    return await request<T>(opts);
  };

  const put = async <P = any, T = any, PM = any>(url: string, data?: P, params?: PM, opts?: AxiosRequestConfig): Promise<T> => {
    opts = {
      ...opts,
      method: 'PUT',
      url,
      data,
      params,
    };
    return await request<T>(opts);
  };

  const del = async <P = any, T = any, PM = any>(url: string, data?: P, params?: PM, opts?: AxiosRequestConfig): Promise<T> => {
    opts = {
      ...opts,
      method: 'DELETE',
      url,
      data,
      params,
    };
    return await request<T>(opts);
  };

  return {
    // public variables and methods
    baseUrl,
    request,
    get,
    post,
    put,
    del,
  };
};

export default useRequest;
