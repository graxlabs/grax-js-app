import { assert, expect, test } from "vitest";
import { search } from "../src/grax-search/search";
import { prevMonths } from "../src/grax-search/date";
import { FilterOpen, Year } from "../src/grax-search/opportunity";
import { health } from "../src/grax-search/health";

test("api token", () => {
  expect(import.meta.env.GRAX_URL).toContain("secure.grax.io");
  expect(import.meta.env.GRAX_TOKEN).toContain("grax_token_");
});

test("health", async () => {
  const res = await health();
  expect(res.data.status).eq("ok");
});

test.skip("live search", async () => {
  let records = await search("Opportunity", "rangeLatestModifiedAt", "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z", FilterOpen);
  expect(records.length).eq(17);

  records = await search("Opportunity", "rangeLatestModifiedAt", undefined, "2024-02-01T00:00:00.000Z", FilterOpen);
  expect(records.length).eq(92);
});

test.skip("live search 2", async () => {
  const res = await Promise.all([
    search("Opportunity", "rangeLatestModifiedAt", "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z", FilterOpen),
    search("Opportunity", "rangeLatestModifiedAt", undefined, "2024-02-01T00:00:00.000Z", FilterOpen),
  ]);

  expect(res[0].length).eq(17);
  expect(res[1].length).eq(92);
});

test("live oppt year", async () => {
  const res = await Year(2024, 1);
  expect(res.length).eq(12);
});

test("dates", async () => {
  const months = prevMonths(2024, 1);
  expect(months).toEqual([
    new Date("2024-01-01T00:00:00.000Z"),
    new Date("2023-12-01T00:00:00.000Z"),
    new Date("2023-11-01T00:00:00.000Z"),
    new Date("2023-10-01T00:00:00.000Z"),
    new Date("2023-09-01T00:00:00.000Z"),
    new Date("2023-08-01T00:00:00.000Z"),
    new Date("2023-07-01T00:00:00.000Z"),
    new Date("2023-06-01T00:00:00.000Z"),
    new Date("2023-05-01T00:00:00.000Z"),
    new Date("2023-04-01T00:00:00.000Z"),
    new Date("2023-03-01T00:00:00.000Z"),
    new Date("2023-02-01T00:00:00.000Z"),
  ]);
});
