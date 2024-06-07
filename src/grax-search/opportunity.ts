import type { SearchFilters } from "grax_api";

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
