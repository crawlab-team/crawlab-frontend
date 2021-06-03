export const getPriorityLabel = (priority: number): string => {
  if (priority <= 2) {
    return `High - ${priority}`;
  } else if (priority <= 4) {
    return `Higher - ${priority}`;
  } else if (priority <= 6) {
    return `Medium - ${priority}`;
  } else if (priority <= 8) {
    return `Lower - ${priority}`;
  } else {
    return `Low - ${priority}`;
  }
};
