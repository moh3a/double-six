import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ 404 ~ NOT FOUND ~</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
