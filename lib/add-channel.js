const execa = require('execa');
const getRegistry = require('./get-registry');
const getChannel = require('./get-channel');
const getReleaseInfo = require('./get-release-info');

module.exports = async ({npmPublish}, {publishConfig, name}, {nextRelease: {channel, version}, logger}) => {
  if (npmPublish !== false) {
    const registry = await getRegistry(publishConfig, name);
    const distTag = getChannel(channel);

    logger.log('Add version %s to npm registry on dist-tag %s', version, distTag);

    const shell = await execa('npm', ['dist-tag', 'add', `${name}@${version}`, distTag, '--registry', registry]);
    process.stdout.write(shell.stdout);
    return getReleaseInfo(name, distTag, registry);
  }
};
