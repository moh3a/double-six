import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  //   useEffect(() => {
  //     navigation.navigate("Root");
  //   }, []);

  return (
    <View style={styles.container}>
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
