import type { SearchFilters } from "grax_api";
import { prevMonths } from "./date";
import { searchCache } from "./search";

export const FilterOpen: SearchFilters = {
  fields: [
    {
      field: "StageName",
      filterType: "eq",
      not: true,
      value: "Closed Lost",
    },
    {
      field: "StageName",
      filterType: "eq",
      not: true,
      value: "Closed Won",
    },
  ],
  mode: "and",
};

export const Year = async (endYear: number, endMonth: number) => {
  const months = prevMonths(endYear, endMonth);
  return Promise.all(months.map((month) => searchCache("Opportunity", "rangeLatestModifiedAt", undefined, month.toISOString(), FilterOpen)));
};
