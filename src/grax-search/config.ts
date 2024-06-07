import { type AxiosRequestConfig } from "axios";

export const opts: AxiosRequestConfig = {
  baseURL: import.meta.env.GRAX_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.GRAX_TOKEN}`,
    "User-Agent": "grax-js-app/1.0.0",
  },
};

declare global {
  interface Window {
    data: any;
  }
}
