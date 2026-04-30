import {Diagnostico} from '../types';

export const colors = {
  primary: '#6C63FF',
  secondary: '#081854',
  tertiary: '#FFFFFF',

  background: '#F4F3FF',
  card: '#FFFFFF',
  border: '#E5E7EB',
  text: '#081854',
  textMuted: '#6B7280',

  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',

  inputBackground: '#F9FAFB',
  overlay: 'rgba(8, 24, 84, 0.45)',
};

export const diagnosticoColors: Record<Diagnostico, string> = {
  'Bajo peso': '#3B82F6',
  'Peso normal': '#10B981',
  'Sobrepeso': '#F59E0B',
  'Obesidad': '#EF4444',
};