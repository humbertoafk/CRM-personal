import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ContactCard from '../../molecules/Cards/ContactCard/ContactCard';
import EventCard from '../../molecules/Cards/EventCard/EventCard';
import { useNavigation } from '@react-navigation/native';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { DrawerNavProp } from '../../../../navigation/types/Drawer';

interface DashboardProps {
  contacts: { name: string; imageUri?: string; onPress: () => void }[];
  events: { title: string; date: string; onPress: () => void }[];
  notifications: { message: string; onPress: () => void }[];
  onNavigateContacts: () => void;
  onNavigateCalendar: () => void;
  onNavigateNotifications: () => void;
  onNavigateSettings: () => void;
}


export default function Dashboard({ contacts, events, notifications,}: DashboardProps) {
    
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contactos destacados</Text>
        {contacts.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
        <Button onClick={() => navigation.navigate('contactsMain')} style={styles.button}>
          <Text style={styles.buttonText}>Ver contactos</Text>
        </Button>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Eventos próximos</Text>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        <Button onClick={() => navigation.navigate('calendarMain')} style={styles.button}>
          <Text style={styles.buttonText}>Ver el calendario</Text>
        </Button>
      </View>
      <View style={styles.section}>
        <Button onClick={() => navigation.navigate('settingsMain')} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Configuración</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
    backgroundColor: '#121212',
  },
  section: {
    gap: 12,
    marginBottom: 16,
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#03DAC6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
});
