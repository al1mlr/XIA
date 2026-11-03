const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Les contenus du site (src/_data/*.yaml) sont écrits en YAML : c'est ce que le CMS édite.
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  // Événements : un fichier par événement dans src/events/, triés du plus récent au plus ancien.
  eleventyConfig.addCollection("eventsSorted", (api) =>
    api
      .getFilteredByTag("events")
      .sort((a, b) => new Date(b.data.event_date) - new Date(a.data.event_date))
  );

  // 3 déc. 2025  /  3 Dec 2025
  eleventyConfig.addFilter("eventDate", (value, lang) => {
    const d = new Date(value);
    if (isNaN(d)) return "";
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  });

  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("tail", (arr, n) => (arr || []).slice(n));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
