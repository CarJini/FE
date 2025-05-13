import {
  MaintenanceItemCategoryOptions,
  MaintenanceItemResponse,
} from "@/src/types";
import {
  Divider,
  ProgressBar as KittenProgressBar,
} from "@ui-kitten/components";
import { View, Text } from "react-native";

export function MaintenanceItemStatus({
  vehicleNowKm,
  item,
}: {
  vehicleNowKm: number;
  item: MaintenanceItemResponse;
}) {
  const category = MaintenanceItemCategoryOptions.find(
    (c) => c.value === item.category
  )?.label;
  const elapsedKm = item.replacementKm - item.remainingKm;
  const daysPerMonth = 30.44;
  const totalCycleDays = item.replacementCycle * daysPerMonth;
  const elapsedDays = Math.round(totalCycleDays - item.remainingDay);
  return (
    <View className="p-2">
      <Text className="text-lg font-bold mb-2">{category}</Text>
      <ProgressBar
        progressTitle="주행거리 주기"
        progress={item.kmProgress ?? 0}
        nowText={`${elapsedKm.toLocaleString()}km`}
        replacementText={`${item.replacementKm?.toLocaleString()} km`}
      />
      {item.dayProgress !== undefined &&
        item.replacementCycle !== undefined && (
          <>
            <Divider style={{ marginVertical: 4 }} />
            <ProgressBar
              progressTitle="기간 주기"
              progress={item.dayProgress}
              nowText={`${elapsedDays}일`}
              replacementText={`${item.replacementCycle}개월`}
            />
          </>
        )}
    </View>
  );
}

function ProgressBar({
  progressTitle,
  progress,
  nowText,
  replacementText,
}: {
  progressTitle: string;
  progress: number;
  nowText: string;
  replacementText: string;
}) {
  const status = getStatus(progress / 100);
  const statusColor = getStatusColor(status);
  return (
    <View className="flex-column gap-y-1">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-sm font-bold text-gray-900 opacity-50">
          {progressTitle}
        </Text>
        <View
          style={{ backgroundColor: getStatusColor(status, 0.2) }}
          className="px-2 rounded-full"
        >
          <Text
            className="text-xs font-bold text-center"
            style={{ color: statusColor }}
          >
            {progress}%
          </Text>
        </View>
      </View>
      <KittenProgressBar
        progress={progress / 100}
        size="large"
        status={status === "normal" ? "primary" : status}
      />
      <View className="flex-row justify-between items-center">
        <Text className="text-sm" style={{ color: statusColor }}>
          <Text className="font-bold">{nowText}</Text> 경과
        </Text>

        <Text className="text-sm text-gray-600">{replacementText}</Text>
      </View>
    </View>
  );
}

function getStatus(progress: number) {
  switch (true) {
    case progress >= 1.0:
      return "danger";
    case progress > 0.75:
      return "warning";
    default:
      return "normal";
  }
}

function getStatusColor(status: "danger" | "warning" | "normal", alpha = 1) {
  switch (status) {
    case "danger":
      return `rgba(255, 61, 113, ${alpha})`;
    case "warning":
      return `rgba(255, 170, 0, ${alpha})`;
    default:
      return `rgba(51, 102, 255, ${alpha})`;
  }
}
