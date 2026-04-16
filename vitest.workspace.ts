import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/localization-gen-core/vitest.config.ts",
  "packages/localization-gen-react-adapter/vitest.config.ts",
  "packages/localization-gen-vue-adapter/vitest.config.ts",
  "packages/localization-gen-react-example/vitest.config.ts",
  "packages/localization-gen-vue-example/vitest.config.ts"
]);

