import { expect, test } from "vitest";
import { prevMonths } from "../src/grax-search/date";

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
