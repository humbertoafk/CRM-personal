import React from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TextProps } from './types/types';

const Text = ({ children, variant = 'body', style }: TextProps) => {
  return <RNText style={[styles[variant], style]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  body: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
  },
});
