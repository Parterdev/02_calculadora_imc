export function obtenerTextoContador(totalRegistros: number): string {
  if (totalRegistros === 0) {
    return 'Sin registros aun';
  }

  if (totalRegistros === 1) {
    return '1 registro';
  }

  return `${totalRegistros} registros`;
}