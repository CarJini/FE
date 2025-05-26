import { SafeAreaView, Text, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import {
  MaintenanceItemRequest,
  MaintenanceItemCategoryOptions,
} from "@/src/types";
import {
  Button,
  Card,
  IconButton,
  InputBox,
  ScreenLayout,
} from "@/src/components";
import { useRouter } from "expo-router";
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
import { useMaintenanceParams, useSafeBackRedirect } from "@/src/hooks";
import { useVehicleStore } from "@/src/store";
import { Toggle } from "@ui-kitten/components";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";

// 정비 품목 등록/수정
export default function MaintenanceItemFormScreen() {
  const { isEditMode, vehicleId, itemId } = useMaintenanceParams();
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState([
    ...MaintenanceItemCategoryOptions,
  ]);
  DropDownPicker.setListMode("SCROLLVIEW");

  const router = useRouter();
  const [maintenanceItem, setMaintenanceItem] =
    useState<MaintenanceItemRequest | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    value: MaintenanceItemCategoryType;
    label: string;
  } | null>(null);

  useSafeBackRedirect(onBackPress);

  useEffect(() => {
    const foundItem = maintenanceItemsByVehicle[vehicleId]?.find(
      (i) => i.id === itemId
    );

    const initialItem = foundItem
      ? mapMaintenanceResponseToRequest(foundItem)
      : {
          name: "",
          category: "ENGINE_OIL" as MaintenanceItemCategoryType,
          alarm: false,
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

  function onBackPress() {
    isEditMode
      ? router.replace(
          `/vehicle/maintenance-item-detail?vehicleId=${vehicleId}&itemId=${itemId}`
        )
      : router.replace(`/vehicle/maintenance-items?vehicleId=${vehicleId}`);
  }

  function onChangeInput(
    field: keyof MaintenanceItemResponse,
    value: string | number | boolean
  ) {
    setMaintenanceItem((prev) => ({
      ...prev!,
      [field]: value,
    }));
  }

  function onAlarmChange(checked: boolean) {
    setMaintenanceItem((prev) => ({
      ...prev!,
      alarm: checked,
    }));
  }

  async function onSave() {
    if (!maintenanceItem) return;
    if (
      Number(maintenanceItem.replacementKm) === 0 ||
      Number(maintenanceItem.replacementCycle) === 0
    ) {
      Toast.show({
        type: "error",
        text1: "추가 실패",
        text2: "교체 주기(km, 개월)은 0보다 커야합니다.",
        position: "bottom",
      });
      return;
    }

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

    try {
      await apiClient.request({
        method,
        url: finalUrl,
        data: maintenanceItem,
      });

      Toast.show({
        type: "success",
        text1: isEditMode ? "저장 완료" : "추가 완료",
        position: "bottom",
      });

      router.replace(`/vehicle/maintenance-items?vehicleId=${vehicleId}`);
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

      Toast.show({
        type: "success",
        text1: "삭제 완료",
        position: "bottom",
      });

      router.replace(`/vehicle/maintenance-items?vehicleId=${vehicleId}`);
    } catch (error) {
      console.error("Error deleting maintenance item:", error);
    }
  }

  if (!maintenanceItem || !selectedItem) {
    return null;
  }

  if (isEditMode && !maintenanceItem) {
    return null;
  }

  return (
    <ScreenLayout
      headerTitle={`정비 품목 ${isEditMode ? "수정" : "추가"}`}
      scroll={true}
      LeftHeader={<IconButton iconName="chevron-back" onPress={onBackPress} />}
    >
      <Card>
        <View className="mb-3">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            정비 품목
          </Text>
          <DropDownPicker
            placeholder="정비 품목을 선택하세요"
            open={isPickerOpen}
            value={maintenanceItem.category}
            items={categoryItems}
            setOpen={setIsPickerOpen}
            setValue={(callback) =>
              setMaintenanceItem((prev) => ({
                ...prev!,
                category:
                  typeof callback === "function"
                    ? callback(prev!.category)
                    : callback,
              }))
            }
            setItems={setCategoryItems}
            style={{
              borderColor: "#D1D5DB",
              borderWidth: 1,
              borderRadius: 8,
            }}
            dropDownContainerStyle={{
              borderColor: "#D1D5DB",
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
        </View>
        <View className="flex-row gap-4 mb-3">
          <View className="flex-1">
            <Text className="mb-2 text-sm font-medium text-gray-700">
              교체 주기 (km)
            </Text>
            <TextInput
              className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 border-gray-300"
              value={maintenanceItem.replacementKm?.toString()}
              onChangeText={(nextValue) =>
                onChangeInput("replacementKm", nextValue)
              }
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1">
            <Text className="mb-2 text-sm font-medium text-gray-700">
              교체 주기 (개월)
            </Text>
            <TextInput
              className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 border-gray-300"
              value={maintenanceItem.replacementCycle?.toString()}
              onChangeText={(nextValue) =>
                onChangeInput("replacementCycle", nextValue)
              }
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text className="mb-3 text-sm font-medium text-gray-700">알림</Text>
            <Toggle
              checked={maintenanceItem.alarm}
              onChange={() => onAlarmChange(!maintenanceItem.alarm)}
            />
          </View>
        </View>
        {isEditMode && (
          <Button label="삭제" color="secondary" onPress={onDelete} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </Card>
    </ScreenLayout>
  );
}
