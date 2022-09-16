import react from "@vitejs/plugin-react";
import withCloud from "@serverless/cloud/vite";

// https://vitejs.dev/config/
export default withCloud({
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.CLOUD_PORT}`,
    },
  },
  plugins: [
    react({
      include: "src/**/*.{ts,tsx}",
    }),
  ],
  build: {
    outDir: "static",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    sourcemap: false, //todo turn off for production as it is large
  },
});
