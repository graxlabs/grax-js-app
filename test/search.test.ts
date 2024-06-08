import { expect, test } from "vitest";
import { health } from "../src/grax-search/health";
import { FilterOpen, Year } from "../src/grax-search/opportunity";
import { search, searchCache } from "../src/grax-search/search";

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

test.skip("live oppt year", async () => {
  const res = await Year(2024, 1);
  expect(res.length).eq(12);
});

test("cache search", async () => {
  let records = await searchCache("Opportunity", "rangeLatestModifiedAt", "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z", FilterOpen);
  expect(records.length).eq(17);

  records = await searchCache("Opportunity", "rangeLatestModifiedAt", "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z", FilterOpen);
  expect(records.length).eq(17);
});
