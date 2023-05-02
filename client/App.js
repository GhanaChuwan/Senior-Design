import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MainContainer from "./mainContainer/MainContainer";
import SignIn from "./screens/SignInScreeen/SignIn";
import { StyleSheet } from "react-native";

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <MainContainer />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
