import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import { IUser, RootTabParamList, RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/Homescreen";
import InfoScreen from "../screens/Infoscreen";
import ServerScreen from "../screens/Serverscreen";
import RoomScreen from "../screens/Roomscreen";
import AccountScreen from "../screens/Accountscreen";
import JoinScreen from "../screens/Joinscreen";
import Icon from "../components/Icon";
import View from "../components/shared/View";
import { useUser } from "../hooks/store";
import FirebaseApp from "../config/firebase.config";

const Stack = createNativeStackNavigator<RootTabParamList>();

function RootTabNavigator() {
  const { setupUser, id } = useUser();
  const auth = getAuth(FirebaseApp);
  const db = getFirestore(FirebaseApp);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const data = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        };
        if (!userSnap.exists()) {
          await setDoc(userRef, data);
        }
        setupUser(data as IUser);
      } else {
        setupUser({
          id: "",
          name: undefined,
          email: undefined,
          phoneNumber: undefined,
          photoURL: undefined,
        });
      }
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, db]);

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
        name="Join"
        component={JoinScreen}
        options={({ navigation }: RootTabScreenProps<"Join">) => ({
          title: "Join a server",
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
