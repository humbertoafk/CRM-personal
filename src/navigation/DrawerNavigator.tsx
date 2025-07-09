import React from "react";
import { StyleSheet } from "react-native";
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
            backgroundColor: '#03DAC6',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            elevation: 3,
          },
          headerTintColor: '#1E1E1E',
          drawerStyle: {
            backgroundColor: '#121212',
            paddingVertical: 8,
            width: 280,
          },
          drawerActiveTintColor: '#03DAC6',
          drawerInactiveTintColor: '#AAAAAA',
          drawerActiveBackgroundColor: '#1E1E1E',
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
            marginLeft: -12,
          },
          drawerItemStyle: {
            borderRadius: 10,
            marginVertical: 4,
            paddingLeft: 4,
            paddingRight: 10,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="house-user" color={color} size={18} solid />
            ),
          }}
        />
        <Drawer.Screen
          name="contactsMain"
          component={ContactStackNavigator}
          options={{
            title: 'Contactos',
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="users" color={color} size={18} solid />
            ),
          }}
        />
        <Drawer.Screen
          name="calendarMain"
          component={CalendarStackNavigator}
          options={{
            title: 'Calendario',
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar-check" color={color} size={18} solid />
            ),
          }}
        />
        <Drawer.Screen
          name="settingsMain"
          component={SettingsStackNavigation}
          options={{
            title: 'Configuraciones',
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="sliders-h" color={color} size={18} solid />
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
    backgroundColor: '#121212',
  },
});
