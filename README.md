# Necroporra 🪦

Web de la necroporra entre amigos: cada año, cada jugador elige 10 famosos y suma un punto por cada uno que muere.

## Archivos

- `index.html`: la página (no hace falta tocarla para actualizar resultados).
- `datos.js`: **los datos**. Es el único archivo que se edita en el día a día.
- `stats.js`: los cálculos (rankings, victorias, cucharas, estadísticas globales).

Los tres tienen que estar en la misma carpeta.

## Cómo se actualiza

**Ha muerto alguien:** en `datos.js`, dentro de `PORRAS`, añade su id a la lista `muertos` del año correspondiente.

**Nuevo famoso en una porra:** añádelo una sola vez en `FAMOSOS` (id, nombre y año de nacimiento) y usa su id en la lista del jugador. Si ya existía de otros años, reutiliza su id.

**Empieza un año nuevo:** copia el bloque del año anterior en `PORRAS`, cambia los jugadores y deja `muertos: []`.

**Termina el año:** pon `cerrado: true`. Hasta entonces, sus victorias, rachas y cucharas no cuentan en las estadísticas globales.

## Reglas

- Si hay empate en el primer puesto, ganan todos los empatados. Con 0 puntos no gana nadie.
- Cuchara de madera: último puesto en solitario (si hay empate en la cola, nadie la recibe).
- La edad de cada famoso se calcula como año de la porra menos año de nacimiento.

## Comprobación

Si algo falta (un id mal escrito, un jugador sin 10 famosos…), aparece un aviso amarillo arriba de la web.
