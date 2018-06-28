const execa = require('execa');
const getRegistry = require('./get-registry');
const getChannel = require('./get-channel');
const getReleaseInfo = require('./get-release-info');

module.exports = async ({npmPublish, pkgRoot}, {publishConfig, name}, {nextRelease: {channel, version}, logger}) => {
  if (npmPublish !== false) {
    const basePath = pkgRoot || '.';
    const registry = await getRegistry(publishConfig, name);
    const distTag = getChannel(channel);

    logger.log('Publishing version %s to npm registry', version);

    const shell = await execa('npm', ['publish', `./${basePath}`, '--tag', distTag, '--registry', registry]);
    process.stdout.write(shell.stdout);
    return getReleaseInfo(name, distTag, registry);
  }
};
