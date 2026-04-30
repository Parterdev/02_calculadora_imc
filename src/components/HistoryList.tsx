import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Registro} from '../types';
import {formatearIMC, obtenerColorDiagnostico} from '../utils/bmi';
import {colors} from '../constants/colors';
import {fontSize, globalStyles, radius, spacing} from '../styles/globalStyles';

interface HistoryListProps {
  registros: Registro[];
  onEliminarRegistro: (id: string) => void;
  onLimpiarHistorial: () => void;
}

export default function HistoryList({
  registros,
  onEliminarRegistro,
  onLimpiarHistorial,
}: HistoryListProps): React.JSX.Element {
  return (
    <View style={globalStyles.card}>
      <View style={styles.historyHeader}>
        <Text style={globalStyles.sectionTitle}>Historial</Text>

        <TouchableOpacity activeOpacity={0.85} onPress={onLimpiarHistorial}>
          <Text style={globalStyles.dangerButtonText}>Limpiar todo</Text>
        </TouchableOpacity>
      </View>

      {registros.length === 0 ? (
        <Text style={styles.emptyHistoryText}>Agrega tu primer registro</Text>
      ) : (
        registros.map(registro => {
          const colorDiagnostico = obtenerColorDiagnostico(
            registro.diagnostico,
          );

          return (
            <View key={registro.id} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{registro.nombre}</Text>
                <Text style={styles.historyDetail}>
                  IMC {formatearIMC(registro.imc)} · {registro.diagnostico}
                </Text>
                <Text style={styles.historyDate}>{registro.fecha}</Text>
              </View>

              <View style={styles.historyActions}>
                <View
                  style={[
                    styles.historyBadge,
                    {
                      borderColor: colorDiagnostico,
                      backgroundColor: `${colorDiagnostico}20`,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.historyBadgeText,
                      {color: colorDiagnostico},
                    ]}>
                    {registro.diagnostico}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => onEliminarRegistro(registro.id)}>
                  <Text style={globalStyles.dangerButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  emptyHistoryText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  historyItem: {
    backgroundColor: colors.inputBackground,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyInfo: {
    marginBottom: spacing.md,
  },
  historyName: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  historyDetail: {
    fontSize: fontSize.sm,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  historyDate: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  historyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  historyBadge: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  historyBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
});