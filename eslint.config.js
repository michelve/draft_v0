import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "dist",
            "node_modules",
            "**/*.gen.ts",
            "prisma/migrations",
            ".github",
            ".claude",
            ".cursor",
        ],
    },

    // Base JS recommended
    js.configs.recommended,

    // TypeScript strict
    ...tseslint.configs.strict,

    // Global config for all TS/TSX files
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            // React hooks
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // TypeScript
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
            "@typescript-eslint/no-non-null-assertion": "warn",

            // General
            "no-console": ["warn", { allow: ["warn", "error"] }],
            eqeqeq: ["error", "always"],
            "prefer-const": "error",
            "prefer-template": "warn",
        },
    },

    // Server files — Node.js globals
    {
        files: ["src/server/**/*.ts"],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            "no-console": "off",
        },
    },

    // TanStack Router route files — mixed exports are expected
    {
        files: ["src/client/routes/**/*.tsx"],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },

    // shadcn components — relaxed rules (auto-generated code)
    {
        files: ["src/client/components/ui/**/*.tsx"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "react-refresh/only-export-components": "off",
        },
    },
);
