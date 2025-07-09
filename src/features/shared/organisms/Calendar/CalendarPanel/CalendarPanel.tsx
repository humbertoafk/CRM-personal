import React from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import EventCard from '../../../molecules/Cards/EventCard/EventCard';
import { useNavigation } from '@react-navigation/native';
import { CalendarStackNavigationProp } from '../../../../../navigation/Calendar/types/types';

export interface EventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

interface CalendarPanelProps {
  events?: EventType[];
  isLoading?: boolean;
  error?: string | null;
}

export default function CalendarPanel({ events: propEvents, isLoading, error }: CalendarPanelProps) {
  const navigation = useNavigation<CalendarStackNavigationProp>();
  const events = propEvents || [];

  if (isLoading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#00674F" />
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Eventos agendados</Text>
      {events.length === 0 ? (
        <Text style={styles.emptyText}>No hay eventos disponibles.</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              date={item.startDate.toLocaleString()}
              onPress={() => navigation.navigate('eventDetail', { id: item.id })}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#121212',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E0E0E0',
    marginBottom: 16,
  },
  separator: {
    height: 12,
  },
  listContent: {
    paddingBottom: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#CCCCCC',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
