import { ScrollView, SafeAreaView, View } from "react-native";
import { Button, Card, InputBox } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { dummyCars } from "@/src/dummydata/data";

const skipInputNames = ["id", "maintenanceItems"];
export default function VehicleEditScreen() {
  const route = useRoute();
  const { vehicleId } = route.params as { vehicleId: number };
  const vehicleInfo = dummyCars.find((car) => car.id === vehicleId);

  if (!vehicleInfo) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Card>
            <View className="items-center gap-y-2">
              {Object.entries(vehicleInfo).map(([key, value]) => {
                if (skipInputNames.includes(key) || !value) return null;
                return (
                  <InputBox key={key} label={key} value={value.toString()} />
                );
              })}
            </View>
            <Button label="저장" onPress={() => {}} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
