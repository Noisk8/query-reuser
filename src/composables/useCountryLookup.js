import { ref, computed, watch } from "vue";
import { countries } from "../data/topics.js";
import { useLanguage } from "./useLanguage.js";
import { getCountryName } from "../utils/localeNames.js";

export function useCountryLookup(selectedCountry) {
  const { currentLocale } = useLanguage();
  const countryInput = ref("");

  function countryLabel(country) {
    return getCountryName(country.code, currentLocale.value) || country.name;
  }

  const allCountryMenuItems = computed(() =>
    countries.map((c) => ({
      label: countryLabel(c),
      value: c.id,
      thumbnail: { url: `https://flagcdn.com/w40/${c.code}.png` },
    }))
  );

  const countryMenuItems = computed(() => {
    if (!countryInput.value) {
      return allCountryMenuItems.value;
    }
    const query = countryInput.value.toLowerCase();
    return allCountryMenuItems.value.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  });

  watch(
    () => [selectedCountry.value, currentLocale.value],
    ([countryId]) => {
      const country = countries.find((c) => c.id === countryId);
      countryInput.value = country ? countryLabel(country) : "";
    },
    { immediate: true }
  );

  return { countryInput, countryMenuItems };
}
