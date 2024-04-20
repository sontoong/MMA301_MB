export const formatCurrency = (amount: number) => {
  const realAmount = amount * 1000;
  return realAmount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatUnixToLocal = (
  unixTimestamp: number,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  },
  locale: string = 'vi-VN',
) => {
  const milliseconds = unixTimestamp;
  const date = new Date(milliseconds);
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'vi-VN',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatToTimeDifference = (
  timeDifference: number,
  locale: string = 'vi-VN',
) => {
  const options: Intl.RelativeTimeFormatOptions = {
    numeric: 'auto',
  };
  const formatter = new Intl.RelativeTimeFormat(locale, options);

  console.log(timeDifference);

  if (timeDifference < 60000) {
    return formatter.format(-Math.floor(timeDifference / 1000), 'second');
  } else if (timeDifference < 3600) {
    return formatter.format(-Math.floor(timeDifference / 60000), 'minute');
  } else if (timeDifference < 86400) {
    return formatter.format(-Math.floor(timeDifference / 3600000), 'hour');
  } else {
    return formatter.format(-Math.floor(timeDifference / 86400000), 'day');
  }
};

export const calculateDateToNow = (
  time: string | number,
  locale: string = 'vi-VN',
) => {
  if (typeof time === 'string') {
    time = Date.parse(time);
  }
  //exclude the milisecond from Date
  const today = Math.floor(Date.now());

  const timeDifference = today - time;
  return formatToTimeDifference(timeDifference, locale);
};
