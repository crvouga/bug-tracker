import { useCallback, useState } from "react";

export const useBoolean = (initialState: boolean) => {
  const [value, setValue] = useState(initialState);

  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue((value) => !value);
  }, [setValue]);

  return {
    value,
    setTrue,
    setFalse,
    toggle,
  };
};
