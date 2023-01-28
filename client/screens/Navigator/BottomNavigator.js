import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Subject from "../subjectScreens/Subject.js";
import Calendar from "../Calendar.js";
import Resources from "../Resources.js";
import Reward from "../Reward.js";
// Screens names
const subjectName = "Subject";
const calendarName = "Calendar";
const resourcesName = "Resources";
const rewardName = "Reward";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return(
        <Tab.Navigator
            initialRouteName={subjectName}
            screenOptions={({route,}) =>({
                tabBarIcon:({focused, color, size}) =>{
                    let iconName;
                    let rn = route.name;

                    if(rn === subjectName){
                        iconName = focused ? 'book':'book';
                    } else if (rn === calendarName) {
                        iconName = focused ? 'calendar' :'calendar';
                    } else if (rn === resourcesName) {
                        iconName = focused ? 'list': 'list';
                    } else if (rn === rewardName) {
                        iconName = focused ? 'trophy':'trophy';
                    }
                    return <Ionicons name={iconName} size={30} color={color}/>

                },

            })}>

            <Tab.Screen name={subjectName} component={Subject} initialParams={{item:undefined}} options={{headerShown: false}}/>
            <Tab.Screen name={calendarName} component={Calendar} options={{headerShown: false}}/>
            <Tab.Screen name={resourcesName} component={Resources} options={{headerShown: false}}/>
            <Tab.Screen name={rewardName} component={Reward} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}
export default BottomTabNavigator