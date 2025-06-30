import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import ProfileHeader from '../../../molecules/Profile/ProfileHeader';
import Button from '../../../atoms/Button/Button';
import Text from '../../../atoms/Text/Text';
import { useNavigation } from '@react-navigation/native';
import { CalendarEvent } from '../../../../calendar/domain/entities/event';
import { ContactViewModel } from '../../../../contactos/presentation/viewmodel/ContactViewModel';

interface EventDetailViewProps {
  event: CalendarEvent;
}

export default function EventDetailView({ event }: EventDetailViewProps) {
  const navigation = useNavigation();
  const { fetchContactById, selectedContact, isLoading } = ContactViewModel();
  const [contactName, setContactName] = useState<string>('Cargando...');

  useEffect(() => {
  const loadContactName = async () => {
    if (event.contactId) {
      const contacto = await fetchContactById(event.contactId);
      setContactName(contacto?.name ?? 'No asignado');
    } else {
      setContactName('No asignado');
    }
  };

  loadContactName();
}, [event.contactId]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ProfileHeader name={event.title} imageUri={''} onBack={handleBack} />

        <View style={styles.content}>
          <View style={styles.detailCard}>
            <Text style={styles.sectionTitle}>Información del Evento</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha:</Text>
              <Text style={styles.detailValue}>
                {event.startDate.toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hora:</Text>
              <Text style={styles.detailValue}>
                {event.startDate.toLocaleTimeString()} - {event.endDate.toLocaleTimeString()}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Lugar:</Text>
              <Text style={styles.detailValue}>{event.location || 'Sin lugar'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notas:</Text>
              <Text style={styles.detailValue}>{event.notes || 'Sin notas'}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Contacto:</Text>
              <Text style={styles.detailValue}>
                {isLoading ? 'Cargando...' : contactName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  detailCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#03DAC6',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#AAAAAA',
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    width: '60%',
    textAlign: 'right',
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
