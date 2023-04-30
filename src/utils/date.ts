const format = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });

export const dateString = (date: Date) => {
  return format.format(date);
};
