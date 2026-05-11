import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    resolve: {
        // Avoid stale emitted JS shadowing TS/TSX source files in dev.
        extensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
    },
    plugins: [react()]
});
//# sourceMappingURL=vite.config.js.map