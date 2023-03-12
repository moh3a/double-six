import { StyleSheet } from "react-native";

import Canvas from "../components/game/Canvas";
import View from "../components/shared/View";

export default function RoomScreen() {
  return (
    <View style={styles.container}>
      <Canvas />
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
