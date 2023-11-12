const fs = require('fs');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.tsx'],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
    'plugin:react/jsx-runtime',
  ],
  env: {
    browser: true,
    'react-native/react-native': true,
    jest: true,
  },
  ignorePatterns: ['package.js', 'package-lock.json', '.eslintrc.js', 'tsconfig.json'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    //interface
    '@typescript-eslint/consistent-type-exports': 'warn',
    //no console logs
    'no-console': 'warn',
    //enum duplicates
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    //dynamic delete from object
    '@typescript-eslint/no-dynamic-delete': 'warn',
    //empty interfaces
    '@typescript-eslint/no-empty-interface': 'error',
    //type ANY
    '@typescript-eslint/no-explicit-any': 'off',
    //promisses
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',

    //unsave returns
    '@typescript-eslint/no-unsafe-return': 'off',
    //empty export
    '@typescript-eslint/no-useless-empty-export': 'warn',
    //no vars allowed
    '@typescript-eslint/no-var-requires': 'error',
    //enum always with value
    '@typescript-eslint/prefer-enum-initializers': 'error',
    //for of in array
    '@typescript-eslint/prefer-for-of': 'warn',
    //requests function type
    '@typescript-eslint/prefer-function-type': 'error',
    //includes in array
    '@typescript-eslint/prefer-includes': 'warn',
    //require await in promisses
    'require-await': 'off',
    '@typescript-eslint/require-await': 'error',
    //unused imports and vars
    'no-unused-vars': 'off',
    // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    //template expressions
    '@typescript-eslint/restrict-template-expressions': 'off',
    //unsave assigments
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    ///
    '@typescript-eslint/restrict-plus-operands': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'tailwindcss/classnames-order': 'off',
    'import/order': [
      1,
      {
        groups: ['index', 'builtin', 'sibling', 'internal', 'parent', 'external'],
        pathGroups: [
          ...getDirectoriesToSort().map((singleDir) => ({
            pattern: `${singleDir}/**`,
            group: 'internal',
          })),
          {
            pattern: 'env',
            group: 'internal',
          },
          {
            pattern: 'theme',
            group: 'internal',
          },
          {
            pattern: 'public/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

function getDirectoriesToSort() {
  const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules'];
  return getDirectories(process.cwd()).filter((f) => !ignoredSortingDirectories.includes(f));
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}
