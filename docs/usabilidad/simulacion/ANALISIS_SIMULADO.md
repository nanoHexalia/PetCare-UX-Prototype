# Analisis de resultados · SIMULACION ACADEMICA (NO evidencia real)

> AVISO DE INTEGRIDAD: este documento y sus datos son una simulacion generada para ensayar el pipeline de analisis y mostrar el formato esperado de la seccion 11 del informe. NO sustituyen las pruebas con participantes reales exigidas por la actividad. El archivo RESULTADOS_SIMULADOS.csv y este analisis deben quedar rotulados como simulacion en la entrega final, igual que el escenario sintetico de la Actividad 1.

## Metricas globales simuladas

- Participantes: 6 (4 propietarios + 2 proveedores), perfiles objetivo.
- Tasa de exito global ponderada: 92% (parcial = 0,5).
- SUS promedio: 73.8 / 100 (rango 62.5 a 85). Sobre el promedio de la industria (68): leve margen positivo; P-02 (62.5) queda por debajo y coincide con el perfil de menor comodidad tecnologica.
- Tareas mas falladas: T4 Reserva y T2 Agenda proveedor (75% cada una; T4 con 3 exitos y 1 abandono; T2 Agenda con 1 exito y 1 parcial).
- Tarea mas lenta: T4 Reserva (tiempo promedio 4 min, maximo 5.5 min).

## Metricas por tarea (simuladas)

| Tarea | n | Tasa de exito | Tiempo prom (min) | Tiempo max (min) |
|---|---|---|---|---|
| T1-P Registro | 4 | 100% | 1.6 | 2.7 |
| T2-P Mascota | 4 | 100% | 1.3 | 2.3 |
| T3-P Busqueda | 4 | 88% | 2.7 | 4.3 |
| T4-P Reserva | 4 | 75% | 4 | 5.5 |
| T5-P Estado | 4 | 100% | 1 | 1.3 |
| T1-V Solicitudes | 2 | 100% | 2.1 | 2.3 |
| T2-V Agenda | 2 | 75% | 3.3 | 3.7 |
| T3-V Catalogo | 2 | 100% | 1.5 | 1.6 |

## Fricciones agrupadas por tema (frecuencia simulada)

1. Doble confirmacion Reservar/Revisar (3 participantes: P-01, P-02, P-04): la pantalla Revisar genera duda sobre si ya se envio. Severidad ALTA (incluye 1 abandono).
2. Terminologia del filtro 'Franja' (2 participantes: P-01, P-03 al leerlo en voz alta): no se entiende de inmediato. Severidad MEDIA.
3. Visibilidad de 'Crear cuenta' (1 participante: P-02). Severidad MEDIA.
4. Interpreta 'Perfil completo' como acreditacion/verificacion (1 participante: P-04). Severidad ALTA por BR-12 (senales de confianza): riesgo de prometer algo no verificado.
5. Ambiguedad bloqueo vs desactivar en Agenda (1 participante: P-06). Severidad MEDIA.
6. Expectativa de datos de contacto del propietario (1 participante: P-06). Severidad BAJA, ademas entra en tension con BR-13 (minimizacion); se documenta y NO se cambia.

## Verbatims representativos (simulados)

- 'Por que me hace confirmar dos veces?' (P-02, T4)
- 'Le di continuar y pense que ya habia reservado.' (P-03, T4)
- 'Perfil completo quiere decir que esta verificado?' (P-04, T3)

## Que SI demuestra esta simulacion

- El pipeline de analisis (CSV -> metricas -> hallazgos -> decisiones V2) funciona de extremo a extremo.
- La seccion 11 del informe puede redactarse en este formato cuando existan datos reales.
- El protocolo y las hojas de registro cubren todo lo que se necesita capturar.

## Que NO demuestra

- Ninguna conclusion sobre usabilidad real del prototipo. La curva emocional del CJM sigue siendo hipotesis hasta la evidencia real.
