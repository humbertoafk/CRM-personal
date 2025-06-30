import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardProps } from './types/types';

const Card = ({ children, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
