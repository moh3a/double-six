import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Domino from "../components/Domino";
import { View, Text } from "../components/Themed";

export default function AccountScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ account details ~</Text>
      <View>
        <Domino top={1} bottom={2} rotation={0} />
      </View>
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
