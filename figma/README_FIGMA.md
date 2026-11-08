# Importar a Figma (paquete correctivo A2-WIP-02 · 2026-11-08)

Archivo Figma canonico: https://www.figma.com/design/8Oa7Av5IlFacpx3ZK76Dlw
Estructura vigente de 3 paginas (limite del plan Starter): 00 Cover + UIKit · 01 Wireframes + UI · 02 Prototype + Flow + Usability.

Este paquete cierra los gaps de la revision visual del 2026-10-11. Los SVG se importan a Figma (arrastrar al lienzo o File > Import) y quedan como vectores editables; tipografia de referencia: Inter.

## Que contiene y donde va cada archivo

| Archivo | Pagina destino | Uso |
|---|---|---|
| PetCare_UI_Kit_v0.2.svg | 00 Cover + UIKit | UIKit operativo: select, textarea, checkbox/radio, navegacion (topbar/sidebar), 5 estados de reserva, tabla desktop + tarjeta mobile, patrones de feedback (info/exito/error/vacio) y foco accesible. |
| wireframes/01..16 *.svg | 01 Wireframes + UI | 16 wireframes reales por pantalla: composicion de controles, jerarquia, navegacion y acciones por caso, con traza RF/HU y reglas BR/RNF anotadas. Reemplazan los placeholders genericos. |
| PetCare_UserFlow_v1.svg | 02 Prototype + Flow + Usability | User Flow con conectores, rombos de decision y guardas etiquetadas (BR-05/06/08/09/10). |
| PetCare_CJM_v1.svg | 02 Prototype + Flow + Usability | Customer Journey Map desarrollado: acciones, necesidades/pensamientos, touchpoints, friccion, oportunidades y curva emocional marcada como hipotesis. |

## Pasos sugeridos en Figma

1. En 00, importar el UIKit v0.2 junto al actual; convertir los componentes nuevos (Select, Textarea, Checkbox, Radio, Nav/Top, Sidebar, Badge x5, Table, Card, Notice) en componentes.
2. En 01, importar los 16 wireframes, agrupar por flujo (Propietario 01-11, Proveedor 12-16) y eliminar los placeholders genericos.
3. En 02, importar User Flow y CJM; conectar el prototipo navegable segun los rombos de decision del User Flow.
4. Mantener las variables locales ya creadas (25 variables de tokens) y alinearlas con design-tokens.json.
5. Sincronizar cualquier cambio con la maquetacion HTML/CSS: el HTML ya implementa estos mismos patrones (ui-kit.html y las 16 paginas).
