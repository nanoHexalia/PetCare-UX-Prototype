# Estado Figma — Actividad 2

Archivo Figma:
https://www.figma.com/design/8Oa7Av5IlFacpx3ZK76Dlw

## Restricción del plan y decisión

La cuenta conectada utiliza Figma Starter, que permite hasta 3 páginas por archivo. Para evitar duplicaciones, deuda o exigir un cambio de plan, la estructura académica prevista en 8 páginas se consolidó en 3 páginas funcionales:

1. `00 Cover + UIKit`
2. `01 Wireframes + UI`
3. `02 Prototype + Flow + Usability`

La consolidación conserva todos los bloques requeridos por la actividad y no cambia el alcance del entregable.

## Construido

### 00 Cover + UIKit
- Portada académica.
- Foundations.
- 25 variables locales para color, espaciado y radios.
- 5 estilos tipográficos locales.
- Componentes reutilizables:
  - Button/Primary
  - Button/Secondary
  - Button/Destructive
  - Input/Default
  - Card/Standard
  - Badge/Requested
- Layouts genéricos A/B/C.
- Fuente validada: Inter.
- 73 nodos descendientes / 44 nodos de texto.

### 01 Wireframes + UI
- 15 wireframes trazados a RF/HU.
- Flujo Propietario: Login, Registro, Dashboard, Buscar, Resultados, Servicio, Reservar, Revisar, Estado y Mascotas.
- Flujo Proveedor: Dashboard, Solicitudes, Gestionar solicitud, Agenda y Catálogo.
- Fuente validada: Inter.
- 177 nodos descendientes / 49 nodos de texto.

### 02 Prototype + Flow + Usability
- Flujo crítico Propietario.
- Flujo crítico Proveedor.
- Customer Journey aplicado.
- Estructura de evidencia V1 → observación real → decisión → V2.
- Gate explícito antes de high fidelity.
- Fuente validada: Inter.
- 93 nodos descendientes / 61 nodos de texto.

## Estado del WIP

`A2-WIP-02 · Figma UIKit, componentes y wireframes`

Estado actual: **CONSTRUIDO / PENDIENTE DE REVISIÓN VISUAL DEL USUARIO**.

No se abre high fidelity ni pruebas de usabilidad hasta cerrar este gate.


## Entorno de revisión visual

- Brave normal revalidado con aceleración gráfica sobre la GPU integrada AMD Radeon 780M / Phoenix.
- Proceso GPU: `--render-node-override=/dev/dri/renderD128`.
- `GL_VENDOR`: Google Inc. (AMD).
- `GL_RENDERER`: ANGLE sobre AMD Radeon 780M Graphics (radeonsi phoenix ACO).
- Figma abrió correctamente con WebGL/WebGL2 acelerados en la ruta AMD.
- La RTX 4060 queda fuera de la ruta gráfica de Brave para este flujo.
- El warning de EGL/WebGPU observado durante el arranque no bloqueó el runtime OpenGL/WebGL validado y no se interviene dentro de este WIP.

Estado del blocker WebGL/GPU: **PASS**.


## Canonicalización Brave AMD

- Launcher visible canónico: `brave-amd.desktop`.
- Launcher anterior: oculto con `NoDisplay=true`.
- HTTP/HTTPS/text-html: asociados a `brave-amd.desktop`.
- Wrapper operativo: `~/.local/bin/brave-amd`.
- Rollback local registrado por el usuario en `~/.local/state/brave-amd-finalize-20261011_104055`.
- Resultado: `BRAVE_AMD_CANONICALIZED`.

Estado del entorno Figma/Brave: **PASS**.
