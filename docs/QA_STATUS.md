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
- Responsive físico: pendiente en 768 px y 360 px.

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
- recorrido crítico propietario a 768 px;
- recorrido crítico propietario a 360 px;
- dashboard/solicitudes/agenda proveedor a 768 px;
- dashboard/solicitudes/agenda proveedor a 360 px.

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
