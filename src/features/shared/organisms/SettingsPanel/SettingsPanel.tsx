import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import SettingOption from '../../molecules/Option/SettingOption';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';

interface SettingsPanelProps {
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  calendarSyncEnabled: boolean;
  onToggleCalendarSync: () => void;
  onResetApp: () => void;
}

export default function SettingsPanel({
  notificationsEnabled,
  onToggleNotifications,
  calendarSyncEnabled,
  onToggleCalendarSync,
  onResetApp,
}: SettingsPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <SettingOption
        label="Notificaciones"
        iconName="notifications"
        value={notificationsEnabled}
        onToggle={onToggleNotifications} 
      />

      <SettingOption
        label="Sincronizar calendario"
        iconName="calendar-today"
        value={calendarSyncEnabled}
        onToggle={onToggleCalendarSync} 
      />

      <View style={styles.separator} />

      <Button onClick={onResetApp} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Restablecer aplicación</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#E0E0E0',
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 16,
  },
  resetButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
