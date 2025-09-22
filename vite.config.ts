import type { UserConfig } from "vite";
import checker from 'vite-plugin-checker';

export default {
    build: {
        manifest: true,
    },
    server: {
        cors: true, // No way this could be bad, right?
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        }
    },
    plugins: [
        /*checker({
            typescript: true,
        }),*/
    ]
} satisfies UserConfig;