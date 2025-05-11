import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export function useSafeBackRedirect(onRedirect: () => void) {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          onRedirect();
          return true;
        }
      );
      return () => backHandler.remove();
    }, [])
  );
}
