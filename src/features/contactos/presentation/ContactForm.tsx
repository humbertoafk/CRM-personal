import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Switch, Alert, ScrollView, TouchableOpacity, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useContactViewModel } from './viewmodel/ContactViewModel';

export default function ContactFormScreen() {
  const { createContact } = useContactViewModel();

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactType, setContactType] = useState<'person' | 'company'>('person');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El campo "Nombre completo" es obligatorio.');
      return;
    }

    try {
      await createContact({
        id: '',
        name,
        firstName,
        lastName,
        contactType,
        isFavorite,
        imageAvailable: false,
        imageUri: '',
        lookupKey: '',
      });

      Alert.alert('Éxito', 'Contacto creado correctamente.');
      setName('');
      setFirstName('');
      setLastName('');
      setContactType('person');
      setIsFavorite(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el contacto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Nuevo Contacto</Text>
        <View style={styles.detailCard}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej. Juan Pérez"
          />

          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

          <Text style={styles.label}>Apellido</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

          <Text style={styles.label}>Tipo de contacto</Text>
          <Picker
            selectedValue={contactType}
            onValueChange={(itemValue) => setContactType(itemValue as 'person' | 'company')}
            style={styles.input}
          >
            <Picker.Item label="Persona" value="person" />
            <Picker.Item label="Empresa" value="company" />
          </Picker>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Favorito</Text>
            <Switch value={isFavorite} onValueChange={setIsFavorite} />
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Crear contacto</Text>
          </TouchableOpacity>
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
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#00674F',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
