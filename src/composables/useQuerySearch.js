import { ref, computed } from "vue";
import { getAllQueries } from "../data/topics.js";

export function useQuerySearch() {
  const selectedCountry = ref(null);
  const selectedTopicSlug = ref(null);

  const filteredQueries = computed(() => {
    const all = getAllQueries();

    if (!selectedTopicSlug.value) {
      return all;
    }

    return all.filter(({ topic }) => topic.slug === selectedTopicSlug.value);
  });

  return {
    selectedCountry,
    selectedTopicSlug,
    filteredQueries,
  };
}
