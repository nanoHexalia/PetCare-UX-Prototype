# MVP funcional · Actividad 3 · PetCare

## Funcionalidad principal implementada

Reserva de servicios con ciclo completo de estados entre los dos roles del MVP:

1. El propietario elige servicio, mascota y horario (servicio.html → reservar.html).
2. Revisa el resumen real y envía la solicitud, que queda en estado Solicitada (revisar.html).
3. El proveedor ve la solicitud en su bandeja y la confirma o rechaza (solicitudes.html → solicitud.html).
4. La reserva confirmada aparece en la agenda del proveedor (agenda.html).
5. El propietario sigue el estado con línea de tiempo y puede cancelar mientras no esté completada (estado.html), y consulta el historial real (historial.html).

## Mecanismo de manejo y persistencia de datos

- Almacenamiento: `localStorage` del navegador (clave `petcare_db_v1`), sin backend. La actividad permite "conexión básica entre frontend y backend O implementar un mecanismo de manejo y persistencia de datos"; se eligió la segunda opción.
- Semilla inicial: 4 mascotas, 5 servicios del catálogo, 4 horarios diarios y 3 reservas de ejemplo (Confirmada, Solicitada y Completada) para que ninguna vista arranque vacía.
- Borrador de reserva en curso: `sessionStorage` (clave `petcare_draft_v1`).
- Consola del navegador: `__petcare.reset()` reinicia los datos de demostración; `__petcare.db()` inspecciona el estado.

## Estados y reglas

- Estados: Solicitada, Confirmada, Rechazada, Cancelada, Completada (mismos cinco del UIKit, siempre texto + color, RNF-USAB-02).
- Guarda BR-06 (conflictos de horario): no se puede confirmar una solicitud si ya existe una reserva Confirmada en la misma fecha y hora; tampoco se puede crear una solicitud en un horario ya confirmado.
- Cancelación: disponible solo en estados Solicitada y Confirmada.
- Cada cambio registra marca temporal (creado / actualizado).

## Trazabilidad

- Coherencia con la Actividad 2: mismas 16 pantallas, misma guía de estilos (tokens compartidos), mismos badges y patrones de feedback; la estructura visual no se modificó.
- La implementación vive en `site/assets/js/app.js` y activa las vistas existentes sin alterar el HTML.
- Trazabilidad de requisitos: RF-06 (reservar), RF-07 (estado), RF-09 (historial), RF-11 (solicitudes), RF-12 (agenda); HU-05, HU-06, HU-07, HU-10, HU-11.

## Cómo probar (guion rápido)

1. Abrir la URL pública e iniciar sesión con las credenciales demo.
2. Como propietario: Buscar servicios → elegir proveedor → Continuar → elegir servicio, mascota y horario → Revisar solicitud → marcar la casilla → Enviar solicitud. Debe aparecer en Reservas con badge Solicitada.
3. Como proveedor: Solicitudes → debe listar la nueva solicitud → Revisar → Confirmar. La bandeja queda vacía y la reserva pasa a Confirmada.
4. Verificar en Agenda: el horario aparece como Confirmada con servicio y mascota.
5. Volver a Reservas como propietario: línea de tiempo con Confirmada activa; Cancelar solicitud funciona mientras no esté completada.
6. Historial: tabla real con todas las reservas y sus estados.
7. Guarda BR-06: intentar confirmar dos solicitudes en la misma fecha y hora; la segunda debe bloquearse con aviso.

## Estado

- Implementación: COMMIT 2026-11-09 (app.js extendido, README y QA_STATUS actualizados).
- QA estático: PASS (sintaxis y lógica de persistencia).
- QA visual de flujo en navegador: PENDIENTE.
- Pruebas de usabilidad con perfiles objetivo: PENDIENTE (protocolo en docs/USABILITY_TEST_PROTOCOL.md).
