import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ double six ~</Text>
      {/* <SvgUri
        uri="../../assets/dominoes/66.svg"
        width={35}
        height={35}
        style={{ borderRadius: 50 }}
      /> */}
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
