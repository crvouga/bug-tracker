export type IMessage<TType extends string, TPayload> = {
  type: TType;
  payload: TPayload;
};

export type IPubSub<TType extends string, TPayload> = {
  subscribe: (
    type: TType,
    callback: (message: IMessage<TType, TPayload>) => void
  ) => string;
  unsubscribe: (token: string) => void;
  publish: (message: IMessage<TType, TPayload>) => void;
};

export const PubSub = <TType extends string, TPayload>(): IPubSub<
  TType,
  TPayload
> => {
  return {
    subscribe(type, callback) {
      console.log(type, callback);
      return "";
    },

    unsubscribe(token) {
      console.log(token);
    },

    publish(message) {
      console.log(message);
    },
  };
};
