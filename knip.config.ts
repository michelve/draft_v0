import type { KnipConfig } from "knip";

const config: KnipConfig = {
    project: ["src/**/*.{ts,tsx}"],
    ignore: ["src/client/routeTree.gen.ts", "src/client/components/ui/**", "src/client/assets/**"],
    ignoreDependencies: ["tailwindcss", "tw-animate-css", "@figma/code-connect"],
};

export default config;
