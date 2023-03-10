import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Domino from "../components/Domino";
import Button from "../components/shared/Button";
import Text from "../components/shared/Text";
import View from "../components/shared/View";
import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ double six ~</Text>
      <View style={{ paddingVertical: 50 }}>
        <Domino
          top={1}
          bottom={3}
          rotation={45}
          height={350}
          width={175}
          backgroundColor={Colors.white}
          color={Colors.primary}
        />
      </View>
      <View style={{ marginVertical: 2 }}>
        <Button onPress={() => navigation.navigate("Server")}>new game</Button>
      </View>
      <View style={{ marginVertical: 2 }}>
        <Button onPress={() => navigation.navigate("Join")}>join game</Button>
      </View>
      <View style={{ marginVertical: 2 }}>
        <Button onPress={() => navigation.navigate("NotFound")}>
          play offline
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
});
