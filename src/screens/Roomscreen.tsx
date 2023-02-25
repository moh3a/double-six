import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import Canvas from "../components/room/Canvas";

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
