const { withDangerousMod } = require('@expo/config-plugins')
const fs = require('node:fs')
const path = require('node:path')

const MARKER = '# @pebtech/fmt-xcode26-fix'

const PODFILE_SNIPPET = `
    ${MARKER}
    installer.pods_project.targets.each do |target|
      if target.name == 'fmt'
        target.build_configurations.each do |bc|
          bc.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
          definitions = bc.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] || ['$(inherited)']
          definitions = [definitions] unless definitions.is_a?(Array)
          definitions << 'FMT_USE_CONSTEVAL=0' unless definitions.include?('FMT_USE_CONSTEVAL=0')
          bc.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] = definitions
        end
      end
    end
`

/** Workaround for Xcode 26.4+ rejecting fmt consteval in React Native 0.76 pods. */
function withFmtXcode26Fix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile')
      let contents = fs.readFileSync(podfilePath, 'utf8')

      if (!contents.includes(MARKER)) {
        contents = contents.replace(
          /react_native_post_install\([\s\S]*?\)\n/,
          (match) => `${match}${PODFILE_SNIPPET}\n`,
        )
        fs.writeFileSync(podfilePath, contents)
      }

      return config
    },
  ])
}

module.exports = withFmtXcode26Fix
