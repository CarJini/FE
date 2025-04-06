import { ScrollView, SafeAreaView, Text } from "react-native";
import { Card } from "@/src/components";

export default function MaintenanceHistoryAddScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <Card>
          <Text>차량 정비 이력 추가하기</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
