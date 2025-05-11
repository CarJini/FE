import { ReactElement, ReactNode } from "react";
import { ScrollView, View, ViewStyle, RefreshControlProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Header } from "./Header";

interface Props {
  headerTitle: string;
  LeftHeader?: ReactNode;
  RightHeader?: ReactNode;
  children: ReactNode;
  containerStyle?: ViewStyle;
  scroll?: boolean;
  refreshControl?: ReactElement<RefreshControlProps>; // 🔥 수정됨
}

export function ScreenLayout({
  headerTitle,
  LeftHeader,
  RightHeader,
  children,
  containerStyle,
  scroll = true,
  refreshControl,
}: Props) {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header title={headerTitle} Left={LeftHeader} Right={RightHeader} />
      {!scroll ? (
        <View className="p-4 flex-1" style={{ ...containerStyle }}>
          {children}
        </View>
      ) : (
        <ScrollView
          className="flex-1 p-4"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            ...containerStyle,
          }}
          showsVerticalScrollIndicator
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
