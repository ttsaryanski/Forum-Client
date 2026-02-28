import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    {
        ignores: ["dist"],
    },
    {
        extends: [js.configs.recommended],
    },
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            // parserOptions: {
            //     project: "./tsconfig.json",
            // },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "react/react-in-jsx-scope": "off", // не е нужен при react 17+
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
);
