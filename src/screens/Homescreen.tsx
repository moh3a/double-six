import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>~ double six ~</Text>
      <SvgUri
        uri="./assets/dominoes/66.svg"
        width={35}
        height={35}
        style={{ borderRadius: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: Colors.white,
  },
});
