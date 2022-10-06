/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript',
        '@vue/prettier',
        '@vue/eslint-config-prettier',
    ],
    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-empty': 'warn',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'off',
        'vue/no-mutating-props': 'off',
    }
}
