import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Navigation from "./src/navigation";
import useColorScheme from "./src/hooks/useColorScheme";
import useCachedResources from "./src/hooks/useCachedResource";
import { View, Text } from "./src/components/Themed";

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
