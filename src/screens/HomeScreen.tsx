import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { Registro } from '../types';
import {
  calcularIMC,
  crearFechaRegistro,
  formatearIMC,
  obtenerColorDiagnostico,
  obtenerDiagnostico,
} from '../utils/bmi';

import { colors } from '../constants/colors';
import { fontSize, globalStyles, radius, spacing } from '../styles/globalStyles';

export default function HomeScreen(): React.JSX.Element {
  const [nombre, setNombre] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<Registro | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [registros, setRegistros] = useState<Registro[]>([]);

  const validarFormulario = (): boolean => {
    const nombreLimpio = nombre.trim();
    const pesoNumerico = Number(peso);
    const alturaNumerica = Number(altura);

    if (!nombreLimpio || !peso.trim() || !altura.trim()) {
      Alert.alert(
        'Campos obligatorios',
        'Por favor ingresa el nombre, peso y altura del paciente.',
      );
      return false;
    }

    if (Number.isNaN(pesoNumerico) || pesoNumerico <= 0 || pesoNumerico >= 500) {
      Alert.alert(
        'Peso inválido',
        'El peso debe ser un número mayor a 0 y menor a 500 kg.',
      );
      return false;
    }

    if (
      Number.isNaN(alturaNumerica) ||
      alturaNumerica <= 0 ||
      alturaNumerica >= 3
    ) {
      Alert.alert(
        'Altura inválida',
        'La altura debe ser un número mayor a 0 y menor a 3 metros.',
      );
      return false;
    }

    return true;
  };

  const handleCalcularIMC = (): void => {
    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    const pesoNumerico = Number(peso);
    const alturaNumerica = Number(altura);
    const imcCalculado = calcularIMC(pesoNumerico, alturaNumerica);
    const diagnostico = obtenerDiagnostico(imcCalculado);

    const nuevoResultado: Registro = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      peso: pesoNumerico,
      altura: alturaNumerica,
      imc: imcCalculado,
      diagnostico,
      fecha: crearFechaRegistro(),
    };

    setResultado(nuevoResultado);
    setModalVisible(true);
  };

  const handleCerrarModal = (): void => {
    setModalVisible(false);
  };

  const limpiarFormulario = (): void => {
    setNombre('');
    setPeso('');
    setAltura('');
    setResultado(null);
  };

  const handleAgregarAlHistorial = (): void => {
    if (!resultado) {
      Alert.alert(
        'Sin resultado',
        'Primero debes calcular el IMC antes de agregarlo al historial.',
      );
      return;
    }

    setRegistros([resultado, ...registros]);
    setModalVisible(false);
    limpiarFormulario();
  };

  const handleEliminarRegistro = (id: string): void => {
    const nuevosRegistros = registros.filter(registro => registro.id !== id);
    setRegistros(nuevosRegistros);
  };

  const handleLimpiarHistorial = (): void => {
    if (registros.length === 0) {
      Alert.alert('Historial vacío', 'No existen registros para limpiar.');
      return;
    }

    Alert.alert(
      'Limpiar historial',
      '¿Estás seguro de eliminar todos los registros?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => setRegistros([]),
        },
      ],
    );
  };

  const obtenerTextoContador = (): string => {
    if (registros.length === 0) {
      return 'Sin registros aun';
    }

    if (registros.length === 1) {
      return '1 registro';
    }

    return `${registros.length} registros`;
  };

  const calcularPromedioIMC = (): string => {
    if (registros.length === 0) {
      return '--';
    }

    const sumaIMC = registros.reduce((total, registro) => {
      return total + registro.imc;
    }, 0);

    const promedio = sumaIMC / registros.length;

    return promedio.toFixed(2);
  };

  const calcularIMCMaximo = (): string => {
    if (registros.length === 0) {
      return '--';
    }

    const maximo = registros.reduce((mayor, registro) => {
      return registro.imc > mayor ? registro.imc : mayor;
    }, registros[0].imc);

    return maximo.toFixed(2);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={globalStyles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={globalStyles.title}>Calculadora de IMC</Text>
        <Text style={globalStyles.label}>{obtenerTextoContador()}</Text>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Datos del paciente</Text>

          <Text style={globalStyles.label}>Nombre</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ej: Ana Torres"
            placeholderTextColor={colors.textMuted}
            value={nombre}
            onChangeText={setNombre}
          />

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={globalStyles.label}>Peso (kg)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Ej: 70.5"
                placeholderTextColor={colors.textMuted}
                value={peso}
                onChangeText={setPeso}
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
                onChangeText={setAltura}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            style={globalStyles.primaryButton}
            activeOpacity={0.85}
            onPress={handleCalcularIMC}>
            <Text style={globalStyles.primaryButtonText}>Calcular IMC</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Estadísticas</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{registros.length}</Text>
              <Text style={styles.statLabel}>Registros</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{calcularPromedioIMC()}</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statValue}>{calcularIMCMaximo()}</Text>
              <Text style={styles.statLabel}>Máximo</Text>
            </View>
          </View>
        </View>

        <View style={globalStyles.card}>
          <View style={styles.historyHeader}>
            <Text style={globalStyles.sectionTitle}>Historial</Text>

            <TouchableOpacity activeOpacity={0.85} onPress={handleLimpiarHistorial}>
              <Text style={globalStyles.dangerButtonText}>Limpiar todo</Text>
            </TouchableOpacity>
          </View>

          {registros.length === 0 ? (
            <Text style={styles.emptyHistoryText}>Agrega tu primer registro</Text>
          ) : (
            registros.map(registro => {
              const colorDiagnostico = obtenerColorDiagnostico(registro.diagnostico);

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
                      <Text style={[styles.historyBadgeText, { color: colorDiagnostico }]}>
                        {registro.diagnostico}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => handleEliminarRegistro(registro.id)}>
                      <Text style={globalStyles.dangerButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={handleCerrarModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalSubtitle}>Tus resultados IMC</Text>

              {resultado ? (
                <>
                  <Text style={styles.resultName}>{resultado.nombre}</Text>

                  <Text
                    style={[
                      styles.resultValue,
                      { color: obtenerColorDiagnostico(resultado.diagnostico) },
                    ]}>
                    {formatearIMC(resultado.imc)}
                  </Text>

                  <View
                    style={[
                      styles.diagnosticBadge,
                      {
                        borderColor: obtenerColorDiagnostico(resultado.diagnostico),
                        backgroundColor: `${obtenerColorDiagnostico(
                          resultado.diagnostico,
                        )}20`,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.diagnosticText,
                        { color: obtenerColorDiagnostico(resultado.diagnostico) },
                      ]}>
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
                    onPress={handleAgregarAlHistorial}>
                    <Text style={globalStyles.primaryButtonText}>
                      Agregar al historial
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={globalStyles.outlineButton}
                    activeOpacity={0.85}
                    onPress={handleCerrarModal}>
                    <Text style={globalStyles.outlineButtonText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
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
  statusText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    lineHeight: 22,
  },
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