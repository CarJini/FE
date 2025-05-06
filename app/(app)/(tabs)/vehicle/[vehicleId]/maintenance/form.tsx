import { ScrollView, SafeAreaView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import {
  MaintenanceItemRequest,
  MaintenanceItemCategoryOptions,
} from "@/src/types";
import { Button, InputBox } from "@/src/components";
import { useRouter } from "expo-router";
import { IndexPath, Select, SelectItem, Toggle } from "@ui-kitten/components";
import {
  MaintenanceItemCategoryType,
  MaintenanceItemResponse,
} from "@/src/types/maintenanceItem.types";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import {
  mapMaintenanceResponseToRequest,
  replacePathParams,
} from "@/src/utils";
import { useMaintenanceParams } from "@/src/hooks";
import { useVehicleStore } from "@/src/store";

export default function MaintenanceItemFormScreen() {
  const { isEditMode, vehicleId, itemId } = useMaintenanceParams();
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const fetchMaintenanceItems = useVehicleStore(
    (state) => state.fetchMaintenanceItems
  );

  const router = useRouter();
  const [maintenanceItem, setMaintenanceItem] =
    useState<MaintenanceItemRequest | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    value: MaintenanceItemCategoryType;
    label: string;
  } | null>(null);

  useEffect(() => {
    const foundItem = maintenanceItemsByVehicle[vehicleId]?.find(
      (i) => i.id === itemId
    );
    if (isEditMode && !foundItem) return;

    const initialItem = foundItem
      ? mapMaintenanceResponseToRequest(foundItem)
      : {
          name: "",
          category: "ENGINE_OIL" as MaintenanceItemCategoryType,
          cycleAlarm: false,
          kmAlarm: false,
          replacementCycle: 0,
          replacementKm: 0,
        };

    setMaintenanceItem(initialItem);

    const defaultCategory = MaintenanceItemCategoryOptions.find(
      (option) => option.value === initialItem.category
    ) ?? {
      value: "ENGINE_OIL",
      label: "엔진 오일",
    };

    setSelectedItem(defaultCategory);
  }, [isEditMode, vehicleId, itemId, maintenanceItemsByVehicle]);

  if (!maintenanceItem || !selectedItem) {
    return null;
  }

  const selectedIndex = new IndexPath(
    MaintenanceItemCategoryOptions.findIndex(
      (option) => option.value === selectedItem.value
    )
  );

  function onSelectCategory(index: IndexPath | IndexPath[]) {
    const selectedIndex = Array.isArray(index) ? index[0] : index;
    setSelectedItem(MaintenanceItemCategoryOptions[selectedIndex.row]);
    setMaintenanceItem((prev) => ({
      ...prev!,
      category: MaintenanceItemCategoryOptions[selectedIndex.row].value,
    }));
  }

  function onChangeInput(
    field: keyof MaintenanceItemResponse,
    value: string | number | boolean
  ) {
    // TODO: 한글 입력 이슈
    setMaintenanceItem((prev) => ({
      ...prev!,
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
      ...prev!,
      [checkedType]: checked,
    }));
  }

  async function onSave() {
    if (!maintenanceItem) return;
    let method: string;
    let url: string;
    let finalUrl: string;
    if (isEditMode) {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.UPDATE);
      finalUrl = replacePathParams(url, {
        carOwnerId: vehicleId.toString(),
        id: itemId.toString(),
      });
    } else {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.CREATE);
      finalUrl = replacePathParams(url, {
        carOwnerId: vehicleId.toString(),
      });
    }
    console.log("maintenanceItem onsave >>>>", maintenanceItem);

    try {
      await apiClient.request({
        method,
        url: finalUrl,
        data: maintenanceItem,
      });
      fetchMaintenanceItems(vehicleId);
      router.push(`/vehicle/${vehicleId}/maintenance/items`);
    } catch (error) {
      console.error("Error saving maintenance item:", error);
    }
  }

  async function onDelete() {
    const { method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.DELETE;
    try {
      await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: vehicleId.toString(),
          id: itemId.toString(),
        }),
      });
      fetchMaintenanceItems(vehicleId);
      router.push(`/vehicle/${vehicleId}/maintenance/items`);
    } catch (error) {
      console.error("Error deleting maintenance item:", error);
    }
  }

  if (isEditMode && !maintenanceItem) {
    return null;
  }

  console.log("maintenanceItem>>>>>", maintenanceItem);

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
          <Button label="삭제" color="secondary" onPress={onDelete} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </ScrollView>
    </SafeAreaView>
  );
}
