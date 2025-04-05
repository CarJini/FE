import { useVehicleAdd } from "@/src/context";
import { Datepicker, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

export default function VehicleAddStep4Screen() {
  const { vehicleData, updateVehicleData } = useVehicleAdd();
  function onAdd() {
    console.log("vehicleData", vehicleData);
    router.push("/vehicle");
  }

  function onChangeInput(key: string, value: string) {
    updateVehicleData({ ...vehicleData, [key]: value });
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="flex-1 p-5">
        <Text className="mb-3 text-2xl font-bold">기본 정보</Text>
        <Input
          label={"제조사"}
          value={vehicleData.maker}
          style={styles.input}
          disabled={true}
        />
        <Input
          label={"차종"}
          value={vehicleData.model}
          style={styles.input}
          disabled={true}
        />
        <Input
          label={"유종"}
          value={vehicleData.fuelType}
          style={styles.input}
          disabled={true}
        />
        <Input
          label={"차량 별명"}
          value={vehicleData.name}
          style={styles.input}
          onChangeText={(nextValue) => onChangeInput("name", nextValue)}
        />
        <Input
          label={"연식"}
          value={vehicleData.year.toString()}
          style={styles.input}
          onChangeText={(nextValue) => onChangeInput("year", nextValue)}
        />
        <Input
          label={"주행 거리"}
          value={vehicleData.distance.toString()}
          style={styles.input}
          onChangeText={(nextValue) => onChangeInput("distance", nextValue)}
        />

        <Datepicker
          label={"구입 날짜"}
          date={vehicleData.buyDate}
          style={styles.input}
          onSelect={(nextValue) => onChangeInput("buyDate", nextValue)}
        />

        <Pressable className="bg-blue-600 p-2 rounded-lg mt-3" onPress={onAdd}>
          <Text className="text-white text-center">등록하기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    borderRadius: 12,
  },
});
