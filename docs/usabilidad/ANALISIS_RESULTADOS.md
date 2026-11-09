# Analisis de resultados · como convertir datos en decisiones V2

## 1. Metricas por tarea
- Tasa de exito: (# exitos completos) / (# participantes de esa tarea). Parcial cuenta como 0,5.
- Tiempo promedio y tiempo maximo.
- Frecuencia de cada friccion (agrupar por tema: etiquetas, navegacion, terminos, visibilidad de acciones).

## 2. Metricas globales
- SUS promedio (reportar tambien minimo y maximo).
- Tarea mas fallada y tarea mas lenta.
- Verbatims mas representativos (2 a 4 citas).

## 3. Regla de decision para V2 (priorizacion)
| Criterio | Umbral | Accion |
|---|---|---|
| Friccion reportada por 2 o mas participantes | siempre | Mejora V2 obligatoria |
| Tarea con exito < 80% | rediseño | Revisar flujo/etiquetas antes de V2 |
| SUS promedio < 68 | alerta | Revisar hallazgos globales antes de cerrar |
| Comentario de 1 solo participante | a juicio | Evaluar: si es de accesibilidad/claridad, aplicar |

## 4. Estructura del hallazgo (rellenar en ITERACION_V2.md)
- ID hallazgo (H-01, H-02...)
- Evidencia: tarea, participantes, cita, metrica
- Severidad (alta/media/baja)
- Decision de diseno V2 (que se cambia y en que pantalla)
- Evidencia: captura V1 y captura V2
- Estado: aplicado en Figma y en HTML/CSS (ambos, coherencia exigida)

## 5. Reporte honesto
- Reportar lo que funciono y lo que no. No inflar resultados.
- La curva emocional del CJM se actualiza solo si hay evidencia verbal que la respalde; si no, se mantiene como hipotesis con esa nota.
- Distinguir SIEMPRE: datos sinteticos previos (insumo) vs resultados de estas pruebas reales (evidencia).
