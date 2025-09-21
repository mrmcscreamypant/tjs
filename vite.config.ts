import type { UserConfig } from "vite";
import checker from 'vite-plugin-checker';

export default {
    build: {
        manifest: true,
    },
    server: {
        cors: true, // No way this could be bad, right?
    },
    plugins: [
        /*checker({
            typescript: true,
        }),*/
    ]
} satisfies UserConfig;