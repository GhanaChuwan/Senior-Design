import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Subject from "../subjectScreens/Subject.js";
import CalendarPage from "../CalendarScreen/CalendarPage";
import Resources from "../Resources.js";
import Reward from "../Reward.js";
// Screens names
const subjectName = "Subject";
const calendarName = "Calendar";
const resourcesName = "Resources";
const rewardName = "Challenges";

const Tab = createBottomTabNavigator();

function BottomTabNavigator({ navigation, sideBarNav }) {
  return (
    <Tab.Navigator
      initialRouteName={subjectName}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#1e407c",
        },

        tabBarActiveTintColor: "white",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === subjectName) {
            iconName = focused ? "book" : "book";
          } else if (rn === calendarName) {
            iconName = focused ? "calendar" : "calendar";
          } else if (rn === resourcesName) {
            iconName = focused ? "list" : "list";
          } else if (rn === rewardName) {
            iconName = focused ? "trophy" : "trophy";
          }
          return <Ionicons name={iconName} size={30} color={"white"} />;
        },
      })}
    >
      <Tab.Screen
        name={subjectName}
        component={Subject}
        initialParams={{ item: undefined, title: "Subject" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={calendarName}
        component={CalendarPage}
        initialParams={{ sideBarNav: navigation, title: "Calander" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={resourcesName}
        component={Resources}
        initialParams={{ title: "Resource" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={rewardName}
        component={Reward}
        initialParams={{ title: "Reward" }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
