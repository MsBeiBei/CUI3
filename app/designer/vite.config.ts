import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc";

export default defineConfig(async () => {
    return {
        resolve: {
            alias: {
                '@': `${__dirname}/src`,
            },
        },
        plugins: [react()]
    }
})