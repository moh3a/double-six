import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { RootTabParamList, RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/Homescreen";
import InfoScreen from "../screens/Infoscreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarActiveBackgroundColor: Colors.yellow,
        tabBarItemStyle: {
          borderRadius: 50,
        },
        tabBarInactiveTintColor: Colors.yellow,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: Colors.gray,
          borderRadius: 50,
          height: 60,
          ...styles.shadow,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Info"
        component={InfoScreen}
        options={({ navigation }: RootTabScreenProps<"Info">) => ({
          title: "Info",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="info-circle" color={color} />
          ),
          headerShown: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.yellow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
