import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FirebaseApp from "../config/firebase.config";
import Domino from "../components/Domino";
import Button from "../components/shared/Button";
import Text from "../components/shared/Text";
import View from "../components/shared/View";
import { useUser } from "../hooks/store";

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useUser();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(FirebaseApp);

  const signInHandler = async () => {
    await signInWithRedirect(auth, provider);
  };

  const signOutHanler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ paddingTop: insets.top, ...styles.container }}>
      <Text>~ account details ~</Text>
      <View>
        <Domino top={1} bottom={2} rotation={0} />
      </View>
      <View style={{ marginVertical: 20 }}>
        {id ? (
          <Button onPress={signOutHanler}>sign out</Button>
        ) : (
          <Button onPress={signInHandler}>sign in with google</Button>
        )}
      </View>
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
