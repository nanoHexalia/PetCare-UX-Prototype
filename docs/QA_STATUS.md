# Estado de QA — PetCare Actividad 2

## Estado actual

- Repositorio GitHub: operativo.
- Ruta local canónica: `/mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype`.
- Servicio local: `petcare-ux-prototype.service`.
- URL local: `http://127.0.0.1:4173`.
- QA estructural de las 17 páginas HTML: **PASS**.
- Ejecución validada: `HTML_PAGES=17`, `HTML_FAILURES=0`, `QA_STATIC=PASS`.
- Correctivos semánticos de H1 aplicados y verificados en `index.html`, `registro.html` y `ui-kit.html`.
- Vistas desktop ya inspeccionadas por el usuario: acceso, registro, dashboards, búsqueda, mascotas, estado, historial, solicitudes, agenda y catálogo.
- Defecto UIKit de ancho: corregido en `f64d7a0`.
- UIKit corregido: **PASS visual desktop**.
- Vistas desktop de resultados, servicio, reservar, revisar y solicitud: **PASS visual**.
- Correctivo de microcopy aplicado tras la revisión: se retiró una afirmación de verificación no sustentada en el demo y se sustituyó lenguaje técnico visible al usuario.
- Gate visual desktop V1: **PASS**.
- Responsive 768 px: **PASS visual** en las 12 capturas críticas.
- Responsive 360 px: **PASS visual** en las 12 vistas críticas.
- Solicitudes móviles revalidadas tras conversión a tarjetas: Estado y Acción quedan visibles sin scroll horizontal.
- Gate responsive V1: **PASS**.

## QA automatizado estructural

Ejecutar:

```bash
cd /mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
python3 scripts/qa_static.py
```

El script verifica:

- `lang=es`;
- meta viewport;
- título no vacío;
- exactamente un H1 por página;
- `main#main`;
- skip link;
- labels de controles de formulario;
- enlaces y assets internos;
- presencia de breakpoints 900/640;
- foco visible;
- reduced motion;
- soporte mínimo declarado de 360 px.

Resultado vigente: **PASS**.

Este control **no reemplaza** la revisión visual real ni la prueba de usabilidad.

## Gate visual pendiente

Desktop: **PASS**

Responsive:
- 768 px: **PASS**
- 360 px: **PASS**

## Gate de actividad

No publicar GitHub Pages hasta completar:

1. Figma UIKit y componentes;
2. wireframes;
3. prototipo interactivo;
4. pruebas reales con usuarios objetivo;
5. iteración V2;
6. sincronización Figma ↔ HTML/CSS;
7. QA responsive/accesibilidad;
8. PDF final.

## Cierre de A2-WIP-01

Resultado final:

- QA estructural: **PASS (17/17 páginas)**.
- QA visual desktop: **PASS**.
- QA responsive 768 px: **PASS**.
- QA responsive 360 px: **PASS**.

A2-WIP-01 queda cerrado. El siguiente WIP autorizado es Figma/UIKit + componentes + wireframes.

## MVP funcional · Actividad 3 (2026-11-09)

Funcionalidad principal implementada: reserva de servicios con ciclo completo de estados, persistencia en `localStorage` (sin backend).

- Capa de datos: `site/assets/js/app.js` (semilla con 4 mascotas, 5 servicios del catálogo y 3 reservas de ejemplo en los estados Confirmada, Solicitada y Completada).
- Propietario: selección real de servicio, mascota y horario (reservar), creación de la solicitud (revisar), seguimiento con línea de tiempo y cancelación (estado), historial real.
- Proveedor: bandeja de solicitudes reales (solicitudes), confirmación o rechazo con guarda BR-06 de conflictos de horario (solicitud), agenda generada desde disponibilidad + reservas confirmadas (agenda).
- QA estático de sintaxis: `node --check` PASS; prueba de lógica de persistencia y semilla PASS (4 mascotas, 5 servicios, 3 reservas; persistencia verificada).
- QA visual y de flujo en navegador: PENDIENTE (próxima tanda).
- Pie de página actualizado por honestidad: "MVP local · datos persistidos en este navegador".

