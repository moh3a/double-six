import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text } from "../components/Themed";
import Button from "../components/shared/Button";
import { RootTabScreenProps } from "../types";

export default function ServerScreen({
  navigation,
}: RootTabScreenProps<"Room">) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ create a server or join ~</Text>
      <Button onPress={() => navigation.navigate("Room")}>with bots</Button>
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
