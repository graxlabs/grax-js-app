import type { SearchRecord } from "grax_api";

export const Bar = async (
  searches: Promise<SearchRecord[][]>,
  xs: (datas: SearchRecord[][]) => string[],
  ys: (datas: SearchRecord[][]) => number[],
): Promise<Plotly.Data[]> => {
  const datas = await searches;
  return [
    {
      x: xs(datas),
      y: ys(datas),
      type: "bar",
    },
  ];
};
