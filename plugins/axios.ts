import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseCode } from "~/constant";

export default defineNuxtPlugin(() => {
  const config:any = useRuntimeConfig();
  const axiosInstance = Axios.create({
    timeout: 3 * 60 * 1000,
    baseURL: config.public.apiBase,
  });

  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token  = useCookie("token");
      if (config) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token.value}`,
          },
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      if (error.response?.status === ResponseCode.UNAUTHORIZED) {
        (useNuxtApp().$router as any).push("/login");
      } else if (error.response?.status === ResponseCode.SERVER_ERROR) {
        return Promise.reject(error.response);
      }
      return Promise.reject(error.response);
    }
  );
  return {
    provide: {
      api: {
        get<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType> {
          return axiosInstance.get(url, { params });
        },
        post<ReqType, ResType>(
          url: string,
          data?: ReqType,
          config?: AxiosRequestConfig<ReqType>
        ): Promise<ResType> {
          return axiosInstance.post(url, data, config);
        },
        put<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
          return axiosInstance.put(url, data);
        },
        patch<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
          return axiosInstance.put(url, data);
        },
        delete<ReqType, ResType>(
          url: string,
          data?: ReqType
        ): Promise<ResType> {
          return axiosInstance.delete(url, { data });
        },
      },
    },
  };
});
