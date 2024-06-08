import { searchCreate, searchGet, searchRecords, type SearchCreate, type SearchFilters, type SearchRecord } from "grax_api";
import { del, get, has, hash, set } from "./cache";
import { opts } from "./config";

export const searchCache = async (
  object: string,
  timeField: string,
  timeFieldMin: string | undefined,
  timeFieldMax: string,
  filters: SearchFilters,
  invalidate?: boolean,
) => {
  const k = `${object}-${hash({ object, timeField, timeFieldMax, timeFieldMin, filters })}`;

  if (invalidate) {
    await del(k);
  }

  if (await has(k)) {
    return (await get(k)) as SearchRecord[];
  }

  const out = await search(object, timeField, timeFieldMin, timeFieldMax, filters);
  await set(k, out);

  return out;
};

export const search = async (object: string, timeField: string, timeFieldMin: string | undefined, timeFieldMax: string, filters: SearchFilters) => {
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
