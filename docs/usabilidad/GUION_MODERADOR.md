# Guion del moderador · pruebas de usabilidad PetCare

Reglas del moderador:
- No ayudar, no insinuar, no usar la palabra "facil" o "obvio".
- Pedir think-aloud: "piensa en voz alta mientras lo haces".
- Silencio ante preguntas del participante: responder "hazlo como lo harías en casa".
- Si hay bloqueo total por mas de 2 minutos en una tarea, marcarla como fallo y dar un minimo empujon neutro antes de avanzar.

## Apertura (3 min, leer tal cual)
"Bienvenido y gracias. Vamos a probar un prototipo academico de una plataforma para coordinar servicios para mascotas. No es un examen: estamos probando el diseno, no a ti. Si algo no se entiende, eso es exactamente lo que necesitamos saber. Te voy a pedir que pienses en voz alta mientras lo usas. Todo lo que digas sera util."

Consentimiento firmado, formulario de perfil y (si es remoto) grabacion de pantalla con permiso verbal explícito.

## Tareas · perfil PROPIETARIO (5 tareas criticas, RNF-USAB-01)

T1 · Registro de cuenta (index.html / registro)
"Quieres entrar a esta plataforma por primera vez. Crea una cuenta como propietario con tus datos."
Exito: completa registro y llega al panel del propietario.

T2 · Registro de mascota (mascotas.html)
"Ya dentro: agrega tu mascota con sus datos basicos."
Exito: crea la mascota con nombre y especie.

T3 · Busqueda de servicio (buscar.html / resultados.html)
"Encuentra un servicio de veterinaria para el 5 de octubre en Medellin y abre la ficha de uno que te genere confianza."
Exito: aplica filtros, llega a resultados y abre una ficha.

T4 · Solicitud de reserva (servicio.html / reservar.html / revisar.html)
"Solicita una reserva para tu mascota en el horario que prefieras."
Exito: elige slot, completa el resumen y envia la solicitud.

T5 · Consulta de estado (estado.html)
"Revisa en que estado quedo tu solicitud."
Exito: encuentra la pantalla de estado y dice el estado en palabras propias.

Extra (si hay tiempo): cancelar la solicitud y verificar que el estado cambio a Cancelada.

## Tareas · perfil PROVEEDOR (3 tareas)

T1 · Gestion de solicitud (solicitudes.html / solicitud.html)
"Entra como proveedor, revisa las solicitudes pendientes y confirma la de Luna."
Exito: lista solicitudes y ejecuta Confirmar.

T2 · Configuracion de agenda (agenda.html)
"Bloquea un horario de la agenda para la tarde del martes."
Exito: crea el bloqueo y el slot deja de mostrarse como disponible.

T3 · Catalogo (catalogo.html)
"Desactiva el servicio Paseo urbano sin borrarlo."
Exito: desactiva el servicio y el historial no se pierde.

## Cierre (3 min)
1. Cuestionario SUS (10 items).
2. Preguntas abiertas:
   - Que fue lo mas facil?
   - Que fue lo mas dificil o confuso?
   - Algo que cambiarias antes de que esto saliera a internet?
3. Agradecer y cerrar.
