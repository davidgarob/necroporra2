// =====================================================================
// NECROPORRA - CÁLCULOS (sin HTML). Depende de datos.js.
// No hace falta tocar este archivo para actualizar resultados.
// =====================================================================

const AÑOS = Object.keys(PORRAS).map(Number).sort((a, b) => a - b);

const JUGADORES = (() => {
  const lista = [];
  for (const a of AÑOS) {
    for (const j of Object.keys(PORRAS[a].jugadores)) {
      if (!lista.includes(j)) lista.push(j);
    }
  }
  return lista;
})();

// ---------- Utilidades básicas ----------

function famoso(id) {
  const f = FAMOSOS[id];
  if (!f) throw new Error("Famoso no definido en FAMOSOS: " + id);
  return f;
}

// Edad que tenía (o habría tenido) en el año de la porra.
// Si el famoso tiene "fallecio" y ya había muerto, la edad se congela ahí.
function edadEn(id, año) {
  const f = famoso(id);
  const tope = f.fallecio ? Math.min(año, f.fallecio) : año;
  return tope - f.nac;
}

function jugadoresDe(año) { return Object.keys(PORRAS[año].jugadores); }
function seleccionesDe(año, j) { return PORRAS[año].jugadores[j] || []; }
function aciertosDe(año, j) {
  return seleccionesDe(año, j).filter(id => PORRAS[año].muertos.includes(id));
}

function media(nums) {
  return nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : null;
}

// ---------- Resultados de un año ----------

function rankingDe(año) {
  return jugadoresDe(año)
    .map(j => ({ nombre: j, puntos: aciertosDe(año, j).length }))
    .sort((a, b) => b.puntos - a.puntos);
}

// Sin desempate: si empatan en lo más alto, ganan todos. Con 0 puntos no gana nadie.
function ganadoresDe(año) {
  const r = rankingDe(año);
  const max = r[0].puntos;
  return max > 0 ? r.filter(x => x.puntos === max).map(x => x.nombre) : [];
}

// Cuchara de madera: último puesto en solitario (sin empate en la cola).
function cucharaDe(año) {
  const r = rankingDe(año);
  const min = r[r.length - 1].puntos;
  const ultimos = r.filter(x => x.puntos === min);
  return ultimos.length === 1 && min < r[0].puntos ? ultimos[0].nombre : null;
}

// ---------- Estadísticas por jugador (global) ----------

const TRAMOS = ["≤ 50", "51–75", "76–100", "> 100"];
function tramoDe(edad) {
  if (edad <= 50) return "≤ 50";
  if (edad <= 75) return "51–75";
  if (edad <= 100) return "76–100";
  return "> 100";
}

