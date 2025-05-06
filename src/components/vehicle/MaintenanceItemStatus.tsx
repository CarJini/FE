import { MaintenanceItemResponse } from "@/src/types";
import {
  Divider,
  ProgressBar as KittenProgressBar,
} from "@ui-kitten/components";
import { View, Text } from "react-native";
import { differenceInDays } from "date-fns/fp";

export function MaintenanceItemStatus({
  vehicleNowKm,
  item,
}: {
  vehicleNowKm: number;
  item: MaintenanceItemResponse;
}) {
  const kmProgress = item.kmProgress ?? 0;
  // const elapsedTime = differenceInDays(new Date(item.remainingDay), new Date());
  const elapsedTime = item.remainingDay - item.replacementCycle;
  return (
    <View className="p-2">
      <Text className="text-lg font-bold mb-2">{item.name}</Text>
      <ProgressBar
        progressTitle="주행거리 주기"
        progress={kmProgress}
        nowText={`${vehicleNowKm.toLocaleString()} Km`}
        remainingText={`${item.remainingKm?.toLocaleString()} Km`}
      />
      {item.dayProgress !== undefined &&
        item.replacementCycle !== undefined && (
          <>
            <Divider style={{ marginVertical: 4 }} />
            <ProgressBar
              progressTitle="기간 주기"
              progress={item.dayProgress}
              nowText={`${elapsedTime}일 경과`}
              remainingText={`${item.replacementCycle?.toString()} 일`}
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
  remainingText,
}: {
  progressTitle: string;
  progress: number;
  nowText: string;
  remainingText: string;
}) {
  return (
    <View className="flex-column">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-sm font-bold text-gray-800 opacity-50">
          {progressTitle}
        </Text>
        <View
          className="px-1 rounded-full"
          style={[{ backgroundColor: getStatusColor(progress / 100) }]}
        >
          <Text className="text-white text-xs font-bold text-center">
            {progress}%
          </Text>
        </View>
      </View>
      <KittenProgressBar progress={progress / 100} size="medium" />
      <View className="flex-row justify-between">
        <Text className="text-sm text-gray-800">{nowText}</Text>
        <Text className="text-sm text-gray-800">{remainingText}</Text>
      </View>
    </View>
  );
}

// status가 아닌 거리 기반으로 0.75 이상이면 예정, 1.0 이상이면 필요 이왼 정상
const getStatusColor = (progress: number) => {
  switch (true) {
    case progress >= 1.0:
      return "#FF3B30";
    case progress > 0.75:
      return "#FF9500";
    default:
      return "#34C759";
  }
};
