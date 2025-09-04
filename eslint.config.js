import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import css from '@eslint/css';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      configPrettier,
    ],
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      /* ✅ Полезные проверки */
      'react/jsx-uses-vars': 'error', // чтобы переменные-компоненты не считались неиспользуемыми
      'react/no-unused-prop-types': 'warn', // подсказка, если ты объявил проп, но не используешь
      'react/self-closing-comp': 'warn', // <div></div> → <div />
      'react/jsx-key': 'error', // ключи в списках обязательны
      'react/no-direct-mutation-state': 'error', // запрет на прямое изменение state
      'react/no-unknown-property': 'error', // запрещает писать class вместо className
      'prettier/prettier': 'warn', // чтобы код был в одном стиле
    },
    settings: {
      react: {
        version: 'detect',      },
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
]);
