import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Button, Alert, ScrollView, Platform, KeyboardAvoidingView,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackCalendarParamList } from '../../../navigation/Calendar/types/types';
import EventDetailView from '../../shared/organisms/Calendar/EventDetail/EventDetail';
import { CalendarViewModel } from './viewmodel/CalendarViewModel';
import EventFormModal from '../../shared/organisms/Calendar/ModalEvent/ModalEvent';
import { useContactViewModel } from '../../contactos/presentation/viewmodel/ContactViewModel';
import { CalendarEventModel } from '../../calendar/data/models/CalendarModel';
import { CalendarEvent } from '../domain/entities/event';

type EventDetailRouteProp = RouteProp<StackCalendarParamList, 'eventDetail'>;

export default function EventDetailScreen() {
  const route = useRoute<EventDetailRouteProp>();
  const { id } = route.params;
  const navigation = useNavigation();

  const {
    fetchEventById,
    selectedEvent,
    isLoading,
    error,
    updateEvent,
    deleteEvent,
    fetchEvents,
  } = CalendarViewModel();

  const { contacts, isLoading: contactsLoading, error: contactsError } = useContactViewModel();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchEventById(id);
  }, [id]);

  const handleSubmit = async (updatedEvent: CalendarEventModel) => {
    await updateEvent(updatedEvent);
    await fetchEvents();
    setIsModalVisible(false);
    navigation.goBack();
  };

  const handleDelete = async () => {
    Alert.alert(
      '¿Eliminar evento?',
      'Esta acción no se puede deshacer',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(id);
            await fetchEvents();
            navigation.goBack();
          },
        },
      ]
    );
  };

  const adaptToModel = (event: CalendarEvent): CalendarEventModel => ({
    id: event.id,
    title: event.title,
    location: event.location ?? '',
    notes: event.notes ?? '',
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    contactId: event.contactId ?? '',
    organizer: '',
    attendees: [],
  });

  if (isLoading) return <ActivityIndicator size="large" color="#00674F" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!selectedEvent) return <Text style={styles.errorText}>No se encontró el evento.</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.scrollContent}>
          <EventDetailView event={selectedEvent} />
          <View style={styles.actions}>
            <Button title="Editar" onPress={() => setIsModalVisible(true)} />
            <Button title="Eliminar" color="red" onPress={handleDelete} />
          </View>
        </View>

        <EventFormModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          eventToEdit={adaptToModel(selectedEvent)}
          contacts={contacts}
          contactsLoading={contactsLoading}
          contactsError={contactsError}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexGrow: 1,
  },
  errorText: {
    marginTop: 50,
    textAlign: 'center',
    color: '#FF6B6B',
    fontSize: 16,
  },
  actions: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
});
