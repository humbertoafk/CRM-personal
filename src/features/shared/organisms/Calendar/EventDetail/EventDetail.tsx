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
            <Text style={styles.sectionTitle}>Detalles del Evento</Text>

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
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#AAAAAA',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#AAAAAA',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#AAAAAA',
    width: '45%',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    width: '55%',
    textAlign: 'right',
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#00674F',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
