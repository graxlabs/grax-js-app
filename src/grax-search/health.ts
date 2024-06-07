import { opts } from "./config";
import { backupsHealthGet } from "grax_api";

export const health = async () => {
  return backupsHealthGet(undefined, opts);
};
