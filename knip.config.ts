import type { KnipConfig } from "knip";

const config: KnipConfig = {
    project: ["src/**/*.{ts,tsx}"],
    ignore: ["src/client/routeTree.gen.ts", "src/client/components/ui/**", "src/client/assets/**"],
    ignoreDependencies: ["@figma/code-connect"],
};

export default config;
