import monumentosMemoria from "./queries/memoria/monumentos-conmemorativos.sparql?raw";
import lugaresMemoria from "./queries/memoria/lugares-memoria.sparql?raw";
import especiesPeligro from "./queries/biodiversidad/especies-peligro.sparql?raw";
import areasProtegidas from "./queries/biodiversidad/areas-protegidas.sparql?raw";
import obrasArte from "./queries/dominio-publico/obras-arte.sparql?raw";
import personajesHistoricos from "./queries/dominio-publico/personajes-historicos.sparql?raw";

function buildQuery(template, countryId) {
  return template.replace(/\$\{COUNTRY_ID\}/g, countryId);
}

export const topics = [
  {
    slug: "memoria",
    name: "Memoria",
    i18nKey: "topic-memoria",
    queries: [
      {
        id: "monumentos-conmemorativos",
        i18nKey: "query-monumentos",
        resultType: "map",
        level: "basic",
        tags: ["memoria", "monumentos", "historia", "cultura", "geografía"],
        buildQuery: (countryId) => buildQuery(monumentosMemoria, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-monumentos-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P17 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "wd:Q500004  # Opcional: cambiar a wd:Q4989906",
          },
          {
            step: 3,
            codeSnippet: "FILTER EXISTS { ?monument wdt:P18 ?image }",
          },
        ],
      },
      {
        id: "lugares-memoria",
        i18nKey: "query-lugares-memoria",
        resultType: "list",
        level: "intermediate",
        tags: ["memoria", "lugares", "historia", "derechos humanos"],
        buildQuery: (countryId) => buildQuery(lugaresMemoria, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-lugares-memoria-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P17 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "wd:Q18134653  # Opcional: cambiar a wd:Q1322322",
          },
          {
            step: 3,
            codeSnippet: "?site wdt:P131 wd:Q2198 .  # Cambia Q2198 por la región deseada",
          },
        ],
      },
    ],
  },
  {
    slug: "biodiversidad",
    name: "Biodiversidad",
    i18nKey: "topic-biodiversidad",
    queries: [
      {
        id: "especies-peligro",
        i18nKey: "query-especies",
        resultType: "table",
        level: "basic",
        tags: ["biodiversidad", "especies", "conservación", "medio ambiente"],
        buildQuery: (countryId) => buildQuery(especiesPeligro, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-especies-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P183 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "VALUES ?conservationStatus { wd:Q219127 wd:Q219128 }  # En peligro crítico y en peligro",
          },
          {
            step: 3,
            codeSnippet: "wdt:P17 wd:Q298  # Presencia en el país",
          },
        ],
      },
      {
        id: "areas-protegidas",
        i18nKey: "query-areas-bio",
        resultType: "map",
        level: "intermediate",
        tags: ["biodiversidad", "áreas protegidas", "conservación", "mapas"],
        buildQuery: (countryId) => buildQuery(areasProtegidas, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-areas-bio-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P17 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "wd:Q179049  # Opcional: cambiar a wd:Q46169",
          },
          {
            step: 3,
            codeSnippet: "?area wdt:P2046 ?areaSize .\nFILTER(?areaSize > 100)  # km²",
          },
        ],
      },
    ],
  },
  {
    slug: "dominio-publico",
    name: "Dominio público",
    i18nKey: "topic-dominio-publico",
    queries: [
      {
        id: "obras-arte",
        i18nKey: "query-obras",
        resultType: "list",
        level: "basic",
        tags: ["dominio público", "arte", "cultura", "obras"],
        buildQuery: (countryId) => buildQuery(obrasArte, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-obras-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P170 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "wd:Q33231  # Opcional: cambiar a wd:Q5",
          },
          {
            step: 3,
            codeSnippet: "OPTIONAL { ?work wdt:P18 ?image }",
          },
        ],
      },
      {
        id: "personajes-historicos",
        i18nKey: "query-personajes",
        resultType: "table",
        level: "intermediate",
        tags: ["dominio público", "personajes", "historia", "biografías"],
        buildQuery: (countryId) => buildQuery(personajesHistoricos, countryId),
        info: {
          useCasesCount: 3,
          prerequisitesCount: 2,
          dataSourcesCount: 1,
        },
        adaptation: {
          notesCount: 3,
          changeLine: "query-personajes-adapt-line",
        },
        adaptationGuide: [
          {
            step: 1,
            codeSnippet: "wdt:P27 wd:Q298  # Cambia Q298 por tu país",
          },
          {
            step: 2,
            codeSnippet: "FILTER(?deathDate < '1950-01-01'^^xsd:dateTime)",
          },
          {
            step: 3,
            codeSnippet: "?person wdt:P106 wd:Q82955 .  # Escritores",
          },
        ],
      },
    ],
  },
];

