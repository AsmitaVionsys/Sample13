// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['**/*.ts'],
    rules: {
        'no-console': 'error',
        'no-useless-catch': 'off',
        quotes: ['error', 'single', { allowTemplateLiterals: true }]
    }
});
