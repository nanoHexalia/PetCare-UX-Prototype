# Estado Figma — Actividad 2

Archivo Figma:
https://www.figma.com/design/8Oa7Av5IlFacpx3ZK76Dlw

## Restricción del plan y decisión

La cuenta conectada utiliza Figma Starter, que permite hasta 3 páginas por archivo. Estructura consolidada vigente:

1. `00 Cover + UIKit`
2. `01 Wireframes + UI`
3. `02 Prototype + Flow + Usability`

## Actualización — 2026-11-08 (paquete correctivo A2-WIP-02)

Ante el límite de llamadas del Figma MCP (plan Starter), el correctivo del WIP se produjo como paquete de SVG importables en `figma/`, listos para montarse sobre el archivo canónico sin duplicar fuente:

- `figma/PetCare_UI_Kit_v0.2.svg`: UIKit operativo mínimo (cierra el PASS parcial de 00: select, textarea, checkbox/radio, navegación, 5 estados de reserva, tabla/tarjeta responsive, patrones de feedback, foco accesible).
- `figma/wireframes/`: 16 wireframes reales por pantalla, trazados a RF/HU con reglas BR/RNF anotadas (cierra el FAIL de 01: composición real de controles, jerarquía, navegación y acciones por caso).
- `figma/PetCare_UserFlow_v1.svg`: User Flow con conectores, decisiones y guardas etiquetadas (cierra parte del FAIL de 02).
- `figma/PetCare_CJM_v1.svg`: Customer Journey Map con acciones, necesidades/pensamientos, touchpoints, fricción, oportunidades y curva emocional marcada como hipótesis (cierra el resto del FAIL de 02).

Pendiente para cerrar `A2-WIP-02`:
1. Importar el paquete a las 3 páginas del archivo canónico (pasos en `figma/README_FIGMA.md`).
2. Reconectar el prototipo navegable según el User Flow v1.
3. Revisión visual final del usuario = PASS.

Después del gate: pruebas de usabilidad reales con perfiles objetivo (protocolo en `docs/USABILITY_TEST_PROTOCOL.md`), iteración V2 trazada y maquetación sincronizada.

## Historial

- 2026-10-11: revisión visual con resultados 00 PASS parcial, 01 FAIL, 02 FAIL; gate ABIERTO; entorno Brave/AMD PASS (detalle en commits previos).
