import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DividerProps } from './types/types';

export default function Divider({ thickness = 1, color = '#2E2E2E', marginVertical = 8 }: DividerProps) {
  return (
    <View style={[styles.divider, { height: thickness, backgroundColor: color, marginVertical }]} />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
