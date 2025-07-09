import React, { useRef } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { Contact } from '../../../../contactos/domain/entities/contact';

interface ContactDetailViewProps {
  contact: Contact;
}

export default function ContactDetailView({ contact }: ContactDetailViewProps) {
  const navigation = useNavigation();
  const tempDateRef = useRef<Date | null>(null); // guardar fecha temporal

  const handleBack = () => {
    navigation.goBack();
  };

  const ensureCalendarAccess = async (): Promise<string | null> => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se puede acceder al calendario.');
      return null;
    }

    const calendars = await Calendar.getCalendarsAsync();
    const editable = calendars.find(cal => cal.allowsModifications);

    if (editable) return editable.id;

    const newCalendarId = await Calendar.createCalendarAsync({
      title: 'Recordatorios de contactos',
      color: '#00674F',
      entityType: Calendar.EntityTypes.EVENT,
      source: calendars[0].source,
      name: 'Recordatorios',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    return newCalendarId;
  };

  const showDatePicker = () => {
    // Paso 1: seleccionar fecha
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      is24Hour: true,
      minimumDate: new Date(),
      onChange: (event, selectedDate) => {
        if (event.type === 'dismissed' || !selectedDate) return;

        tempDateRef.current = selectedDate;

        // Paso 2: seleccionar hora
        DateTimePickerAndroid.open({
          value: new Date(),
          mode: 'time',
          is24Hour: true,
          onChange: async (timeEvent, selectedTime) => {
            if (timeEvent.type === 'dismissed' || !selectedTime || !tempDateRef.current) return;

            const finalDate = new Date(tempDateRef.current);
            finalDate.setHours(selectedTime.getHours());
            finalDate.setMinutes(selectedTime.getMinutes());
            finalDate.setSeconds(0);

            try {
              // 1. Notificación
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Recordatorio de contacto',
                  body: `Es momento de contactar a ${contact.name}`,
                },
                trigger: { type: 'date', date: finalDate },
              });

              // 2. Evento en calendario
              const calendarId = await ensureCalendarAccess();
              if (calendarId) {
                await Calendar.createEventAsync(calendarId, {
                  title: `Contactar a ${contact.name}`,
                  startDate: finalDate,
                  endDate: new Date(finalDate.getTime() + 30 * 60 * 1000),
                  timeZone: 'America/Mexico_City',
                  notes: `Recordatorio para contactar a ${contact.name}`,
                });
              }

              Alert.alert('Listo', `Recordatorio agendado para ${finalDate.toLocaleString()}`);
            } catch (error) {
              Alert.alert('Error', 'No se pudo agendar el recordatorio.');
            }

            tempDateRef.current = null;
          },
        });
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader
        name={contact.name}
        imageUri={contact.imageUri}
        onBack={handleBack}
      />

      <View style={styles.section}>
        <Text style={styles.label}>Nombre completo:</Text>
        <Text style={styles.value}>{contact.name}</Text>

        <Text style={styles.label}>Primer Nombre:</Text>
        <Text style={styles.value}>{contact.firstName}</Text>

        <Text style={styles.label}>Apellido:</Text>
        <Text style={styles.value}>{contact.lastName}</Text>

        <Text style={styles.label}>Tipo de Contacto:</Text>
        <Text style={styles.value}>{contact.contactType}</Text>

        <Text style={styles.label}>Es favorito:</Text>
        <Text style={styles.value}>{contact.isFavorite ? '❤️' : '🤍'}</Text>
      </View>

      <Button onClick={showDatePicker} style={styles.button}>
        <Text style={styles.buttonText}>Agendar recordatorio</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
    gap: 24,
  },
  section: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#AAAAAA',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#00674F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