Herramienta de depuración en consola del navegador: `__petcare.reset()` reinicia los datos de demostración.

## QA visual del MVP en navegador · 2026-11-12 (realizado por el usuario)

Resultado global: **PASS**. Ejecutado sobre la URL pública con el MVP publicado.

- Fase 0 (arranque y login como propietario): PASS.
- Fase A (crear reserva: servicio, mascota, horario, revisión, envío): PASS.
- Fase B (proveedor: bandeja, revisión, confirmación, agenda): PASS.
- Fase C (guardas: BR-06 por horario duplicado, cancelación, historial): PASS.
- Fase D (persistencia tras F5/ Ctrl+Shift+R y cierre del navegador; responsive móvil): PASS.

Hallazgos del usuario convertidos en mejoras de UX (iteración v0.3, 2026-11-12):

1. Nota operativa sincronizada con la mascota: si la nota está vacía o es la nota por defecto de otra mascota, se actualiza automáticamente al cambiar de mascota (evita información operativa equivocada).
2. Horarios ya confirmados se muestran como opción deshabilitada "· ocupado" en el selector de horario (prevención de errores antes del envío, complementa la guarda BR-06 del envío).
3. Fecha y hora del borrador se preseleccionan al llegar desde la página del servicio; el selector de horario arranca en el día actual.
4. Cancelación en dos pasos (primer clic arma el botón, segundo confirma): prevención de errores en acción destructiva.
5. La página del servicio guarda también el servicio elegido (catId) para preseleccionarlo en el formulario de reserva.

QA de sintaxis y lógica de las mejoras: node --check PASS, prueba de persistencia PASS.

## Iteración v0.4 (2026-11-12): valores estáticos vencidos detectados en revisión del usuario

Hallazgo: la página de búsqueda mostraba una fecha demostrativa fija (2026-10-05) y los tableros y páginas de resultados/servicio conservaban fechas estáticas de la maqueta. Correcciones (todas activadas desde app.js, sin tocar HTML):

1. buscar.html: la fecha se preselecciona con el día actual y no permite elegir fechas pasadas (atributo min); el selector de servicio se llena con el catálogo real ("Todos los servicios" + 5 servicios con proveedor).
2. dashboard-propietario: la tarjeta "Próxima reserva" muestra la próxima reserva real (fecha, hora, servicio y badge de estado); si no hay, mensaje honesto.
3. dashboard-proveedor: la tarjeta "Solicitud más próxima" muestra la solicitud pendiente real; si no hay, mensaje honesto.
4. resultados.html y servicio.html: los textos demostrativos "05 oct" se muestran como la fecha de mañana.

QA: node --check PASS, prueba de lógica de semilla/persistencia PASS. QA visual en navegador: pendiente de verificación por el usuario tras republicar Pages.

## Iteración v0.5 (2026-11-12): pulido de producto, sin anotaciones de diseño en la interfaz

Hallazgo del usuario: las páginas mostraban mensajes de criterio de diseño (p. ej. "UX: filtros esenciales visibles...") y códigos de trazabilidad, propios de la etapa de prototipo, que no deben verse en un producto entrando a operación.

Correcciones:

1. buscar.html: eliminada la nota de criterio UX.
2. index.html: la notificación "Prototipo demostrativo... no implementa reservas reales" era además deshonesta tras el MVP; ahora dice "Prototipo académico. El flujo de reserva de servicios funciona con persistencia local en este navegador; no implementa autenticación ni pagos reales."
3. app.js: en todas las páginas de producto se eliminan los ojos de página con códigos RF/HU/BR/RNF y cualquier nota "UX:"/"IxD:"; la guía de estilos (ui-kit.html) los conserva por ser documentación del sistema de diseño.
4. La trazabilidad requisitos-pantallas sigue documentada en docs/TRACEABILITY.md, los wireframes de Figma y el informe, no en la interfaz de usuario.

QA: node --check PASS. Verificación visual tras republicar Pages: pendiente del usuario.
