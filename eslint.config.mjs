import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],  // Lint all JavaScript files
    languageOptions: {
      sourceType: "module",  // Allow use of ES6 modules
      globals: globals.node, // Add Node.js globals (e.g., `process`, `require`)
    },
    plugins: ["node"],  // Optional: Add the `eslint-plugin-node` plugin
    rules: {
      // You can customize Node.js specific rules here if necessary
      "node/no-unsupported-features/es-syntax": ["error", { "version": ">=14.0.0", "ignores": [] }],
    },
  },
  pluginJs.configs.recommended, // Use the recommended rules from eslint-plugin-js
];
