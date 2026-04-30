import {Diagnostico} from '../types';
import {diagnosticoColors} from '../constants/colors';

export function calcularIMC(peso: number, altura: number): number {
  return peso / Math.pow(altura, 2);
}

export function obtenerDiagnostico(imc: number): Diagnostico {
  if (imc < 18.5) {
    return 'Bajo peso';
  }

  if (imc >= 18.5 && imc <= 24.9) {
    return 'Peso normal';
  }

  if (imc >= 25 && imc <= 29.9) {
    return 'Sobrepeso';
  }

  return 'Obesidad';
}

export function obtenerColorDiagnostico(diagnostico: Diagnostico): string {
  return diagnosticoColors[diagnostico];
}

export function formatearIMC(imc: number): string {
  return imc.toFixed(2);
}

export function crearFechaRegistro(): string {
  return new Date().toLocaleDateString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}