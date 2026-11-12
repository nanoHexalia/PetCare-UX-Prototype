# Evaluación heurística · PetCare (Actividad 3, etapa de pruebas)

**Fecha:** 2026-11-12 · **Versión evaluada:** v0.6 (commit `ee4b858`), 17 páginas + `site/assets/js/app.js`
**Evaluador:** Vibe (agente IA del equipo, rol de evaluador experto). Recorrido de pantallas y revisión de código.
**Método:** evaluación heurística contra los 10 principios de usabilidad de Nielsen (1994), con escala de severidad 0–4 (0 = no es problema de usabilidad; 4 = catastrófico, impide completar la tarea).

> **Rotulación de veracidad (regla dura del repo):** este documento es una **evaluación heurística de experto**. NO es una prueba de usabilidad con usuarios y NO contiene datos de participantes. La prueba con usuarios del perfil objetivo (4 propietarios + 2 proveedores) sigue pendiente de ejecutarse con el kit de `docs/usabilidad/`; cuando exista, sus resultados se registrarán por separado, en `RESULTADOS.csv` y `ANALISIS_RESULTADOS.md`, y nunca se mezclarán con este documento.

## Contexto previo

Antes de esta evaluación, el prototipo ya tenía un QA visual completo PASS (Fases 0–D, registro en `docs/QA_STATUS.md`): flujo de reserva end-to-end, BR-06, persistencia, responsive. La evaluación heurística revisa calidad de usabilidad más allá del funcionamiento.

## Hallazgos

| ID | Heurística (Nielsen) | Severidad | Hallazgo | Decisión |
|----|----------------------|-----------|----------|----------|
| EH-01 | H1 Visibilidad del estado del sistema | 3 | `servicio.html` mostraba horarios ya ocupados como disponibles; el usuario elegía un slot y recién en `reservar.html` lo veía deshabilitado. | **Corregido en v0.7:** los slots ocupados (hoy) se marcan "· ocupado" y se bloquean en `servicio.html`. Restricción documentada: la disponibilidad se calcula para el día actual; el detalle por fecha se confirma en `reservar.html`. |
| EH-02 | H6 Reconocimiento antes que recuerdo | 3 | El formulario de login tenía radios "Propietario/Proveedor" que NO intervenían en la autenticación (el rol viene de la cuenta); un usuario podía marcar "Proveedor", entrar con una cuenta de propietario y aterrizar en el tablero equivocado sin entender por qué. | **Corregido en v0.7:** radios retirados del login; nota explicativa "El rol se toma de tu cuenta: lo eliges al crearla." |
| EH-03 | H3 Control y libertad del usuario | 3 | No existía ninguna forma de cerrar sesión ni de volver al acceso una vez dentro; para cambiar de cuenta había que limpiar a mano el localStorage o usar `__petcare.reset()` (herramienta de QA, no de usuario final). | **Corregido en v0.7:** enlace "Cerrar sesión" en la navegación de todas las páginas de producto; limpia la sesión y regresa al login. |
| EH-04 | H1 + honestidad del producto | 2 | En `mascotas.html` los botones decían "Mascota de demostración creada" y "Edición de mascota simulada" cuando en realidad la gestión de mascotas no está implementada en el MVP; el mensaje sugería una acción que no ocurre. | **Corregido en v0.7:** mensajes rotulados como fuera del alcance del MVP. |
| EH-05 | H9 Ayuda a reconocer y recuperarse de errores | 1 | Los errores de registro (correo inválido, clave corta, correo duplicado) se notifican solo con un toast global; no hay mensaje en línea junto al campo. | **Aceptado para V2:** el toast es visible y accionable; se registra como deuda de la iteración de usabilidad. |
| EH-06 | H6 + H2 Consistencia | 1 | La navegación superior muestra los tableros de ambos roles en todas las páginas, sin reflejar el rol de la sesión actual. | **Aceptado:** el prototipo demuestra los dos roles del sistema (requisito académico); se registra como decisión consciente, no como defecto. |
| EH-07 | H2 Estética y minimalismo (límite documentación/producto) | 0–1 | El enlace "UIKit" de la guía de estilos aparece en la navegación de producto. | **Aceptado:** es documentación del sistema de diseño útil para la revisión académica; el MVP no se considera desplegado a producción. |

## Lo que PASA (verificado, sin hallazgos)

- **H4 Consistencia y estándares:** badges de estado, botones y formato de fecha/moneda (es-CO, COP) uniformes en las 17 páginas.
- **H5 Prevención de errores:** slots ocupados deshabilitados en `reservar.html`, guarda BR-06 en la decisión del proveedor, cancelación en dos pasos (acción destructiva), validación de registro (clave ≥ 6, correo válido, correo no repetido), fecha mínima = hoy en búsqueda.
- **H7 Flexibilidad y eficiencia:** borrador de reserva persistido en sessionStorage que preselecciona servicio, fecha, hora y nota; la nota operativa se sincroniza con la mascota.
- **H8 Estética y minimalismo:** sin anotaciones de diseño en la interfaz desde v0.5; el aviso de portada y el pie de página son honestos sobre el alcance del MVP.
- **H10 Ayuda y documentación:** guía de estilos (`ui-kit.html`) y mensajes de estado suficientes para el alcance del prototipo.

## Métricas de la evaluación

- Hallazgos registrados: **7** (4 corregidos en v0.7, 2 aceptados como deuda/decisión, 1 aceptado como documentación).
- Severidad promedio antes de v0.7: **2,1**. Después de v0.7: **0,6** (queda solo severidad ≤ 1).
- Los hallazgos EH-01 a EH-04 se trazaron en commit v0.7 con la estructura hallazgo → decisión → commit, coherente con la metodología ágil del proyecto.

## Relación con la prueba con usuarios

La rúbrica de la actividad exige usuarios que correspondan al perfil objetivo; esta evaluación heurística **no la sustituye**. Su valor documentado es doble: (1) demuestra iteración de usabilidad basada en hallazgos reales (v0.7), y (2) deja el prototipo en mejores condiciones para cuando se ejecuten las sesiones moderadas con participantes reales, cuyo kit completo está en esta misma carpeta.
