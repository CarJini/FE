import { Input, InputProps } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export function InputBox(props: InputProps) {
  return <Input style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    borderRadius: 12,
  },
});
