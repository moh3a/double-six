import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootTabParamList, RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/Homescreen";
import InfoScreen from "../screens/Infoscreen";
import ServerScreen from "../screens/Serverscreen";
import RoomScreen from "../screens/Roomscreen";
import AccountScreen from "../screens/Accountscreen";
import { View } from "../components/Themed";
import Icon from "../components/Icon";

const Stack = createNativeStackNavigator<RootTabParamList>();

function RootTabNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "",
          headerShadowVisible: false,
          headerLeft() {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Account")}
                >
                  <Icon name="user-o" color={Colors.primary} />
                </TouchableOpacity>
              </View>
            );
          },
          headerRight() {
            return (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate("Info")}>
                  <Icon name="question" color={Colors.primary} />
                </TouchableOpacity>
              </View>
            );
          },
          statusBarTranslucent: true,
        })}
      />
      <Stack.Screen
        name="Server"
        component={ServerScreen}
        options={({ navigation }: RootTabScreenProps<"Server">) => ({
          title: "Server",
          headerTitleAlign: "center",
          headerTransparent: false,
          statusBarTranslucent: true,
        })}
      />
      <Stack.Screen
        name="Room"
        component={RoomScreen}
        options={({ navigation }: RootTabScreenProps<"Room">) => ({
          title: "Double Six",
          headerTitleAlign: "center",
          headerTransparent: false,
          statusBarTranslucent: true,
        })}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={({ navigation }: RootTabScreenProps<"Account">) => ({
          title: "Account",
          headerTitleAlign: "center",
          headerTransparent: false,
          statusBarTranslucent: true,
        })}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={({ navigation }: RootTabScreenProps<"Info">) => ({
          title: "Info",
          headerTitleAlign: "center",
          headerTransparent: false,
          statusBarTranslucent: true,
        })}
      />
    </Stack.Navigator>
  );
}

export default RootTabNavigator;
