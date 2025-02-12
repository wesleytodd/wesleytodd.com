export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('index.css');
  eleventyConfig.addPassthroughCopy('images/*');
}
