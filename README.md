# PetCare — Prototipo UX/UI académico

Repositorio preparado para la actividad de diseño visual, prototipado y maquetación inicial de PetCare.

## Convención local de trabajo

En el entorno nanoHexalia, este proyecto debe mantenerse bajo la raíz canónica de aplicaciones:

```text
/mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
```

No se debe mantener la copia de trabajo activa en `Descargas/` ni en otra ubicación paralela. El repositorio GitHub sigue siendo la fuente remota; la carpeta anterior es la ubicación local gobernada para desarrollo, pruebas y revisión.

## Alcance

Este repositorio **no implementa lógica de negocio ni backend**. Contiene una maquetación navegable HTML/CSS/JS orientada a validar arquitectura de información, UX/UI, accesibilidad y coherencia con el MVP de la Actividad 1.

## Ejecutar localmente

Desde la ruta canónica:

```bash
cd /mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
python3 scripts/serve.py
```

El puerto por defecto es `4173`, pero puede cambiarse sin editar código:

```bash
cd /mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
PORT=8080 python3 scripts/serve.py
```

Abrir `http://127.0.0.1:4173`.

## Rutas principales

- `/index.html` — Login y selección de rol.
- `/registro.html` — Registro.
- `/dashboard-propietario.html` — Panel propietario.
- `/buscar.html` → `/resultados.html` → `/servicio.html` → `/reservar.html` → `/revisar.html` → `/estado.html` — flujo principal de reserva.
- `/mascotas.html`, `/historial.html` — gestión de información del propietario.
- `/dashboard-proveedor.html`, `/solicitudes.html`, `/solicitud.html`, `/agenda.html`, `/catalogo.html` — flujo del proveedor.
- `/ui-kit.html` — guía de estilos visual implementada.

## Figma

La carpeta `figma/` contiene tokens de diseño y un UIKit SVG importable. El objetivo es mantener una sola semántica visual entre Figma y HTML/CSS.

## Publicación

Se incluye un workflow **manual** para GitHub Pages (`workflow_dispatch`). No publica automáticamente al hacer push. Antes de ejecutarlo, revisar `docs/PRE_PUBLISH_CHECKLIST.md`, probar la maquetación localmente y completar las pruebas de usabilidad con participantes reales.
