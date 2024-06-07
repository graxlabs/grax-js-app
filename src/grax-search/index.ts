import { backupsHealthGet, searchCreate, searchGet, searchRecords, type SearchRecord } from "grax_api"
import axios, {type AxiosRequestConfig} from "axios";


const opts: AxiosRequestConfig = {
  baseURL: import.meta.env.GRAX_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.GRAX_TOKEN}`,
    "User-Agent": "grax-js-app/1.0.0",
  }
}

export const health = async () => {
  return backupsHealthGet(undefined, opts);
}

export const search = async (object: string) => {
  const res = await searchCreate({
    object,
    timeField: 'rangeLatestModifiedAt',
    timeFieldMax: "2024-02-01T00:00:00.000Z",
    timeFieldMin: "2024-01-01T00:00:00.000Z",
  }, opts)

  const id = res.data.id!
  if (res.status != 200 || !id) {
    throw new Error('Failed to create search')
  }

  for (;;true) {
    await new Promise(f => setTimeout(f, 1000));
    const res = await searchGet(id, opts)
    if (res.data.status == 'success') {
      break
    }
  }

  let pageToken = "";
  let records: SearchRecord[] = []
  
  for (;;true) {
    const res = await searchRecords(id, {
      fields: "all",
      pageToken,
    }, opts)
    
    records.push(...res.data.records!)

    if (!res.data.nextPageToken) {
      break
    }

    res.data.records
    pageToken = res.data.nextPageToken;
  }

  return records;
}