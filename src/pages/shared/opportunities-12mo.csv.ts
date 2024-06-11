import type { APIRoute } from "astro";
import { searches } from "../../grax-search/csv";
import { Year } from "../../grax-search/opportunity";

export const GET: APIRoute = async ({ params, request }) => {
  const datas = await Year(2024, 6);

  return new Response(searches(datas), {
    status: 200,
    headers: {
      "Content-Type": "application/csv",
    },
  });
};
