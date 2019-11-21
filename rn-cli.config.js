// WORKAROUND: https://github.com/oblador/react-native-vector-icons/issues/626#issuecomment-362386341
// to be fixed by https://github.com/facebook/react-native/pull/17672
const blacklist = require('metro-config/src/defaults/blacklist')
module.exports = {
  getBlacklistRE () {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}