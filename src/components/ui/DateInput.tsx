import { format } from "date-fns";
import { useState } from "react";
import { Pressable, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  label?: string;
  date: Date;
  onChange: (date: Date) => void;
};

export function DateInput({ label = "날짜 선택", date, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  function onConfirm(selectedDate: Date) {
    onChange(selectedDate);
    setShowPicker(false);
  }

  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-700 mb-2">{label}</Text>
      <Pressable
        onPress={() => setShowPicker(true)}
        className="border border-gray-300 rounded-lg px-4 py-3 bg-white flex-row items-center justify-between"
      >
        <Text className="text-gray-900">{format(date, "yyyy-MM-dd")}</Text>
        <Text className="text-gray-400">📅</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        date={date}
        onConfirm={onConfirm}
        onCancel={() => setShowPicker(false)}
        locale="ko-KR"
        confirmTextIOS="확인"
        cancelTextIOS="취소"
        display="spinner"
      />
    </View>
  );
}
