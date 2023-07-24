import type { UseFetchOptions } from "#app";
import type { NitroFetchRequest } from "nitropack";
import type { KeysOf } from "nuxt/dist/app/composables/asyncData";

type FetchOptions<T> = UseFetchOptions<
  T extends void ? unknown : T,
  (res: T extends void ? unknown : T) => T extends void ? unknown : T,
  KeysOf<(res: T extends void ? unknown : T) => T extends void ? unknown : T>
>;

export const useApi = <T>(
  request: NitroFetchRequest,
  opts?: FetchOptions<T>
) => {
  const token = useCookie<string>("token");
  const options: FetchOptions<T> = {
    baseURL: "/api",
    headers: {
      ...opts?.headers,
      ...(token.value && { Authorization: `Bearer ${token.value}` }),
    },
    onResponseError: ({ response }) => {
      if (response.status === 401) {
        // login
      }
    },
    ...opts,
  };
  return useFetch(request, options);
};

export const get = <T>(
  request: NitroFetchRequest,
  params?: any,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "get",
    params,
    ...opts,
  };
  return useApi(request, options);
};

export const post = <T>(
  request: NitroFetchRequest,
  body?: any,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "post",
    body,
    ...opts,
  };
  return useApi(request, options);
};

export const download = async <T>(
  request: NitroFetchRequest,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "get",
    responseType: "blob",
    ...opts,
  };
  return useApi(request, options);
};

export const put = async <T>(
  request: NitroFetchRequest,
  body?: any,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "put",
    body,
    ...opts,
  };
  return useApi(request, options);
};

export const patch = async <T>(
  request: NitroFetchRequest,
  body?: any,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "patch",
    body,
    headers: {
      ...opts?.headers,
      "Content-Type": "application/merge-patch+json",
    },
    ...opts,
  };
  return await useApi(request, options);
};

export const remove = async <T>(
  request: NitroFetchRequest,
  opts?: FetchOptions<T>
) => {
  const options: FetchOptions<T> = {
    method: "delete",
    ...opts,
  };
  return await useApi(request, options);
};
