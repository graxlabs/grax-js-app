import type { SearchRecord } from "grax_api";
import { expect, test } from "vitest";
import { searches } from "../src/grax-search/csv";

test("searches", async () => {
  const datas: SearchRecord[][] = [[{ fields: [{ name: "name", value: "v1" }] }], [{ fields: [{ name: "name", value: "v2" }] }]];
  expect(searches(datas)).toEqual("name\nv1\nv2\n");
});
