import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'storybook-static/**',
    'public/**',
    'next-env.d.ts',
    'src/generated/**',
  ]),
  ...nextVitals,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
  prettier,
  {
    rules: {
      'no-console': 'warn',
      'no-extra-semi': 'warn',
      // TypeScriptは@typescriptで実行する
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-undef': 'off',
      'react/prop-types': 'off',
      quotes: ['warn', 'single', { avoidEscape: true }],
      'space-before-blocks': ['warn', { functions: 'always' }],
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'react/react-in-jsx-scope': 'off',
      // if文でreturn書くならelseいらない
      'no-else-return': ['error'],
      // 相対importの禁止
      'no-restricted-imports': ['warn', { patterns: ['./', '../'] }],
      // 余計な<></>が入っていないか確認する
      'react/jsx-no-useless-fragment': ['warn'],
      // () => {return <></>}ではなく、()=> <></>と表記するように
      'arrow-body-style': ['error'],
      // importは一番最初に書くように
      'import/first': 'error',
      // 比較演算子の"=="を”＝＝＝”に修正する
      eqeqeq: 2,
      // switch文のbreakチェック
      'no-fallthrough': 'error',
      // 変数に{""}ではなく""で入力させる
      'react/jsx-curly-brace-presence': ['error'],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    // 設定ファイルは相対importやCommonJSを使ってよい
    files: ['*.{js,mjs,cjs,ts}', '.storybook/**'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    // ストーリー名は日本語で書くため PascalCase を強制しない
    files: ['**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    rules: {
      'storybook/prefer-pascal-case': 'off',
    },
  },
]);
