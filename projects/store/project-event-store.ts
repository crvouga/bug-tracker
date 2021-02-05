import { IProjectEvent } from "../events";
import { IProjectEventStore } from "./contracts";

export const ProjectEventStoreInMemory = (): IProjectEventStore & {
  eventsById: { [key: string]: IProjectEvent[] };
} => {
  const eventsById: { [key: string]: IProjectEvent[] } = {};
  const callbacks: ((event: IProjectEvent) => void)[] = [];

  return {
    eventsById,
    async reduce<S>(
      reducer: (state: S, event: IProjectEvent) => S,
      initialState: S,
      aggergateId: string
    ) {
      return eventsById[aggergateId].reduce(reducer, initialState);
    },
    async subscribe(callback) {
      callbacks.push(callback);
    },
    async publish(event) {
      eventsById[event.aggergateId] = eventsById[event.aggergateId]
        ? [...eventsById[event.aggergateId], event]
        : [event];

      for (const callback of callbacks) {
        callback(event);
      }
    },
  };
};
