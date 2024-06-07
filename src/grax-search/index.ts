import { backupsHealthGet } from "grax_api"
import axios, {type AxiosRequestConfig} from "axios";


const opts: AxiosRequestConfig = {
  baseURL: import.meta.env.GRAX_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.GRAX_TOKEN}`
  }
}

export const health = async () => {
  return backupsHealthGet(undefined, opts);
}