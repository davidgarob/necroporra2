// =====================================================================
// NECROPORRA - DATOS
// Este es el único archivo que hay que tocar para actualizar la web.
//
//  1) FAMOSOS: cada persona aparece UNA sola vez, con su año de nacimiento.
//     dudoso: true  -> el año de nacimiento es una estimación, confirmar.
//  2) PORRAS: por año, qué ids eligió cada jugador y quiénes han muerto.
//     cerrado: true -> año terminado (cuenta para victorias, rachas, cucharas).
//
// Para añadir un fallecido: pon su id en "muertos" del año correspondiente.
// La edad se calcula sola: año de la porra - año de nacimiento.
// =====================================================================

const FAMOSOS = {
  // ---- 2021 ----
  buzz_aldrin:            { nombre: "Buzz Aldrin", nac: 1930 },
  juan_carlos_i:          { nombre: "Juan Carlos I", nac: 1938 },
  isabel_ii:              { nombre: "Isabel II", nac: 1926 },
  pele:                   { nombre: "Pelé", nac: 1940 },
  val_kilmer:             { nombre: "Val Kilmer", nac: 1959 },
  willie_nelson:          { nombre: "Willie Nelson", nac: 1933 },
  coppola:                { nombre: "Francis Ford Coppola", nac: 1939 },
  carmen_sevilla:         { nombre: "Carmen Sevilla", nac: 1930 },
  berlusconi:             { nombre: "Silvio Berlusconi", nac: 1936 },
  marichalar:             { nombre: "Jaime de Marichalar", nac: 1963 },
  kane_tanaka:            { nombre: "Kane Tanaka", nac: 1903 },
  enrique_san_francisco:  { nombre: "Enrique San Francisco", nac: 1955 },
  schumacher:             { nombre: "Michael Schumacher", nac: 1969 },
  sofia_grecia:           { nombre: "Sofía de Grecia", nac: 1938 },
  araceli_hidalgo:        { nombre: "Araceli Hidalgo", nac: 1920,},
  miguel_bose:            { nombre: "Miguel Bosé", nac: 1956 },
  jordi_enp:              { nombre: "Jordi ENP", nac: 1994, },
  chispas:                { nombre: "Chispas", nac: 2016, },
  miyamoto:               { nombre: "Shigeru Miyamoto", nac: 1952 },
  charlie_sheen:          { nombre: "Charlie Sheen", nac: 1965 },
  billie_eilish:          { nombre: "Billie Eilish", nac: 2001 },
  xi_jinping:             { nombre: "Xi Jinping", nac: 1953 },
  snoop_dogg:             { nombre: "Snoop Dogg", nac: 1971 },
  de_niro:                { nombre: "Robert De Niro", nac: 1943 },
  schwarzenegger:         { nombre: "Arnold Schwarzenegger", nac: 1947 },
  juan_munoz:             { nombre: "Juan Muñoz", nac: 1953, },
  omar_alvarez:           { nombre: "Omar Álvarez", nac: 1987, },

  // ---- 2022 ----
  maxwell:                { nombre: "Ghislaine Maxwell", nac: 1961 },
  yoko_ono:               { nombre: "Yoko Ono", nac: 1933 },
  demi_lovato:            { nombre: "Demi Lovato", nac: 1992 },
  sixtynine:              { nombre: "Sixtynine", nac: 1996, },
  joe_exotic:             { nombre: "Joe Exotic", nac: 1963 },
  gary_busey:             { nombre: "Gary Busey", nac: 1944 },
  leticia_sabater:        { nombre: "Leticia Sabater", nac: 1966, },
  sabina:                 { nombre: "Joaquín Sabina", nac: 1949 },
  ignatius:               { nombre: "Ignatius Farray", nac: 1973, },
  clint_eastwood:         { nombre: "Clint Eastwood", nac: 1930 },
  papa_francisco:         { nombre: "Papa Francisco", nac: 1936 },
  mick_jagger:            { nombre: "Mick Jagger", nac: 1943 },
  ana_rosa:               { nombre: "Ana Rosa Quintana", nac: 1956 },
  manolo_bombo:           { nombre: "Manolo el del Bombo", nac: 1949, },
  jordi_hurtado:          { nombre: "Jordi Hurtado", nac: 1957 },
  orslok:                 { nombre: "Orslok", nac: 1995, },
  kottick:                { nombre: "Robert A. Kottick", nac: 1963, },
  pratibha_patil:         { nombre: "Pratibha Devisingh Patil", nac: 1934 },
  dalai_lama:             { nombre: "Dalai Lama XIV", nac: 1935 },
  waqa:                   { nombre: "Baron Divavesi Waqa", nac: 1959 },
  otoniel:                { nombre: "Dairo Antonio Úsuga (Otoniel)", nac: 1971 },
  akihito:                { nombre: "Akihito", nac: 1933 },
  ayuk_tabe:              { nombre: "Sisiku Julius Ayuk Tabe", nac: 1958 },
  camps:                  { nombre: "Francisco Camps", nac: 1962 },
  benedicto_xvi:          { nombre: "Benedicto XVI", nac: 1927 },
  resines:                { nombre: "Antonio Resines", nac: 1954 },
  dick_van_dyke:          { nombre: "Dick Van Dyke", nac: 1925 },
  jimmy_carter:           { nombre: "Jimmy Carter", nac: 1924 },
  amancio_ortega:         { nombre: "Amancio Ortega", nac: 1936 },
  serrat:                 { nombre: "Joan Manuel Serrat", nac: 1943 },

  // ---- 2023 ----
  hitler:                 { nombre: "Adolf Hitler", nac: 1965 }, // con "fallecio" la edad se congela en esa fecha
  aguirre:                { nombre: "Esperanza Aguirre", nac: 1952 },
  julian_munoz:           { nombre: "Julián Muñoz", nac: 1947,},
  arevalo:                { nombre: "Arévalo", nac: 1947, },
  depardieu:              { nombre: "Gérard Depardieu", nac: 1948 },
  biden:                  { nombre: "Joe Biden", nac: 1942 },
  concha_velasco:         { nombre: "Concha Velasco", nac: 1939 },
  zelenski:               { nombre: "Volodímir Zelenski", nac: 1978 },
  papa_giorgio:           { nombre: "Papa Giorgio", nac: 1953, },
  jordi_pujol:            { nombre: "Jordi Pujol", nac: 1930 },
  zazza:                  { nombre: "Zazza el Italiano", nac: 1991, },
  maria_teresa_campos:    { nombre: "María Teresa Campos", nac: 1941 },
  andrew_tate:            { nombre: "Andrew Tate", nac: 1986 },
  black_alien:            { nombre: "The Black Alien Project", nac: 1988, },
  jose_luis_gil:          { nombre: "José Luis Gil", nac: 1957 },
  lil_uzi_vert:           { nombre: "Lil Uzi Vert", nac: 1995 },
  felipe_gonzalez:        { nombre: "Felipe González", nac: 1942 },
  revilla:                { nombre: "Miguel Ángel Revilla", nac: 1943 },
  amaia_montero:          { nombre: "Amaia Montero", nac: 1976 },
  zaplana:                { nombre: "Eduardo Zaplana", nac: 1956 },
  ramon_vanidoso:         { nombre: "Ramón el Vanidoso", nac: 1957, },

  // ---- 2024 ----
  beckenbauer:            { nombre: "Franz Beckenbauer", nac: 1945 },
  julio_iglesias:         { nombre: "Julio Iglesias", nac: 1943 },
  tamames:                { nombre: "Ramón Tamames", nac: 1933 },
  chuck_norris:           { nombre: "Chuck Norris", nac: 1940 },
  paco_sanz:              { nombre: "Paco Sanz", nac: 1970, },
  dandy_barcelona:        { nombre: "Dandy de Barcelona", nac: 1964, },
  michael_caine:          { nombre: "Michael Caine", nac: 1933 },
  lucas:                  { nombre: "Lucas", nac: 1982, },
  silvia_pinal:           { nombre: "Silvia Pinal", nac: 1931 },
  raul_castro:            { nombre: "Raúl Castro", nac: 1931 },
  dragisa_gudelj:         { nombre: "Dragisa Gudelj", nac: 1997, },
  unzue:                  { nombre: "Eusebio Unzué", nac: 1967,},
  bruce_willis:           { nombre: "Bruce Willis", nac: 1955 },
  maggie_smith:           { nombre: "Maggie Smith", nac: 1934 },
  joan_pradells:          { nombre: "Joan Pradells", nac: 1996, },
  jodorkovsky:            { nombre: "Mijaíl Jodorkovski", nac: 1963 },
  bud_anderson:           { nombre: "Bud Anderson", nac: 1922 },
  morgan_freeman:         { nombre: "Morgan Freeman", nac: 1937 },
  raphael:                { nombre: "Raphael", nac: 1943 },
  sinwar:                 { nombre: "Yahya al Sinwar", nac: 1962 },

  // ---- 2025 ----
  mujica:                 { nombre: "José Mujica", nac: 1935 },
  chomsky:                { nombre: "Noam Chomsky", nac: 1928 },
  jack_nicholson:         { nombre: "Jack Nicholson", nac: 1937 },
  judi_dench:             { nombre: "Judi Dench", nac: 1934 },
  inah_canabarro:         { nombre: "Inah Canabarro Lucas", nac: 1908 },
  lidia_lozano:           { nombre: "Lidia Lozano", nac: 1960, },
  mounir_nasroui:         { nombre: "Mounir Nasroui", nac: 1992 },
  attenborough:           { nombre: "David Attenborough", nac: 1926 },
  john_williams:          { nombre: "John Williams", nac: 1932 },
  khalil_hayya:           { nombre: "Khalil al-Hayya", nac: 1960 },
  dave_kunst:             { nombre: "Dave Kunst", nac: 1939 },
  le_pen:                 { nombre: "Jean-Marie Le Pen", nac: 1928 },
  alberto_romero:         { nombre: "Alberto Romero", nac: 1993 },

  // ---- 2026 ----
  sam_neill:              { nombre: "Sam Neill", nac: 1947 },
  robert_duvall:          { nombre: "Robert Duvall", nac: 1931 },
  canita_brava:           { nombre: "Cañita Brava", nac: 1946 },
  george_soros:           { nombre: "George Soros", nac: 1930 },
  simon_perez:            { nombre: "Simón Pérez", nac: 1986},
  marie_rose_tessier:     { nombre: "Marie-Rose Tessier", nac: 1910},
  eduardo_casanova:       { nombre: "Eduardo Casanova", nac: 1991 },
  michael_j_fox:          { nombre: "Michael J. Fox", nac: 1961 },
  el_puma:                { nombre: "El Puma", nac: 1943},
  flossie:                { nombre: "Flossie", nac: 1995},
  antonio_tejero:         { nombre: "Antonio Tejero", nac: 1932 },
  juan_tamariz:           { nombre: "Juan Tamariz", nac: 1942 },
  yayoi_kusama:           { nombre: "Yayoi Kusama", nac: 1929 },
  javier_cansado:         { nombre: "Javier Cansado", nac: 1955},
  ruy_de_carvalho:        { nombre: "Ruy de Carvalho", nac: 1927 },
  rowan_atkinson:         { nombre: "Rowan Atkinson", nac: 1955 },
  jordi_sabate:           { nombre: "Jordi Sabaté i Pons", nac: 1984},
  ian_mckellen:           { nombre: "Ian McKellen", nac: 1939 },
};

