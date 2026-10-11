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
