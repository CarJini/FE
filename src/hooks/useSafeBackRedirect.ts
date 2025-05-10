import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { BackHandler } from "react-native";
import { router } from "expo-router";

export function useSafeBackRedirect(redirectUrl: string) {
  const navigation = useNavigation();
  const triggered = useRef(false);

  const onBackPress = () => {
    if (triggered.current) return true;
    triggered.current = true;

    setTimeout(() => {
      router.replace(redirectUrl as any);
    }, 0);

    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        onBackPress();
      });

      return () => {
        subscription.remove();
        unsubscribe();
      };
    }, [])
  );
}
