# Servicio local PetCare sin terminal dedicada

PetCare puede ejecutarse como un servicio `systemd --user` en el puerto local 4173. Esto evita mantener una terminal abierta.

## Instalar / actualizar el servicio

```bash
cd /mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
git pull --ff-only
bash scripts/install-user-service.sh
```

La instalación:

- exige la ruta canónica `nanoHexalia_APP/PetCare-UX-Prototype`;
- reutiliza `scripts/serve.py`;
- usa el puerto 4173 por defecto;
- detecta un servidor PetCare previo en ese puerto y lo sustituye;
- falla de forma cerrada si el puerto pertenece a otro proceso;
- habilita el servicio para futuros inicios de sesión;
- reinicia el proceso únicamente si falla;
- valida `/index.html` por HTTP antes de declarar éxito.

## Estado

```bash
systemctl --user status petcare-ux-prototype.service --no-pager
```

## Logs

```bash
journalctl --user -u petcare-ux-prototype.service -n 50 --no-pager
```

## Reiniciar

```bash
systemctl --user restart petcare-ux-prototype.service
```

## Detener

```bash
systemctl --user stop petcare-ux-prototype.service
```

## Desinstalar

```bash
cd /mnt/shadowlight/home/nanohexalia/nanoHexalia_APP/PetCare-UX-Prototype
bash scripts/uninstall-user-service.sh
```

> El servicio de usuario no requiere una terminal abierta. En una sesión de escritorio normal volverá a iniciarse con el usuario. Si más adelante se necesita que arranque incluso antes de iniciar sesión, eso debe habilitarse explícitamente mediante lingering y se tratará como una decisión operativa separada.
