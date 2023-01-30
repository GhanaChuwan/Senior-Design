import React, {useContext, useId} from "react";
import {View, StyleSheet} from "react-native";
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch

} from "react-native-paper";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../../context/AuthContext";

export function SideBarContent(props) {
    const {logout, userInfo} = useContext(AuthContext);
    const navigation = useNavigation();

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () =>{
        setIsDarkTheme(!isDarkTheme);
    }

    return(
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props}>
               <View style={styles.drawerContent}>
                   <View style={styles.userInfoSection}>
                       <View style={{flexDirection:'row', marginTop:15}}>
                           <Avatar.Text
                               label={`${userInfo.user.firstName[0].toUpperCase()}${userInfo.user.lastName[0].toUpperCase()}`}
                               size={64}
                           />
                           <View style={{flexDirection:'column', marginLeft:15}}>
                               <Title style={styles.title}>{userInfo.user.firstName}</Title>
                               <Caption style={styles.caption}> {userInfo.user.email}
                               </Caption>
                           </View>
                       </View>
                   </View>

               </View>
               <Drawer.Section style={styles.bottomDrawerSection}>
                   <DrawerItem
                       icon={({color, size}) => (
                           <Icon name="home-outline" color="green" size={size}/>
                       )}
                       label="Home" onPress={() => {}}
                   />
                   <DrawerItem
                       icon={({color, size}) => (
                           <Icon name="account-outline" color="green" size={size}/>
                       )}
                       label="Profile" onPress={() => {}}
                   />
                   <DrawerItem
                       icon={({color, size}) => (
                           <Icon name="download" color="green" size={size}/>
                       )}
                       label="Download Progress" onPress={() => {}}
                   />
                   <DrawerItem
                       icon={({color, size}) => (
                           <Icon name="help" color="green" size={size}/>
                       )}
                       label="Help" onPress={() => {}}
                   />
                   <DrawerItem
                       icon={({color, size}) => (
                           <Icon name="decagram" color="green" size={size}/>
                       )}
                       label="Setting" onPress={() => {}}
                   />
               </Drawer.Section>
               <Drawer.Section title="Preferences">
                   <TouchableRipple onPress={() => {toggleTheme()}}>
                       <View style={styles.preference}>
                           <Text>Dark Theme</Text>
                           <View pointerEvents="none">
                               <Switch value={isDarkTheme}/>
                           </View>

                       </View>
                   </TouchableRipple>

               </Drawer.Section>
           </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon name="exit-to-app" color="green" size={size}/>
                    )}
                    label="Sign-Out" onPress={() => {logout()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1,
    },
    userInfoSection:{
        paddingLeft: 20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,

    },
    drawerSection:{
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1,
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal: 16,
    },
})