import { ref, computed } from "vue";
import { useI18n } from "vue-banana-i18n";
import { getAllQueries } from "../data/topics.js";

export function useQuerySearch() {
  const i18n = useI18n();

  const searchText = ref("");
  const selectedCountry = ref("Q298");
  const selectedTopicSlug = ref(null);

  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ");
  }

  const filteredQueries = computed(() => {
    const text = normalize(searchText.value);
    const terms = text.split(/\s+/).filter(Boolean);

    const all = getAllQueries();

    return all.filter(({ topic, query }) => {
      if (selectedTopicSlug.value && topic.slug !== selectedTopicSlug.value) {
        return false;
      }

      if (terms.length === 0) {
        return true;
      }

      const title = normalize(i18n.i18n(query.i18nKey + "-title", ""));
      const description = normalize(i18n.i18n(query.i18nKey + "-desc", ""));
      const topicName = normalize(topic.name);
      const topicI18n = normalize(i18n.i18n(topic.i18nKey, ""));
      const topicDesc = normalize(i18n.i18n(topic.i18nKey + "-desc", ""));
      const searchable = [
        title,
        description,
        topicName,
        topicI18n,
        topicDesc,
        query.id,
        ...query.tags,
      ].join(" ");

      return terms.every((term) => searchable.includes(term));
    });
  });

  return {
    searchText,
    selectedCountry,
    selectedTopicSlug,
    filteredQueries,
  };
}
