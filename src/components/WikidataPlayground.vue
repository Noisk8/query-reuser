<template>
  <section class="playground">
    <div class="playground__header">
      <h3 class="playground__title">{{ $i18n('playground-title') }}</h3>
      <div class="playground__actions">
        <cdx-button
          weight="primary"
          :disabled="loading"
          @click="runQuery"
        >
          {{ loading ? $i18n('playground-running') : $i18n('playground-run') }}
        </cdx-button>
        <cdx-button
          weight="normal"
          @click="openInWikidata"
        >
          {{ $i18n('playground-open-wikidata') }}
        </cdx-button>
      </div>
    </div>

    <cdx-text-area
      v-model="editableQuery"
      class="playground__editor"
      :rows="14"
    />

    <cdx-message
      v-if="error"
      type="error"
      class="playground__message"
    >
      {{ error }}
    </cdx-message>

    <div v-if="loading" class="playground__loading">
      <span class="playground__spinner" />
      {{ $i18n('playground-loading') }}
    </div>

    <div v-else-if="results" class="playground__results">
      <h4 class="playground__results-title">
        {{ $i18n('playground-results', results.length) }}
      </h4>

      <div class="playground__table-wrap">
        <table class="playground__table">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in results" :key="i">
              <td v-for="col in columns" :key="col">
                {{ formatValue(row[col]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { CdxButton, CdxTextArea, CdxMessage } from "@wikimedia/codex";
import { useI18n } from "vue-banana-i18n";

const props = defineProps({
  query: { type: Object, required: true },
  countryId: { type: String, required: true },
});

const i18n = useI18n();

const editableQuery = ref("");
const loading = ref(false);
const error = ref(null);
const results = ref(null);

const columns = computed(() => {
  if (!results.value || results.value.length === 0) return [];
  return Object.keys(results.value[0]);
});

function generateQuery() {
  return props.query.buildQuery(props.countryId);
}

watch(
  () => [props.query, props.countryId],
  () => {
    editableQuery.value = generateQuery();
    results.value = null;
    error.value = null;
  },
  { immediate: true }
);

async function runQuery() {
  loading.value = true;
  error.value = null;
  results.value = null;

  try {
    const url =
      "https://query.wikidata.org/sparql?query=" +
      encodeURIComponent(editableQuery.value);
    const response = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }

    const data = await response.json();
    results.value = data.results.bindings.map((binding) => {
      const row = {};
      for (const [key, value] of Object.entries(binding)) {
        row[key] = value.value;
      }
      return row;
    });
  } catch (err) {
    error.value = err.message || i18n.i18n("playground-error");
  } finally {
    loading.value = false;
  }
}

function openInWikidata() {
  const url =
    "https://query.wikidata.org/#" + encodeURIComponent(editableQuery.value);
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatValue(value) {
  if (value == null) return "";
  if (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  ) {
    const label = value.replace(/^.*\//, "").replace(/_/g, " ");
    return label;
  }
  return value;
}
</script>

<style scoped>
.playground {
  margin-top: var(--spacing-300);
}
.playground__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-100);
  margin-bottom: var(--spacing-200);
}
.playground__title {
  margin: 0;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
}
.playground__actions {
  display: flex;
  gap: var(--spacing-100);
  flex-wrap: wrap;
}
.playground__editor {
  width: 100%;
  font-family: var(--font-family-monospace);
  font-size: var(--font-size-small);
}
.playground__message {
  margin-top: var(--spacing-200);
}
.playground__loading {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
  margin-top: var(--spacing-200);
  color: var(--color-subtle);
}
.playground__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--border-color-base);
  border-top-color: var(--color-progressive);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.playground__results {
  margin-top: var(--spacing-300);
}
.playground__results-title {
  margin: 0 0 var(--spacing-200);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-bold);
}
.playground__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
}
.playground__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-small);
}
.playground__table th,
.playground__table td {
  padding: var(--spacing-100) var(--spacing-150);
  border-bottom: 1px solid var(--border-color-base);
  text-align: left;
  vertical-align: top;
}
.playground__table th {
  background-color: var(--background-color-interactive-subtle);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
}
.playground__table tr:last-child td {
  border-bottom: none;
}
</style>
