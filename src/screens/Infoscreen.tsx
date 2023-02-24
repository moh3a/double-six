import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";

export default function InfoScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ learn about double six rules ~</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
