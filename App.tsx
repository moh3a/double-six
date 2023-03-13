import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./src/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResource";
import View from "./src/components/shared/View";
import Text from "./src/components/shared/Text";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      {isLoadingComplete ? (
        <>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </>
      ) : (
        <SafeAreaView>
          <View>
            <Text>~ loading ~</Text>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