function estadisticasJugador(j) {
  const años = AÑOS.filter(a => PORRAS[a].jugadores[j]);
  const s = {
    jugador: j,
    selecciones: 0, aciertos: 0, victorias: 0, cucharas: 0,
    mejorRacha: 0,
    tramos: Object.fromEntries(TRAMOS.map(t => [t, 0])),
    edades: [],
    mediasAnuales: [],     // {año, media}
    aciertosAnuales: [],   // {año, n}
    aciertosLista: [],     // {id, año, edad}
    repeticiones: {},      // id -> veces elegido
  };

  let racha = 0;
  for (const a of AÑOS) {
    if (!PORRAS[a].jugadores[j]) { racha = 0; continue; }
    const ids = seleccionesDe(a, j);
    const edades = ids.map(id => edadEn(id, a));
    const hits = aciertosDe(a, j);

    s.selecciones += ids.length;
    s.aciertos += hits.length;
    s.edades.push(...edades);
    edades.forEach(e => s.tramos[tramoDe(e)]++);
    s.mediasAnuales.push({ año: a, media: media(edades) });
    s.aciertosAnuales.push({ año: a, n: hits.length });
    hits.forEach(id => s.aciertosLista.push({ id, año: a, edad: edadEn(id, a) }));
    ids.forEach(id => { s.repeticiones[id] = (s.repeticiones[id] || 0) + 1; });

    // Victorias, rachas y cucharas solo cuentan en años cerrados
    if (PORRAS[a].cerrado) {
      if (ganadoresDe(a).includes(j)) { s.victorias++; racha++; s.mejorRacha = Math.max(s.mejorRacha, racha); }
      else racha = 0;
      if (cucharaDe(a) === j) s.cucharas++;
    }
  }

  s.edadMedia = media(s.edades);
  s.pctAciertos = s.selecciones ? (s.aciertos / s.selecciones) * 100 : null;
  s.pctTramos = Object.fromEntries(
    TRAMOS.map(t => [t, s.selecciones ? (s.tramos[t] / s.selecciones) * 100 : 0])
  );

  const ordenadas = [...s.mediasAnuales].sort((x, y) => x.media - y.media);
  s.mediaMasBaja = ordenadas[0];
  s.mediaMasAlta = ordenadas[ordenadas.length - 1];

  const maxN = Math.max(...s.aciertosAnuales.map(x => x.n));
  s.mejorAño = { n: maxN, años: s.aciertosAnuales.filter(x => x.n === maxN).map(x => x.año) };

  const maxRep = Math.max(...Object.values(s.repeticiones));
  s.masRepetido = {
    veces: maxRep,
    ids: Object.keys(s.repeticiones).filter(id => s.repeticiones[id] === maxRep),
  };

  if (s.aciertosLista.length) {
    // Con empate a edad se devuelven todos los aciertos empatados
    const edades = s.aciertosLista.map(x => x.edad);
    const minE = Math.min(...edades), maxE = Math.max(...edades);
    s.aciertoJoven = s.aciertosLista.filter(x => x.edad === minE);
    s.aciertoMayor = s.aciertosLista.filter(x => x.edad === maxE);
  }
  return s;
}

function estadisticasGlobales() {
  return JUGADORES.map(estadisticasJugador);
}

// Famosos más elegidos en total (cada jugador-año cuenta una vez)
function masElegidos() {
  const cuenta = {};
  for (const a of AÑOS) {
    for (const j of jugadoresDe(a)) {
      seleccionesDe(a, j).forEach(id => { cuenta[id] = (cuenta[id] || 0) + 1; });
    }
  }
  const max = Math.max(...Object.values(cuenta));
  return { veces: max, ids: Object.keys(cuenta).filter(id => cuenta[id] === max) };
}

// Elegidos por TODOS los jugadores en algún momento
function losGrandes() {
  const porJugador = JUGADORES.map(j => {
    const set = new Set();
    for (const a of AÑOS) seleccionesDe(a, j).forEach(id => set.add(id));
    return set;
  });
  return [...porJugador[0]].filter(id => porJugador.every(s => s.has(id)));
}

// ---------- Comprobación de datos ----------
// Devuelve una lista de avisos (vacía si todo está bien).
function validarDatos() {
  const avisos = [];
  for (const a of AÑOS) {
    const elegidos = new Set();
    for (const j of jugadoresDe(a)) {
      const ids = seleccionesDe(a, j);
      if (ids.length !== 10) avisos.push(`${a} ${j}: tiene ${ids.length} selecciones (se esperaban 10)`);
      if (new Set(ids).size !== ids.length) avisos.push(`${a} ${j}: tiene famosos repetidos`);
      ids.forEach(id => { elegidos.add(id); if (!FAMOSOS[id]) avisos.push(`${a} ${j}: id desconocido "${id}"`); });
    }
    PORRAS[a].muertos.forEach(id => {
      if (!FAMOSOS[id]) avisos.push(`${a}: muerto con id desconocido "${id}"`);
      else if (!elegidos.has(id)) avisos.push(`${a}: "${id}" figura como muerto pero nadie lo eligió`);
    });
  }
  return avisos;
}

if (typeof module !== "undefined") {
  module.exports = { AÑOS, JUGADORES };
}
