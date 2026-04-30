import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';

import BmiForm from '../components/BmiForm';
import BmiResult from '../components/BmiResult';
import HistoryList from '../components/HistoryList';
import StatsCard from '../components/StatsCard';

import {Registro} from '../types';
import {
  calcularIMC,
  crearFechaRegistro,
  obtenerDiagnostico,
} from '../utils/bmi';
import {obtenerTextoContador} from '../utils/history';
import {globalStyles} from '../styles/globalStyles';

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

  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={globalStyles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={globalStyles.title}>Calculadora de IMC</Text>
        <Text style={globalStyles.label}>
          {obtenerTextoContador(registros.length)}
        </Text>

        <BmiForm
          nombre={nombre}
          peso={peso}
          altura={altura}
          onChangeNombre={setNombre}
          onChangePeso={setPeso}
          onChangeAltura={setAltura}
          onCalcular={handleCalcularIMC}
        />

        <StatsCard registros={registros} />

        <HistoryList
          registros={registros}
          onEliminarRegistro={handleEliminarRegistro}
          onLimpiarHistorial={handleLimpiarHistorial}
        />

        <BmiResult
          visible={modalVisible}
          resultado={resultado}
          onAgregarAlHistorial={handleAgregarAlHistorial}
          onCerrar={handleCerrarModal}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}