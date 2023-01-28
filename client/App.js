import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet,} from 'react-native';
import MainContainer from "./mainContainer/MainContainer";
import SignIn from "./screens/SignInScreeen/SignIn";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <MainContainer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6ec',
  },
});
