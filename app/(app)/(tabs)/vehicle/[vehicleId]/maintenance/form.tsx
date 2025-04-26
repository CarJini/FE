import { ScrollView, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { MaintenanceItem, MaintenanceItemCategoryOptions } from "@/src/types";
import { Button, InputBox } from "@/src/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IndexPath, Select, SelectItem, Toggle } from "@ui-kitten/components";
import { MaintenanceItemCategoryType } from "@/src/types/maintenanceItem.types";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { useVehicleAdd } from "@/src/context";

export default function MaintenanceItemFormScreen() {
  const { myVehicles, maintenanceItemsByVehicle, updateMaintenanceItem } =
    useVehicleAdd();
  const router = useRouter();
  const {
    mode,
    itemId: itemIdStr,
    vehicleId: vehicleIdStr,
  } = useLocalSearchParams();
  const vehicleId = Number(vehicleIdStr);
  const itemId = Number(itemIdStr);
  const isEditMode = mode === "edit";
  const vehicleInfo = myVehicles.find((vehicle) => vehicle.id === vehicleId);
  const item = maintenanceItemsByVehicle[vehicleId].find(
    (item) => item.id === itemId
  );
  const [maintenanceItem, setMaintenanceItem] = useState<MaintenanceItem>(
    item ?? {
      id: 0,
      name: "",
      category: "ENGINE_OIL",
      replacementCycle: "0",
      replacementKm: 0,
      remainingKm: 0,
      lastReplacementDate: new Date(),
      kmProgress: 0,
      dayProgress: 0,
      status: "양호",
      cycleAlarm: false,
      kmAlarm: false,
    }
  );
  const [selectedItem, setSelectedItem] = useState<{
    value: MaintenanceItemCategoryType;
    label: string;
  }>(
    MaintenanceItemCategoryOptions.find(
      (option) => option.value === maintenanceItem.category
    ) ?? {
      value: "ENGINE_OIL",
      label: "엔진 오일",
    }
  );
  const selectedIndex = new IndexPath(
    MaintenanceItemCategoryOptions.findIndex(
      (option) => option.value === selectedItem.value
    )
  );

  function onSelectCategory(index: IndexPath | IndexPath[]) {
    const selectedIndex = Array.isArray(index) ? index[0] : index;
    setSelectedItem(MaintenanceItemCategoryOptions[selectedIndex.row]);
    setMaintenanceItem((prev) => ({
      ...prev,
      category: MaintenanceItemCategoryOptions[selectedIndex.row].value,
    }));
  }

  function onChangeInput(
    field: keyof MaintenanceItem,
    value: string | number | boolean
  ) {
    // TODO: 한글 입력 이슈
    setMaintenanceItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function onCheckedChange({
    checkedType,
    checked,
  }: {
    checkedType: "cycleAlarm" | "kmAlarm";
    checked: boolean;
  }) {
    setMaintenanceItem((prev) => ({
      ...prev,
      [checkedType]: checked,
    }));
  }

  async function onSave() {
    const carOwnerId = vehicleId.toString();
    let method: string;
    let url: string;
    let finalUrl: string;
    if (isEditMode) {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.UPDATE);
      finalUrl = url.replace("{id}", itemId.toString());
      finalUrl = finalUrl.replace("{carOwnerId}", carOwnerId);
    } else {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.CREATE);
      finalUrl = url.replace("{carOwnerId}", carOwnerId);
    }

    const newData = {
      name: maintenanceItem.name,
      category: maintenanceItem.category,
      cycleAlarm: maintenanceItem.cycleAlarm,
      kmAlarm: maintenanceItem.kmAlarm,
      replacementCycle: maintenanceItem.replacementCycle,
      replacementKm: maintenanceItem.replacementKm,
    };
    try {
      const res = await apiClient.request({
        method,
        url: finalUrl,
        data: newData,
      });
      updateMaintenanceItem(vehicleId, { ...maintenanceItem, ...newData });
      router.push(`/vehicle/${vehicleId}/maintenance/items`);
    } catch (error) {
      console.error("Error saving maintenance item:", error);
    } finally {
      console.warn("차량 정비 품목 저장 완료");
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <View className="p-4 bg-white rounded-lg  border border-gray-200 mb-4">
          <Text className="text-base mb-2">기본 정보</Text>
          <InputBox
            label="품목 이름"
            value={maintenanceItem.name}
            onChangeText={(nextValue) => onChangeInput("name", nextValue)}
          />
          <Select
            label="카테고리"
            selectedIndex={selectedIndex}
            value={selectedItem ? selectedItem.label : "카테고리를 선택하세요."}
            onSelect={onSelectCategory}
          >
            {MaintenanceItemCategoryOptions.map((option) => (
              <SelectItem key={option.value} title={option.label} />
            ))}
          </Select>
        </View>
        <View className="p-4 bg-white rounded-lg  border border-gray-200">
          <Text className="text-base mb-2">교체 주기 설정</Text>
          <InputBox
            label="교체 주기 (km)"
            value={maintenanceItem.replacementKm?.toString()}
            // onChange{(event) => {

            // }}
            onChangeText={(nextValue) =>
              onChangeInput("replacementKm", nextValue)
            }
          />
          <Toggle
            checked={maintenanceItem.kmAlarm}
            onChange={() =>
              onCheckedChange({
                checkedType: "kmAlarm",
                checked: !maintenanceItem.kmAlarm,
              })
            }
          >
            교체 주기 (km) 알림
          </Toggle>
          <InputBox
            label="교체 주기 (일)"
            value={maintenanceItem.replacementCycle?.toString()}
            onChangeText={(nextValue) =>
              onChangeInput("replacementCycle", nextValue)
            }
          />
          <Toggle
            checked={maintenanceItem.cycleAlarm}
            onChange={() =>
              onCheckedChange({
                checkedType: "cycleAlarm",
                checked: !maintenanceItem.cycleAlarm,
              })
            }
          >
            교체 주기 (일) 알림
          </Toggle>
        </View>
        {isEditMode && (
          <Button label="삭제" color="secondary" onPress={() => {}} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </ScrollView>
    </SafeAreaView>
  );
}
