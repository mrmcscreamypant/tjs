import type { UserConfig } from "vite";

export default {
    build: {
        manifest: true,
    },
    server: {
        cors: true, // No way this could be bad, right?
    }
} satisfies UserConfig;