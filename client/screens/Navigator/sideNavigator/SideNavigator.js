import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigator from "../BottomNavigator";
import { SideBarContent } from "./SideBarContent";
import CreateSubject from "../../subjectScreens/CreateSubject";
import SubjectPage from "../../subjectScreens/SubjectPage";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AppHeader from "../../../components/AppHeader";
import { Title } from "react-native-paper";
import CreateFolder from "../../../components/CreateFolder";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator;

function SideNavigator({ navigation }) {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideBarContent {...props} />}>
      {/* <Drawer.Screen name="Home" component={Home} /> */}
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
