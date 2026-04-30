import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../constants/colors';
import {fontSize, globalStyles, radius, spacing} from '../styles/globalStyles';

interface BmiFormProps {
  nombre: string;
  peso: string;
  altura: string;
  onChangeNombre: (value: string) => void;
  onChangePeso: (value: string) => void;
  onChangeAltura: (value: string) => void;
  onCalcular: () => void;
}

export default function BmiForm({
  nombre,
  peso,
  altura,
  onChangeNombre,
  onChangePeso,
  onChangeAltura,
  onCalcular,
}: BmiFormProps): React.JSX.Element {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.sectionTitle}>Datos del paciente</Text>

      <Text style={globalStyles.label}>Nombre</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Ej: Ana Torres"
        placeholderTextColor={colors.textMuted}
        value={nombre}
        onChangeText={onChangeNombre}
      />

      <View style={styles.inputRow}>
        <View style={styles.inputColumn}>
          <Text style={globalStyles.label}>Peso (kg)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ej: 70.5"
            placeholderTextColor={colors.textMuted}
            value={peso}
            onChangeText={onChangePeso}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputColumn}>
          <Text style={globalStyles.label}>Altura (m)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ej: 1.70"
            placeholderTextColor={colors.textMuted}
            value={altura}
            onChangeText={onChangeAltura}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <TouchableOpacity
        style={globalStyles.primaryButton}
        activeOpacity={0.85}
        onPress={onCalcular}>
        <Text style={globalStyles.primaryButtonText}>Calcular IMC</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  inputColumn: {
    flex: 1,
  },
});