export type ITimestamp = Date & { type: "Timestamap" };

export const Timestamp = (timestamp?: string | number | Date) => {
  if (typeof timestamp === "string" || typeof timestamp === "number") {
    return new Date(timestamp) as ITimestamp;
  }

  if (timestamp) {
    return timestamp as ITimestamp;
  }

  return new Date() as ITimestamp;
};

export const timestampToDate = (timestamp: ITimestamp) => {
  return new Date(timestamp);
};

export const isBefore = (a: ITimestamp, b: ITimestamp) => {
  return new Date(a) < new Date(b);
};
