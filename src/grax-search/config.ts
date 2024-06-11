import { type AxiosRequestConfig } from "axios";

export const opts: AxiosRequestConfig = {
  baseURL: process.env.GRAX_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.GRAX_API_TOKEN}`,
    "User-Agent": "grax-js-app/1.0.0",
  },
};

declare global {
  interface Window {
    data: Plotly.Data[];
    root: string;
  }
}
