import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types/Stack";

import HomeScreen from "../../features/settings/presentation/Home";
import SettingsScreen from "../../features/settings/presentation/Settings";

const Stack = createNativeStackNavigator<StackParamList>();

export default function SettingsStackNavigation (){
    return(
        <Stack.Navigator
        initialRouteName="settings"
        screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="index" component={HomeScreen} />
            <Stack.Screen name="settings" component={SettingsScreen}/>
        </Stack.Navigator>
    )
}