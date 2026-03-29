/**
 * DSAi Starter Template Configuration
 *
 * Token pipeline matches @dsai-io playground architecture.
 * Edit src/collections/ JSON files to customize tokens,
 * or connect Figma and run `pnpm figma:sync`.
 *
 * @type {import('@dsai-io/tools').DsaiConfig}
 */
import { defineConfig } from '@dsai-io/tools';

export default defineConfig({
  global: {
    debug: process.env['DEBUG'] === 'true',
    logLevel: process.env['LOG_LEVEL'] ?? 'info',
    framework: 'react',
  },

  tokens: {
    // Source
    source: 'theme',
    sourceDir: './src/figma-exports',
    collectionsDir: './src',

    // Output
    outputDir: './src/generated',
    outputDirs: {
      css: './src/generated/css',
      scss: './src/generated/scss',
      js: './src/generated/js',
      ts: './src/generated/ts',
      json: './src/generated/json',
    },
    prefix: '--dsai-',
    formats: ['css', 'scss', 'js', 'ts', 'json'],

    // Build options
    baseFontSize: 16,
    outputReferences: true,
    separateThemeFiles: true,

    // SCSS compilation (Bootstrap integration)
    scss: {
      outputStyles: ['expanded', 'compressed'],
      minifiedSuffix: '.min',
      themeEntry: 'src/scss/dsai-theme-bs.scss',
      cssOutputDir: 'src/generated/css',
      loadPaths: ['node_modules'],
      framework: 'bootstrap',
      variablesOutput: 'src/scss/_variables.scss',
    },

    // Postprocessing (replace data-bs-theme with data-dsai-theme)
    postprocess: {
      enabled: true,
      cssDir: 'src/generated/css',
      files: ['dsai-theme-bs.css', 'dsai-theme-bs.min.css'],
      replacements: [
        {
          description: 'Theme attribute',
          from: /data-bs-theme/g,
          to: 'data-dsai-theme',
        },
      ],
    },

    // Build pipeline (matches playground)
    pipeline: {
      steps: [
        'validate',
        'transform',
        'multi-theme',
        'sync',
        'sass-theme',
        'sass-theme-minified',
        'postprocess',
      ],
      paths: {
        sassThemeInput: 'src/scss/dsai-theme-bs.scss',
        sassThemeOutput: 'src/generated/css/dsai-theme-bs.css',
        sassThemeMinifiedOutput: 'src/generated/css/dsai-theme-bs.min.css',
      },
    },

    // Multi-theme (light + dark)
    themes: {
      enabled: true,
      default: 'light',
      autoDetect: true,
      selectorPattern: {
        default: ':root',
        others: '[data-dsai-theme="{mode}"]',
      },
      definitions: {
        light: {
          isDefault: true,
          suffix: null,
          selector: ':root',
          outputFiles: {
            css: 'tokens.css',
            scss: '_variables.scss',
            js: 'tokens.js',
            ts: 'tokens.d.ts',
            json: 'tokens.json',
          },
        },
        dark: {
          isDefault: false,
          suffix: '-dark',
          selector: '[data-dsai-theme="dark"]',
          mediaQuery: '(prefers-color-scheme: dark)',
          dataAttribute: 'data-dsai-theme',
          outputFiles: {
            css: 'tokens-dark.css',
            scss: '_variables-dark.scss',
          },
        },
      },
    },
  },

  // Path aliases for `dsai add` component installation
  aliases: {
    importAlias: '@/',
    ui: 'src/client/components/ui',
    hooks: 'src/client/hooks',
    utils: 'src/client/lib/utils',
    components: 'src/client/components',
    lib: 'src/client/lib',
  },

  // Component distribution
  components: {
    enabled: true,
    tsx: true,
    overwrite: false,
  },
});
