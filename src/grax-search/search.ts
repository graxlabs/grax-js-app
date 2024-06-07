import { type AxiosRequestConfig } from "axios";
import {
  backupsHealthGet,
  searchCreate,
  searchGet,
  searchRecords,
  type SearchFilters,
  type SearchRecord,
} from "grax_api";

const opts: AxiosRequestConfig = {
  baseURL: import.meta.env.GRAX_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.GRAX_TOKEN}`,
    "User-Agent": "grax-js-app/1.0.0",
  },
};

export const search = async (
  object: string,
  timeField: string,
  timeFieldMin: string | undefined,
  timeFieldMax: string,
  filters: SearchFilters,
) => {
  const res = await searchCreate(
    {
      object,
      timeField,
      timeFieldMax,
      timeFieldMin,
      filters,
    },
    opts,
  );

  const id = res.data.id!;
  if (res.status != 200 || !id) {
    throw new Error("Failed to create search");
  }

  for (; ; true) {
    await new Promise((f) => setTimeout(f, 1000));
    const res = await searchGet(id, opts);
    if (res.data.status == "success") {
      break;
    }
  }

  let pageToken = "";
  let records: SearchRecord[] = [];

  for (; ; true) {
    const res = await searchRecords(
      id,
      {
        fields: "all",
        pageToken,
      },
      opts,
    );

    if (!res.data.records) {
      break;
    }

    records.push(...res.data.records);

    if (!res.data.nextPageToken) {
      break;
    }

    res.data.records;
    pageToken = res.data.nextPageToken;
  }

  return records;
};
