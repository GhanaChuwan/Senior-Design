import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SideNavigator from "../screens/Navigator/sideNavigator/SideNavigator"
import ForgotPassword from "../screens/forgotPassword/ForgotPassword"
import CreateSubject from "../screens/subjectScreens/CreateSubject";
import SubjectPage from "../screens/subjectScreens/SubjectPage";
import Subject from "../screens/subjectScreens/Subject";
import SignIn from "../screens/SignInScreeen/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUpScreen/SignUp";
import CreateMenu from "../components/CreateMenu";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import Grades from "../screens/ActivityScreens/Grades";
import NewGrade from "../screens/ActivityScreens/NewGrade";
const Stack = createNativeStackNavigator();

function MainNav() {



    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken == null ?
                    (
                        <Stack.Group>
                            <Stack.Screen name="SignIn" component={SignIn} />
                            <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name="Navigation" component={SideNavigator} />
                            <Stack.Screen name="CreateSubject" component={CreateSubject} initialParams={{ color: undefined }}
                                options={{ title: "Create a subject" }} />
                            <Stack.Screen name="SubjectPage" component={SubjectPage} />
                            <Stack.Screen name="Grades" component={Grades} />
                            <Stack.Screen name="NewGrade" component={NewGrade}
                                options={{ title: "Create a grade" }} />

                        </Stack.Group>

                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MainNav