import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export const useRefreshOnFocus = (callback: () => Promise<void> | void) => {
  useFocusEffect(
    React.useCallback(() => {
      callback();
    }, [callback])
  );
};