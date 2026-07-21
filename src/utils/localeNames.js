export function getCountryName(countryCode, locale) {
  if (!countryCode || typeof Intl === "undefined" || !Intl.DisplayNames) {
    return null;
  }
  try {
    const displayNames = new Intl.DisplayNames([locale, "es"], {
      type: "region",
      fallback: "code",
    });
    return displayNames.of(countryCode.toUpperCase());
  } catch {
    return null;
  }
}

export function getLanguageName(languageCode, locale) {
  if (!languageCode || typeof Intl === "undefined" || !Intl.DisplayNames) {
    return null;
  }
  try {
    const displayNames = new Intl.DisplayNames([locale, "es"], {
      type: "language",
      fallback: "code",
    });
    return displayNames.of(languageCode);
  } catch {
    return null;
  }
}
