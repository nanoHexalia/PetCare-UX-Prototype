# Registro de iteracion V2 · SIMULACION ACADÉMICA (NO evidencia real)

> AVISO DE INTEGRIDAD: decisiones de diseno a partir de datos SIMULADOS. Se muestran como ejemplo del formato y como banco de decisiones candidatas. Ninguna se implementa como "validada por usuarios" hasta que las pruebas reales la confirmen (o la refuten). Si una friccion real coincide con una de estas, se referencia el hallazgo real, no esta simulacion.

| ID | Hallazgo (simulado) | Severidad | Decision de diseno V2 | Pantalla(s) | Captura V1 | Captura V2 | Figma | HTML/CSS |
|---|---|---|---|---|---|---|---|---|
| H-01 | Doble confirmacion Reservar -> Revisar confunde; 1 abandono en T4 (P-01, P-02, P-04) | Alta | Fusionar el resumen dentro de Reservar como bloque persistente y renombrar la accion final a 'Enviar solicitud' unica; Revisar queda como paso de solo lectura antes del envio o se elimina | reservar.html, revisar.html | capturas/v1-t4.png | capturas/v2-t4.png | [ ] | [ ] |
| H-02 | 'Franja' no se entiende (P-01, P-03) | Media | Renombrar etiqueta a 'Hora del dia' con opciones Manana/Tarde/Noche | buscar.html | capturas/v1-franja.png | capturas/v2-franja.png | [ ] | [ ] |
| H-03 | 'Perfil completo' se interpreta como verificacion (P-04); riesgo BR-12 | Alta | Cambiar el rotulo a 'Informacion completa del perfil' y anadir tooltip 'No implica verificacion por PetCare' | servicio.html, resultados.html | capturas/v1-perfil.png | capturas/v2-perfil.png | [ ] | [ ] |
| H-04 | 'Crear cuenta' poco visible (P-02) | Media | Elevar el enlace a boton secundario bajo el boton de entrar | index.html | capturas/v1-login.png | capturas/v2-login.png | [ ] | [ ] |
| H-05 | Bloqueo vs desactivar en Agenda (P-06) | Media | Anadir texto de ayuda contextual en el formulario de bloqueo y microcopy consistente en Catalogo | agenda.html, catalogo.html | capturas/v1-agenda.png | capturas/v2-agenda.png | [ ] | [ ] |
| H-06 | Expectativa de contacto directo (P-06); tension con BR-13 | Baja | No cambiar; documentar como decision de minimizacion de datos y nota de backlog | solicitud.html | n/a | n/a | n/a | n/a |

## Criterio de cierre (aplica igual en la version real)
- H-01 a H-05 (alta/media) aplicadas en AMBOS medios (Figma y HTML/CSS) con captura antes/despues.
- H-06 documentado como decision consciente respaldada por BR-13.
- El prototipo reconectado en Figma refleja la V2.
