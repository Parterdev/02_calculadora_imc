# Aplicación móvil IMC - Semana 2

App móvil para calcular el Índice de Masa Corporal (IMC), mostrar un diagnóstico de salud y guardar registros en un historial temporal.

- Ingeniería Informática - 7mo "A"
- Desarrollo de aplicaciones móviles con React Native
- Desarrollado con React Native CLI + TypeScript

## Descripción

La aplicación permite ingresar los datos de un paciente, calcular su IMC, visualizar el resultado en un modal y agregarlo a un historial. También muestra estadísticas básicas como total de registros, IMC promedio e IMC máximo.

El proyecto fue desarrollado tomando como referencia el documento de la actividad ubicado en la carpeta `documents/` del repositorio.

## Funcionalidades

- Formulario para ingresar nombre, peso y altura.
- Validaciones con Alert.
- Cálculo de IMC con dos decimales.
- Diagnóstico según el rango de IMC.
- Modal con el resultado calculado.
- Agregar registros al historial.
- Eliminar registros individuales.
- Limpiar todo el historial.
- Estadísticas: registros, promedio y máximo.

## Diagnósticos

| Rango IMC | Diagnóstico |
|---|---|
| Menor a 18.5 | Bajo peso |
| 18.5 a 24.9 | Peso normal |
| 25.0 a 29.9 | Sobrepeso |
| 30 o más | Obesidad |

## Datos de prueba utilizados

| Nombre | Peso | Altura | IMC | Diagnóstico |
|---|---:|---:|---:|---|
| Ana Torres | 65 kg | 1.68 m | 23.03 | Peso normal |
| Carlos Ruiz | 82 kg | 1.70 m | 28.37 | Sobrepeso |
| Luis Mora | 95 kg | 1.72 m | 32.11 | Obesidad |

Con estos tres registros, las estadísticas esperadas son:

| Registros | Promedio IMC | IMC máximo |
|---:|---:|---:|
| 3 | 27.84 | 32.11 |

## Estructura principal

- `src/components/BmiForm.tsx`
- `src/components/BmiResult.tsx`
- `src/components/HistoryList.tsx`
- `src/components/StatsCard.tsx`
- `src/constants/colors.ts`
- `src/screens/HomeScreen.tsx`
- `src/styles/globalStyles.ts`
- `src/types/index.ts`
- `src/utils/bmi.ts`
- `src/utils/history.ts`
- `src/utils/stats.ts`

## Componentes utilizados de React Native

- View
- Text
- TextInput
- TouchableOpacity
- ScrollView
- KeyboardAvoidingView
- Modal
- Alert
- StatusBar
- StyleSheet

## Requerimientos técnicos cumplidos

- interface Registro
- type Diagnostico
- useState tipado
- Formulario controlado
- Estilos con StyleSheet.create()
- Color dinámico por diagnóstico
- Función calcularIMC() separada
- .map() para renderizar historial
- .filter() para eliminar registros
- .reduce() para estadísticas

## Instalación y ejecución

Instalar dependencias:

`npm install`

Ejecutar Metro:

`npm run start`

Ejecutar en Android:

`npm run android`

Ejecutar en iOS:

`cd ios`

`pod install`

`cd ..`

`npm run ios`

## Autor

Paúl Terán  
Ingeniería Informática - 7mo "A"

## Commit recomendado

`git add README.md`

`git commit -m "docs: add concise readme"`