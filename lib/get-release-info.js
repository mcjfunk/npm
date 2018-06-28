const normalizeUrl = require('normalize-url');

const DEFAULT_NPM_REGISTRY = 'https://registry.npmjs.org/';

module.exports = async (
  name,
  distTag,
  registry,
  defaultRegistry = process.env.DEFAULT_NPM_REGISTRY || DEFAULT_NPM_REGISTRY
) => ({
  name: `npm package (@${distTag} dist-tag)`,
  url: normalizeUrl(registry) === normalizeUrl(defaultRegistry) ? `https://www.npmjs.com/package/${name}` : undefined,
});
