import {Registro} from '../types';

export function calcularPromedioIMC(registros: Registro[]): string {
  if (registros.length === 0) {
    return '--';
  }

  const sumaIMC = registros.reduce((total, registro) => {
    return total + registro.imc;
  }, 0);

  const promedio = sumaIMC / registros.length;

  return promedio.toFixed(2);
}

export function calcularIMCMaximo(registros: Registro[]): string {
  if (registros.length === 0) {
    return '--';
  }

  const maximo = registros.reduce((mayor, registro) => {
    return registro.imc > mayor ? registro.imc : mayor;
  }, registros[0].imc);

  return maximo.toFixed(2);
}