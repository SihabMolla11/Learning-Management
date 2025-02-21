import axios from "axios";

import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

apiClient.interceptors.request.use(
  async (config: any) => {
    const session: any = await getSession();
    if (session && session?.user && session?.user?.token) {
      const access_token = session?.user?.token;

      if (config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers["ngrok-skip-browser-warning"] = "true";
      } else {
        config.headers = {
          Authorization: `Bearer ${access_token}`,
          "ngrok-skip-browser-warning": "true",
        };
      }
    }

    if (config.headers) {
      config.headers["ngrok-skip-browser-warning"] = "true";
    } else {
      config.headers = {
        "ngrok-skip-browser-warning": "true",
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.post(endpoint, data);
    const code = response.status;
    const resp_data = response.data;
    if (code === 409) {
      return Promise.reject(resp_data);
    }
    return resp_data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const patch = async (endpoint: string, data: any) => {
  return await apiClient.patch(endpoint, data);
};

export const deleteApi = async (endpoint: string) => {
  return await apiClient.delete(endpoint);
};
