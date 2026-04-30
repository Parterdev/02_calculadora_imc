import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Registro} from '../types';
import {calcularIMCMaximo, calcularPromedioIMC} from '../utils/stats';
import {colors} from '../constants/colors';
import {fontSize, globalStyles, radius, spacing} from '../styles/globalStyles';

interface StatsCardProps {
  registros: Registro[];
}

export default function StatsCard({
  registros,
}: StatsCardProps): React.JSX.Element {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.sectionTitle}>Estadísticas</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{registros.length}</Text>
          <Text style={styles.statLabel}>Registros</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calcularPromedioIMC(registros)}</Text>
          <Text style={styles.statLabel}>Promedio</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calcularIMCMaximo(registros)}</Text>
          <Text style={styles.statLabel}>Máximo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.secondary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});