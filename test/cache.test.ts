import type { SearchCreate } from "grax_api";
import { expect, test } from "vitest";
import { FilterOpen } from "../src/grax-search/opportunity";
import { del, get, has, hash, set } from "../src/grax-search/cache";

test("set", async () => {
  let ok = await has("key");
  expect(ok).eq(false);

  await set("key", { foo: "bar" });

  ok = await has("key");
  expect(ok).eq(true);

  let val = await get("key");
  expect(val).toEqual({ foo: "bar" });

  await del("key");

  ok = await has("key");
  expect(ok).eq(false);
});

test("search create hash", () => {
  let create: SearchCreate = {
    object: "Opportunity",
    timeField: "rangeLatestModifiedAt",
    timeFieldMax: "2024-02-01T00:00:00.000Z",
    timeFieldMin: "2024-01-01T00:00:00.000Z",
    filters: FilterOpen,
  };

  expect(hash(create)).eq("ab42f581cdda466b");
  create.timeFieldMin = undefined;
  expect(hash(create)).eq("530306b38f9f89d8");
});
