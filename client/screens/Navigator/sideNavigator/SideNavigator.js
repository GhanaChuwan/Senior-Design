import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";

import BottomNavigator from "../BottomNavigator";
import {SideBarContent} from "./SideBarContent";
import CreateSubject from "../../subjectScreens/CreateSubject";
import SubjectPage from "../../subjectScreens/SubjectPage";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator;

function SideNavigator() {
    return(
        <Drawer.Navigator  drawerContent={props => <SideBarContent{...props}/>}>
            <Drawer.Screen name="Dashboard" component={BottomNavigator} options={{headerTitleAlign:"center"}}/>
        </Drawer.Navigator>
    )
}
export default SideNavigator