import { ColorSchemeName } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import RootTabNavigator from "../navigation/RootTabNavigator";
import LinkingConfiguration from "../navigation/LinkingConfiguration";
import Colors from "../constants/Colors";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootTabNavigator}
        options={{
          headerShown: false,
          statusBarColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: "Oops!",
          statusBarColor: Colors.red,
          statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
