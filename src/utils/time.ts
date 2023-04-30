const num = (x: number): string => {
  switch (x) {
    case 0:
      return 'zero';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    case 10:
      return 'ten';
    case 11:
      return 'eleven';
    case 12:
      return 'twelve';
    case 13:
      return 'thirteen';
    case 14:
      return 'fourteen';
    case 15:
      return 'fifteen';
    case 16:
      return 'sixteen';
    case 17:
      return 'seventeen';
    case 18:
      return 'eighteen';
    case 19:
      return 'nineteen';
    case 20:
      return 'twenty';
    default: {
      if (x >= 20 && x < 30) {
        return 'twenty-' + num(x - 20);
      } else if (x >= 30 && x < 40) {
        return 'thirty-' + num(x - 30);
      } else if (x >= 40 && x < 50) {
        return 'fourty-' + num(x - 40);
      } else if (x >= 50 && x < 60) {
        return 'fifty-' + num(x - 50);
      }

      return 'something';
    }
  }
};

export const timeString = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let ampm = hours > 11 ? 'PM' : 'AM';
  let hourStr = num(hours % 12);
  let minuteStr = num(minutes);
  let isPast = false;

  if (hours === 0) {
    isPast = true;
    hourStr = 'midnight';
    ampm = '';
  } else if (hours === 12) {
    isPast = true;
    hourStr = 'noon';
    ampm = '';
  }

  if (minutes < 15) {
    isPast = true;
  } else if (minutes === 15) {
    isPast = true;
    minuteStr = 'quarter';
  } else if (minutes === 30) {
    isPast = true;
    minuteStr = 'half';
  }

  if (minutes === 0) {
    return ['it’s', hourStr, ampm].filter(Boolean).join(' ');
  } else {
    return isPast
      ? [minuteStr, 'past', hourStr, ampm].filter(Boolean).join(' ')
      : [hourStr, minuteStr, ampm].filter(Boolean).join(' ');
  }
};