export function getTopicBySlug(slug) {
  return topics.find((t) => t.slug === slug);
}

export function getQueryById(queryId) {
  for (const topic of topics) {
    const query = topic.queries.find((q) => q.id === queryId);
    if (query) {
      return { topic, query };
    }
  }
  return null;
}

export function getAllQueries() {
  return topics.flatMap((topic) =>
    topic.queries.map((query) => ({ topic, query }))
  );
}

export function getCountryById(countryId) {
  return countries.find((c) => c.id === countryId);
}

export const countries = [
  { id: "Q889", name: "Afganistán", code: "af" },
  { id: "Q222", name: "Albania", code: "al" },
  { id: "Q183", name: "Alemania", code: "de" },
  { id: "Q228", name: "Andorra", code: "ad" },
  { id: "Q916", name: "Angola", code: "ao" },
  { id: "Q781", name: "Antigua y Barbuda", code: "ag" },
  { id: "Q851", name: "Arabia Saudí", code: "sa" },
  { id: "Q262", name: "Argelia", code: "dz" },
  { id: "Q414", name: "Argentina", code: "ar" },
  { id: "Q399", name: "Armenia", code: "am" },
  { id: "Q408", name: "Australia", code: "au" },
  { id: "Q40", name: "Austria", code: "at" },
  { id: "Q227", name: "Azerbaiyán", code: "az" },
  { id: "Q778", name: "Bahamas", code: "bs" },
  { id: "Q902", name: "Bangladés", code: "bd" },
  { id: "Q244", name: "Barbados", code: "bb" },
  { id: "Q398", name: "Baréin", code: "bh" },
  { id: "Q242", name: "Belice", code: "bz" },
  { id: "Q962", name: "Benín", code: "bj" },
  { id: "Q184", name: "Bielorrusia", code: "by" },
  { id: "Q836", name: "Birmania", code: "mm" },
  { id: "Q750", name: "Bolivia", code: "bo" },
  { id: "Q225", name: "Bosnia y Herzegovina", code: "ba" },
  { id: "Q963", name: "Botsuana", code: "bw" },
  { id: "Q155", name: "Brasil", code: "br" },
  { id: "Q921", name: "Brunéi", code: "bn" },
  { id: "Q219", name: "Bulgaria", code: "bg" },
  { id: "Q965", name: "Burkina Faso", code: "bf" },
  { id: "Q967", name: "Burundi", code: "bi" },
  { id: "Q917", name: "Bután", code: "bt" },
  { id: "Q31", name: "Bélgica", code: "be" },
  { id: "Q1011", name: "Cabo Verde", code: "cv" },
  { id: "Q424", name: "Camboya", code: "kh" },
  { id: "Q1009", name: "Camerún", code: "cm" },
  { id: "Q16", name: "Canadá", code: "ca" },
  { id: "Q846", name: "Catar", code: "qa" },
  { id: "Q657", name: "Chad", code: "td" },
  { id: "Q298", name: "Chile", code: "cl" },
  { id: "Q229", name: "Chipre", code: "cy" },
  { id: "Q237", name: "Ciudad del Vaticano", code: "va" },
  { id: "Q739", name: "Colombia", code: "co" },
  { id: "Q970", name: "Comoras", code: "km" },
  { id: "Q971", name: "Congo", code: "cg" },
  { id: "Q423", name: "Corea del Norte", code: "kp" },
  { id: "Q884", name: "Corea del Sur", code: "kr" },
  { id: "Q800", name: "Costa Rica", code: "cr" },
  { id: "Q1008", name: "Costa de Marfil", code: "ci" },
  { id: "Q224", name: "Croacia", code: "hr" },
  { id: "Q241", name: "Cuba", code: "cu" },
  { id: "Q784", name: "Dominica", code: "dm" },
  { id: "Q736", name: "Ecuador", code: "ec" },
  { id: "Q79", name: "Egipto", code: "eg" },
  { id: "Q792", name: "El Salvador", code: "sv" },
  { id: "Q878", name: "Emiratos Árabes Unidos", code: "ae" },
  { id: "Q986", name: "Eritrea", code: "er" },
  { id: "Q214", name: "Eslovaquia", code: "sk" },
  { id: "Q215", name: "Eslovenia", code: "si" },
  { id: "Q29", name: "España", code: "es" },
  { id: "Q702", name: "Estados Federados de Micronesia", code: "fm" },
  { id: "Q30", name: "Estados Unidos", code: "us" },
  { id: "Q191", name: "Estonia", code: "ee" },
  { id: "Q115", name: "Etiopía", code: "et" },
  { id: "Q928", name: "Filipinas", code: "ph" },
  { id: "Q33", name: "Finlandia", code: "fi" },
  { id: "Q712", name: "Fiyi", code: "fj" },
  { id: "Q142", name: "Francia", code: "fr" },
  { id: "Q1000", name: "Gabón", code: "ga" },
  { id: "Q1005", name: "Gambia", code: "gm" },
  { id: "Q230", name: "Georgia", code: "ge" },
  { id: "Q117", name: "Ghana", code: "gh" },
  { id: "Q769", name: "Granada", code: "gd" },
  { id: "Q41", name: "Grecia", code: "gr" },
  { id: "Q774", name: "Guatemala", code: "gt" },
  { id: "Q1006", name: "Guinea", code: "gn" },
  { id: "Q983", name: "Guinea Ecuatorial", code: "gq" },
  { id: "Q1007", name: "Guinea-Bisáu", code: "gw" },
  { id: "Q734", name: "Guyana", code: "gy" },
  { id: "Q790", name: "Haití", code: "ht" },
  { id: "Q783", name: "Honduras", code: "hn" },
  { id: "Q28", name: "Hungría", code: "hu" },
  { id: "Q668", name: "India", code: "in" },
  { id: "Q252", name: "Indonesia", code: "id" },
  { id: "Q796", name: "Irak", code: "iq" },
  { id: "Q27", name: "Irlanda", code: "ie" },
  { id: "Q794", name: "Irán", code: "ir" },
  { id: "Q189", name: "Islandia", code: "is" },
  { id: "Q709", name: "Islas Marshall", code: "mh" },
  { id: "Q685", name: "Islas Salomón", code: "sb" },
  { id: "Q801", name: "Israel", code: "il" },
  { id: "Q38", name: "Italia", code: "it" },
  { id: "Q766", name: "Jamaica", code: "jm" },
  { id: "Q17", name: "Japón", code: "jp" },
  { id: "Q810", name: "Jordania", code: "jo" },
  { id: "Q232", name: "Kazajistán", code: "kz" },
  { id: "Q114", name: "Kenia", code: "ke" },
  { id: "Q813", name: "Kirguistán", code: "kg" },
  { id: "Q710", name: "Kiribati", code: "ki" },
  { id: "Q1246", name: "Kosovo", code: "xk" },
  { id: "Q817", name: "Kuwait", code: "kw" },
  { id: "Q819", name: "Laos", code: "la" },
  { id: "Q1013", name: "Lesoto", code: "ls" },
  { id: "Q211", name: "Letonia", code: "lv" },
  { id: "Q1014", name: "Liberia", code: "lr" },
  { id: "Q1016", name: "Libia", code: "ly" },
  { id: "Q347", name: "Liechtenstein", code: "li" },
  { id: "Q37", name: "Lituania", code: "lt" },
  { id: "Q32", name: "Luxemburgo", code: "lu" },
  { id: "Q822", name: "Líbano", code: "lb" },
  { id: "Q221", name: "Macedonia del Norte", code: "mk" },
  { id: "Q1019", name: "Madagascar", code: "mg" },
  { id: "Q833", name: "Malasia", code: "my" },
  { id: "Q1020", name: "Malaui", code: "mw" },
  { id: "Q826", name: "Maldivas", code: "mv" },
  { id: "Q912", name: "Mali", code: "ml" },
  { id: "Q233", name: "Malta", code: "mt" },
  { id: "Q1028", name: "Marruecos", code: "ma" },
  { id: "Q1027", name: "Mauricio", code: "mu" },
  { id: "Q1025", name: "Mauritania", code: "mr" },
  { id: "Q217", name: "Moldavia", code: "md" },
  { id: "Q711", name: "Mongolia", code: "mn" },
  { id: "Q236", name: "Montenegro", code: "me" },
  { id: "Q1029", name: "Mozambique", code: "mz" },
  { id: "Q96", name: "México", code: "mx" },
  { id: "Q235", name: "Mónaco", code: "mc" },
  { id: "Q1030", name: "Namibia", code: "na" },
  { id: "Q697", name: "Nauru", code: "nr" },
  { id: "Q837", name: "Nepal", code: "np" },
  { id: "Q811", name: "Nicaragua", code: "ni" },
  { id: "Q1033", name: "Nigeria", code: "ng" },
  { id: "Q20", name: "Noruega", code: "no" },
  { id: "Q664", name: "Nueva Zelanda", code: "nz" },
  { id: "Q1032", name: "Níger", code: "ne" },
  { id: "Q842", name: "Omán", code: "om" },
  { id: "Q843", name: "Pakistán", code: "pk" },
  { id: "Q695", name: "Palaos", code: "pw" },
  { id: "Q219060", name: "Palestina", code: "ps" },
  { id: "Q804", name: "Panamá", code: "pa" },
  { id: "Q691", name: "Papúa Nueva Guinea", code: "pg" },
  { id: "Q733", name: "Paraguay", code: "py" },
  { id: "Q419", name: "Perú", code: "pe" },
  { id: "Q36", name: "Polonia", code: "pl" },
  { id: "Q45", name: "Portugal", code: "pt" },
  { id: "Q145", name: "Reino Unido", code: "gb" },
  { id: "Q29999", name: "Reino de los Países Bajos", code: "nl" },
  { id: "Q929", name: "República Centroafricana", code: "cf" },
  { id: "Q213", name: "República Checa", code: "cz" },
  { id: "Q974", name: "República Democrática del Congo", code: "cd" },
  { id: "Q786", name: "República Dominicana", code: "do" },
  { id: "Q148", name: "República Popular China", code: "cn" },
  { id: "Q865", name: "República de China", code: "tw" },
  { id: "Q1037", name: "Ruanda", code: "rw" },
  { id: "Q218", name: "Rumania", code: "ro" },
  { id: "Q159", name: "Rusia", code: "ru" },
  { id: "Q683", name: "Samoa", code: "ws" },
  { id: "Q763", name: "San Cristóbal y Nieves", code: "kn" },
  { id: "Q238", name: "San Marino", code: "sm" },
  { id: "Q757", name: "San Vicente y las Granadinas", code: "vc" },
  { id: "Q760", name: "Santa Lucía", code: "lc" },
  { id: "Q1039", name: "Santo Tomé y Príncipe", code: "st" },
  { id: "Q1041", name: "Senegal", code: "sn" },
  { id: "Q403", name: "Serbia", code: "rs" },
  { id: "Q1042", name: "Seychelles", code: "sc" },
  { id: "Q1044", name: "Sierra Leona", code: "sl" },
  { id: "Q334", name: "Singapur", code: "sg" },
  { id: "Q858", name: "Siria", code: "sy" },
  { id: "Q1045", name: "Somalia", code: "so" },
  { id: "Q854", name: "Sri Lanka", code: "lk" },
  { id: "Q1050", name: "Suazilandia", code: "sz" },
  { id: "Q258", name: "Sudáfrica", code: "za" },
  { id: "Q1049", name: "Sudán", code: "sd" },
  { id: "Q958", name: "Sudán del Sur", code: "ss" },
  { id: "Q34", name: "Suecia", code: "se" },
  { id: "Q39", name: "Suiza", code: "ch" },
  { id: "Q730", name: "Surinam", code: "sr" },
  { id: "Q869", name: "Tailandia", code: "th" },
  { id: "Q924", name: "Tanzania", code: "tz" },
  { id: "Q863", name: "Tayikistán", code: "tj" },
  { id: "Q574", name: "Timor Oriental", code: "tl" },
  { id: "Q945", name: "Togo", code: "tg" },
  { id: "Q678", name: "Tonga", code: "to" },
  { id: "Q754", name: "Trinidad y Tobago", code: "tt" },
  { id: "Q874", name: "Turkmenistán", code: "tm" },
  { id: "Q43", name: "Turquía", code: "tr" },
  { id: "Q672", name: "Tuvalu", code: "tv" },
  { id: "Q948", name: "Túnez", code: "tn" },
  { id: "Q212", name: "Ucrania", code: "ua" },
  { id: "Q1036", name: "Uganda", code: "ug" },
  { id: "Q77", name: "Uruguay", code: "uy" },
  { id: "Q265", name: "Uzbekistán", code: "uz" },
  { id: "Q686", name: "Vanuatu", code: "vu" },
  { id: "Q717", name: "Venezuela", code: "ve" },
  { id: "Q881", name: "Vietnam", code: "vn" },
  { id: "Q805", name: "Yemen", code: "ye" },
  { id: "Q977", name: "Yibuti", code: "dj" },
  { id: "Q953", name: "Zambia", code: "zm" },
  { id: "Q954", name: "Zimbabue", code: "zw" },
];
