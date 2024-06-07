export const prevMonths = (endYear: number, endMonth: number) => {
  let end = new Date(Date.UTC(endYear, endMonth, 1, 0, 0, 0));

  const dates: Date[] = [];
  for (let i = 0; i < 12; i++) {
    dates.push(new Date(Date.UTC(end.getFullYear(), end.getMonth(), 1, 0, 0, 0)));
    end.setMonth(end.getMonth() - 1);
    end.setDate(1);
  }

  return dates;
};
