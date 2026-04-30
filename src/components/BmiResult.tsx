import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Registro} from '../types';
import {formatearIMC, obtenerColorDiagnostico} from '../utils/bmi';
import {colors} from '../constants/colors';
import {fontSize, globalStyles, radius, spacing} from '../styles/globalStyles';

interface BmiResultProps {
  visible: boolean;
  resultado: Registro | null;
  onAgregarAlHistorial: () => void;
  onCerrar: () => void;
}

export default function BmiResult({
  visible,
  resultado,
  onAgregarAlHistorial,
  onCerrar,
}: BmiResultProps): React.JSX.Element {
  const colorDiagnostico = resultado
    ? obtenerColorDiagnostico(resultado.diagnostico)
    : colors.primary;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCerrar}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalSubtitle}>Tus resultados IMC</Text>

          {resultado ? (
            <>
              <Text style={styles.resultName}>{resultado.nombre}</Text>

              <Text style={[styles.resultValue, {color: colorDiagnostico}]}>
                {formatearIMC(resultado.imc)}
              </Text>

              <View
                style={[
                  styles.diagnosticBadge,
                  {
                    borderColor: colorDiagnostico,
                    backgroundColor: `${colorDiagnostico}20`,
                  },
                ]}>
                <Text style={[styles.diagnosticText, {color: colorDiagnostico}]}>
                  {resultado.diagnostico}
                </Text>
              </View>

              <Text style={styles.resultDescription}>
                Bajo peso: IMC menor a 18.5{'\n'}
                Peso normal: IMC 18.5 a 24.9{'\n'}
                Sobrepeso: IMC 25.0 a 29.9{'\n'}
                Obesidad: IMC mayor o igual a 30
              </Text>

              <TouchableOpacity
                style={globalStyles.primaryButton}
                activeOpacity={0.85}
                onPress={onAgregarAlHistorial}>
                <Text style={globalStyles.primaryButtonText}>
                  Agregar al historial
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={globalStyles.outlineButton}
                activeOpacity={0.85}
                onPress={onCerrar}>
                <Text style={globalStyles.outlineButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.tertiary,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  modalSubtitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  resultName: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  resultValue: {
    fontSize: 72,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  diagnosticBadge: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  diagnosticText: {
    fontSize: fontSize.md,
    fontWeight: '800',
  },
  resultDescription: {
    fontSize: fontSize.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
});