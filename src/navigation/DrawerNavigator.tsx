import React from "react";
import { StyleSheet, ViewStyle,  } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootDrawerParamList } from "./types/Drawer";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from "react-native-safe-area-context";


import CalendarStackNavigator from "./Calendar/StackCalendarNavigator";
import NotificationStackNavigator from "./Notifications/StackNotificationNavigator";
import HomeScreen from "../features/settings/presentation/Home";
import SettingsStackNavigation from "./Main/StackNavigator";
import ContactStackNavigator from "./Contact/StackContactNavigator";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function DrawerNavigation() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Drawer.Navigator
            initialRouteName="index"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1E1E', 
                },
                headerStatusBarHeight: 0, 
                headerTintColor: '#1E1E1E', 
                drawerStyle: {
                    backgroundColor: '#121212',  
                },
                drawerActiveTintColor: '#03DAC6', 
                drawerInactiveTintColor: '#AAAAAA', 
                drawerLabelStyle: {
                    fontWeight: 'bold', 
                    fontSize: 16,
                    color: '#FFFFFF',
                },
            }}
        >
            <Drawer.Screen
                name="index"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="contactsMain"
                component={ContactStackNavigator}
                options={{
                    title: 'Contactos',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="address-book" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="calendarMain"
                component={CalendarStackNavigator}
                options={{
                    title: 'Calendario',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="calendar-alt" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="settingsMain"
                component={SettingsStackNavigation}
                options={{
                    title: 'Configuraciones',
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome5 name="cog" color={color} size={size} />
                    ),
                }}
            />
            
        </Drawer.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#121212'
    }
});