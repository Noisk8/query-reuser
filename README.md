# Query Reuser

Prototipo comunitario para **Wikimania 2026** que permite reutilizar consultas SPARQL de Wikidata. Encuentra consultas útiles, comprende qué información entregan y aprende a adaptarlas sin comenzar desde cero.

## Características

- **Exploración por temáticas**: Memoria histórica, biodiversidad, dominio público
- **Filtrado por país**: Selecciona cualquier país del mundo para adaptar las consultas
- **Guías de adaptación**: Enseña qué líneas del SPARQL se pueden cambiar
- **Playground integrado**: Ejecuta las consultas directamente desde el navegador
- **Multidioma**: Soporte para español, inglés y ruso

## Consultas Disponibles

| Tema | Consulta | Tipo | Nivel |
|------|----------|------|-------|
| **Memoria** | Monumentos conmemorativos | Mapa | Básico |
| | Lugares de memoria | Lista | Intermedio |
| | Falsos positivos (Colombia) | Tabla | Avanzado |
| **Biodiversidad** | Árboles patrimoniales | Lista | Básico |
| | Árboles por región | Tabla | Intermedio |
| | Especies endémicas | Tabla | Intermedio |
| **Dominio público** | Obras artísticas | Lista | Básico |
| | Personajes históricos | Tabla | Intermedio |

## Estructura del Proyecto

```
query-reuser/
├── src/
│   ├── components/          # Componentes Vue
│   │   ├── QueryCard.vue    # Tarjeta de consulta con preview
│   │   ├── WikidataPlayground.vue  # Editor SPARQL
│   │   └── ...
│   ├── views/               # Vistas/páginas
│   │   ├── HomeView.vue     # Página principal con filtros
│   │   ├── TopicView.vue    # Vista por temática
│   │   └── QueryDetailView.vue  # Detalle de consulta
│   ├── data/
│   │   ├── topics.js        # Definición de temas y consultas
│   │   └── queries/         # Consultas SPARQL y metadatos
│   │       ├── memoria/
│   │       ├── biodiversidad/
│   │       └── dominio-publico/
│   ├── i18n/                # Traducciones
│   │   ├── es.json
│   │   ├── en.json
│   │   └── qqq.json
│   └── composables/         # Lógica reutilizable
├── server.js                # Servidor Express para producción
└── package.json
```

## Sistema de Metadatos

Cada consulta SPARQL puede tener un archivo JSON de metadatos opcional:

```sparql
# src/data/queries/memoria/monumentos-conmemorativos.sparql
SELECT ?monument ?monumentLabel ?coordinates
WHERE {
  ?monument wdt:P31/wdt:P279* wd:Q500004;
            wdt:P17 wd:${COUNTRY_ID};  # ← Se reemplaza por el país seleccionado
            wdt:P625 ?coordinates.
}
```

```json
// src/data/queries/memoria/monumentos-conmemorativos.json
{
  "id": "monumentos-conmemorativos",
  "i18nKey": "query-monumentos",
  "resultType": "map",
  "level": "basic",
  "tags": ["memoria", "monumentos", "historia"],
  "info": {
    "prerequisitesCount": 2
  },
  "adaptationGuide": [
    {
      "step": 1,
      "codeSnippet": "wdt:P17 wd:Q298  # Cambia Q298 por tu país"
    },
    {
      "step": 2,
      "codeSnippet": "wd:Q500004  # Cambia Q500004 por otro tipo"
    }
  ]
}
```

## Cómo Agregar una Nueva Consulta

### 1. Crear el archivo SPARQL

```sparql
# src/data/queries/tematica/nueva-consulta.sparql
SELECT ?item ?itemLabel
WHERE {
  ?item wdt:P31 wd:Q12345;
        wdt:P17 wd:${COUNTRY_ID};  # Usa ${COUNTRY_ID} si es adaptable
        wdt:P625 ?coordinates.
}
```

### 2. Crear metadatos JSON (opcional pero recomendado)

```json
{
  "id": "nueva-consulta",
  "i18nKey": "query-nueva-consulta",
  "resultType": "table",
  "level": "basic",
  "tags": ["tematica", "etiqueta"],
  "info": {
    "prerequisitesCount": 1
  },
  "adaptationGuide": [
    {
      "step": 1,
      "codeSnippet": "wdt:P17 wd:Q298  # Cambia por tu país"
    }
  ]
}
```

### 3. Agregar traducciones i18n

En `src/i18n/es.json`:

```json
{
  "query-nueva-consulta-title": "Título de la consulta en $1",
  "query-nueva-consulta-desc": "Descripción corta de la consulta.",
  "query-nueva-consulta-what-it-does": "Explicación detallada.",
  "query-nueva-consulta-prerequisite-1": "Requisito previo 1",
  "query-nueva-consulta-step-1-title": "Título del paso 1",
  "query-nueva-consulta-step-1-description": "Descripción del paso 1"
}
```

### 4. Probar

```bash
yarn build
```

## Instalación

```bash
# Instalar dependencias
yarn install

# Desarrollo
yarn dev

# Build para producción
yarn build

# Servidor de producción
yarn start
```

## Tecnologías

- **Vue 3** - Framework de UI
- **Vite** - Build tool
- **Vue Router** - Enrutamiento
- **Wikimedia Codex** - Sistema de diseño
- **vue-banana-i18n** - Internacionalización
- **sparqljs** - Parser SPARQL
- **Express** - Servidor para producción

## API de Wikidata

Las consultas se ejecutan contra el endpoint SPARQL de Wikidata:
```
https://query.wikidata.org/sparql
```

## Licencia

Prototipo comunitario para Wikimania 2026.