const PORRAS = {
  2021: {
    cerrado: true,
    muertos: ["enrique_san_francisco", "omar_alvarez"],
    jugadores: {
      "DAVID": ["buzz_aldrin", "juan_carlos_i", "isabel_ii", "pele", "val_kilmer", "willie_nelson", "coppola", "carmen_sevilla", "berlusconi", "marichalar"],
      "DIEGO": ["kane_tanaka", "juan_carlos_i", "enrique_san_francisco", "schumacher", "sofia_grecia", "araceli_hidalgo", "miguel_bose", "isabel_ii", "jordi_enp", "chispas"],
      "RUBÉN": ["miyamoto", "juan_carlos_i", "charlie_sheen", "billie_eilish", "xi_jinping", "snoop_dogg", "de_niro", "schwarzenegger", "juan_munoz", "omar_alvarez"],
    },
  },
  2022: {
    cerrado: true,
    muertos: ["pele", "isabel_ii", "kane_tanaka", "benedicto_xvi"],
    jugadores: {
      "DAVID":   ["maxwell", "yoko_ono", "demi_lovato", "pele", "carmen_sevilla", "sixtynine", "isabel_ii", "joe_exotic", "gary_busey", "leticia_sabater"],
      "DIEGO":   ["kane_tanaka", "sabina", "pele", "ignatius", "clint_eastwood", "papa_francisco", "mick_jagger", "ana_rosa", "manolo_bombo", "jordi_hurtado"],
      "RUBÉN":   ["juan_carlos_i", "orslok", "kottick", "pratibha_patil", "dalai_lama", "waqa", "otoniel", "akihito", "ayuk_tabe", "camps"],
      "ALBERTO": ["isabel_ii", "clint_eastwood", "benedicto_xvi", "ana_rosa", "resines", "yoko_ono", "dick_van_dyke", "jimmy_carter", "amancio_ortega", "serrat"],
    },
  },
  2023: {
    cerrado: true,
    muertos: ["concha_velasco", "maria_teresa_campos", "carmen_sevilla"],
    jugadores: {
      "DAVID":   ["hitler", "jimmy_carter", "aguirre", "julian_munoz", "arevalo", "willie_nelson", "yoko_ono", "depardieu", "biden", "concha_velasco"],
      "DIEGO":   ["jimmy_carter", "concha_velasco", "zelenski", "papa_giorgio", "sabina", "jordi_pujol", "zazza", "maria_teresa_campos", "juan_carlos_i", "andrew_tate"],
      "RUBÉN":   ["clint_eastwood", "juan_carlos_i", "black_alien", "schumacher", "carmen_sevilla", "jose_luis_gil", "dalai_lama", "akihito", "jimmy_carter", "lil_uzi_vert"],
      "ALBERTO": ["jimmy_carter", "clint_eastwood", "juan_carlos_i", "ana_rosa", "felipe_gonzalez", "revilla", "amaia_montero", "concha_velasco", "zaplana", "ramon_vanidoso"],
    },
  },
  2024: {
    cerrado: true,
    muertos: ["beckenbauer", "jimmy_carter", "silvia_pinal", "maggie_smith", "bud_anderson", "sinwar"],
    jugadores: {
      "DAVID":   ["beckenbauer", "clint_eastwood", "julio_iglesias", "yoko_ono", "jimmy_carter", "tamames", "chuck_norris", "paco_sanz", "dandy_barcelona", "michael_caine"],
      "DIEGO":   ["dandy_barcelona", "sabina", "lucas", "beckenbauer", "silvia_pinal", "jimmy_carter", "raul_castro", "clint_eastwood", "dragisa_gudelj", "unzue"],
      "RUBÉN":   ["akihito", "bruce_willis", "maggie_smith", "joan_pradells", "waqa", "jodorkovsky", "bud_anderson", "orslok", "papa_francisco", "jimmy_carter"],
      "ALBERTO": ["dandy_barcelona", "jordi_pujol", "clint_eastwood", "zazza", "jimmy_carter", "juan_carlos_i", "morgan_freeman", "raphael", "papa_francisco", "sinwar"],
    },
  },
  2025: {
    cerrado: true,
    muertos: ["mujica", "papa_francisco", "inah_canabarro", "manolo_bombo", "le_pen"],
    jugadores: {
      "DAVID":   ["mujica", "papa_francisco", "sabina", "chomsky", "juan_carlos_i", "buzz_aldrin", "jack_nicholson", "dalai_lama", "judi_dench", "raphael"],
      "DIEGO":   ["inah_canabarro", "raphael", "dandy_barcelona", "jordi_pujol", "mujica", "lidia_lozano", "mounir_nasroui", "manolo_bombo", "joan_pradells", "jordi_hurtado"],
      "RUBÉN":   ["attenborough", "miyamoto", "john_williams", "raphael", "clint_eastwood", "dick_van_dyke", "akihito", "dalai_lama", "khalil_hayya", "dave_kunst"],
      "ALBERTO": ["dandy_barcelona", "clint_eastwood", "raphael", "buzz_aldrin", "papa_francisco", "le_pen", "biden", "juan_carlos_i", "julio_iglesias", "alberto_romero"],
    },
  },
  2026: {
    cerrado: false, // poner true cuando acabe el año
    muertos: ["sam_neill", "robert_duvall", "marie_rose_tessier", "antonio_tejero", "yayoi_kusama", "juan_tamariz"],
    jugadores: {
      "DAVID":   ["sam_neill", "robert_duvall", "clint_eastwood", "dick_van_dyke", "canita_brava", "buzz_aldrin", "george_soros", "simon_perez", "yoko_ono", "marie_rose_tessier"],
      "DIEGO":   ["sabina", "simon_perez", "dandy_barcelona", "eduardo_casanova", "michael_j_fox", "el_puma", "bruce_willis", "unzue", "flossie", "jordi_hurtado"],
      "RUBÉN":   ["simon_perez", "antonio_tejero", "juan_tamariz", "yayoi_kusama", "javier_cansado", "yoko_ono", "ruy_de_carvalho", "dick_van_dyke", "jose_luis_gil", "rowan_atkinson"],
      "ALBERTO": ["dick_van_dyke", "clint_eastwood", "jordi_pujol", "buzz_aldrin", "jordi_sabate", "julio_iglesias", "biden", "juan_carlos_i", "willie_nelson", "ian_mckellen"],
    },
  },
};
