import React, { useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Button, Alert, } from 'react-native';
import ContactList from '../../shared/organisms/Contact/ContactList/ContactList';
import { useContactViewModel } from './viewmodel/ContactViewModel';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ContactListScreen() {
  const {
    contacts,
    isLoading,
    error,
    deleteContact,
    fetchContacts,
  } = useContactViewModel();

  const navigation = useNavigation();

  // Aquí se refresca la lista al volver desde otra pantalla (Por fin)
  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          title="Nuevo Contacto"
          onPress={() => navigation.navigate('createContact')}
        />
      </View>
      <ContactList contacts={contacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
