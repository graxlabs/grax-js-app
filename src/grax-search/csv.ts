import { stringify } from "csv-stringify/sync";
import type { SearchRecord } from "grax_api";

export const searches = (datas: SearchRecord[][]) => {
  const names = datas[0][0].fields!.map((field) => field.name!);
  const values = datas.map((data) => data.map((record) => record.fields!.map((field) => field.value))).flat(1);
  return stringify([names, ...values]);
};
