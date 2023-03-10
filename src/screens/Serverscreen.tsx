import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "../components/shared/Text";
import View from "../components/shared/View";
import { RootTabScreenProps } from "../types";

export default function ServerScreen({
  navigation,
}: RootTabScreenProps<"Room">) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ awaiting players ~</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
});
