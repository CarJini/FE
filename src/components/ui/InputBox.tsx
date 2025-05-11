import { Text, TextInput as RNTextInput, View } from "react-native";
import { styled } from "nativewind";

const TextInput = styled(RNTextInput);

type Props = React.ComponentProps<typeof TextInput> & {
  label?: string;
};

export function InputBox({ label, ...props }: Props) {
  const isDisabled = props.editable === false;
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text>
      )}
      <TextInput
        className={`w-full px-4 py-3 border rounded-lg ${
          isDisabled
            ? "bg-gray-100 text-gray-400 border-gray-200"
            : "bg-white text-gray-900 border-gray-300"
        }`}
        selectTextOnFocus={!isDisabled}
        {...props}
      />
    </View>
  );
}
