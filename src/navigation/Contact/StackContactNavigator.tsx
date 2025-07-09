import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackContactParamList } from "./types/types";
import ContactListScreen from "../../features/contactos/presentation/ContactList";
import ContactDetailScreen from "../../features/contactos/presentation/ContactDetail";
import ContactFormScreen from '../../features/contactos/presentation/ContactForm';

const Stack = createNativeStackNavigator<StackContactParamList>();



export default function ContactStackNavigator() {
  return (
    <Stack.Navigator
    initialRouteName="contacts"
    screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="contacts" component={ContactListScreen} />
      <Stack.Screen name="contactDetail" component={ContactDetailScreen} />
      <Stack.Screen name="createContact" component={ContactFormScreen} options={{ title: 'Crear Contacto' }}
/>
    </Stack.Navigator>
  );
}