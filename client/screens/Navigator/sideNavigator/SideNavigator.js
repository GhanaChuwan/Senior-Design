import React from "react";
import { StyleSheet } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import BottomNavigator from "../BottomNavigator";
import { SideBarContent } from "./SideBarContent";
import CreateSubject from "../../subjectScreens/CreateSubject";
import SubjectPage from "../../subjectScreens/SubjectPage";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator;

function SideNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator drawerContent={(props) => <SideBarContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={BottomNavigator}
        options={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#1e407c" },
          headerTintColor: "#fff",
        }}
      />
    </Drawer.Navigator>
  );
}

export default SideNavigator;
